import GLOBAL_NAMES from '../../../data/shared/names';
import helpers from '../../utils/boardHelpers';
import responseFactory from '../../../factories/response';
import withSafeResponse from '../../../factories/withSafeResponse';

const FACTORY_NAME = GLOBAL_NAMES.FACTORY_NAMES.BOARD;

const createBoard = (ownerID) => {
    const _BOARD_DATA = {
        init: false,
        owner: ownerID,
        width: 10,
        size: (10 * 10) - 1,
        board: null,
        strikes: null,
        placements: null,
        cachedTries: null,
        totalStrikes: 0,
        totalHits: 0,
        totalMisses: 0,
    }

    const _initBoard = () => {
        const res = helpers.getBoard(_BOARD_DATA.width);

        if (res.error) {
            return responseFactory.errorResponse(
                {...res.result},
                `${FACTORY_NAME} ${res.message}`,
                res.kind
            );
        };

        _BOARD_DATA.board = res.result.board;
        _BOARD_DATA.strikes = new Map();
        _BOARD_DATA.placements = new Set();
        _BOARD_DATA.cachedTries = new Map();
        _BOARD_DATA.init = true;

        return responseFactory.successResponse(
            { ...res.result, board: Object.values(_BOARD_DATA) },
            res.message,
            res.kind
        );
    }

    const _getPlacementCoords = (x, y, increment, length) => {
        const start = helpers.getBoardNodeID(x, y);

        if (helpers.isPlacedOnBoard(_BOARD_DATA.placements, start)) {
            return responseFactory.errorResponse(
                {
                    attemptedFlip: false,
                    hasOverlap: true,
                    overlappingNodes: [start],
                    placementNodes: [],
                    cachedResponse: false,
                },
                `${FACTORY_NAME} ship already placed in node, early return`,
                'error',
            );
        };

        const triedID = `${start}${increment}${length}`;

        if (helpers.hasBeenTried(_BOARD_DATA.cachedTries, triedID)) {
            const response = helpers.getCachedTry(_BOARD_DATA.cachedTries, triedID);
            response.result.cachedResponse = true;
            helpers.cacheTry(_BOARD_DATA.cachedTries, triedID, response);
            return response;
        }

        const res = helpers.getPlacementCoords(start, increment, length, _BOARD_DATA.placements);

        if (res.result.hasOverlap){
            return responseFactory.errorResponse(
                { ...res.result },
                `${FACTORY_NAME} ${res.message}`,
                res.kind,
            )
        }

        const response = responseFactory.successResponse(
            { ...res.result },
            res.message,
            res.kind
        )

        helpers.cacheTry(_BOARD_DATA.cachedTries, triedID, response);

        return response;
    }

    const _assignPartsToBoard = (ship, parts, nodes) => {
        const res = helpers.assignPartsToBoard(ship, parts, nodes, _BOARD_DATA.board);

        if (res.error) {
            return responseFactory.errorResponse(
                { ...res.result },
                `${FACTORY_NAME} ${res.message}`,
                res.kind,
            )
        }

        return responseFactory.successResponse(
            { ...res.result },
            res.message,
            res.kind,
        )
    }

    const _placeShip = (x, y, increment, shipConfig) => {
        const { ID, HEALTH, PARTS } = shipConfig;
        const placementResponse = _getPlacementCoords(x, y, increment, HEALTH);

        if (placementResponse.error) {
            return responseFactory.errorResponse(
                { ...placementResponse.result },
                `${FACTORY_NAME} ${placementResponse.message}`,
                placementResponse.kind
            );
        }

        const nodes = placementResponse.result.placementNodes;

        const assignmentResponse = _assignPartsToBoard(ID, PARTS, nodes);

        if (assignmentResponse.error) {
            return responseFactory.errorResponse(
                {...placementResponse.result, ...assignmentResponse.result},
                `${FACTORY_NAME} ${assignmentResponse.message}`,
                assignmentResponse.kind
            );
        }

        const assignedNodes = assignmentResponse.result.placementNodes;
        helpers.addCoordsToPlacement(assignedNodes, _BOARD_DATA.placements);

        return responseFactory.successResponse(
            { ...placementResponse.result, ...assignmentResponse.result },
            'succesfully placed and mapped ship parts to nodes',
            'info'
        );
    }

    const _strikeBoard = (x, y) => {
        const nodeID = helpers.getBoardNodeID(x, y);

        if (helpers.hasBeenStruck(_BOARD_DATA.strikes, nodeID)) {
            _BOARD_DATA.totalStrikes++;
            _BOARD_DATA.totalMisses++;
            const strikeResponse = helpers.getStrikeResponse(_BOARD_DATA.strikes, nodeID);
            return responseFactory.errorResponse(
                { ...strikeResponse.result, nodeMessage: 'Duplicate Hit' },
                'node already hit',
                'warn',
            );
        }

        const node = helpers.getNode(_BOARD_DATA.board, nodeID);

        if (!node) {
            return responseFactory.errorResponse(
                {
                    nodeID,
                    isHit: false,
                    hasShip: null,
                    nodeData: null,
                    nodeMessage: null,
                    totalStrikes: _BOARD_DATA.totalStrikes,
                    totalHits: _BOARD_DATA.totalHits,
                    totalMisses: _BOARD_DATA.totalMisses,
                },
                `${FACTORY_NAME} missing node in board.`,
                'error'
            );
        }

        const hasShip = node.hasShip();
        const isHit = hasShip ? true : false;
        const nodeData = hasShip ? node.getShipData() : null;
        const nodeMessage = hasShip ? 'Hit' : 'Miss';

        _BOARD_DATA.totalStrikes++;
        if (hasShip) {
            _BOARD_DATA.totalHits++;
        } else {
            _BOARD_DATA.totalMisses++;
        }

        const response = responseFactory.successResponse(
            {
                nodeID,
                isHit,
                hasShip,
                nodeData,
                nodeMessage,
                totalStrikes: _BOARD_DATA.totalStrikes,
                totalHits: _BOARD_DATA.totalHits,
                totalMisses: _BOARD_DATA.totalMisses
            },
            'successfully struck board',
            'info'
        )

        helpers.cacheStrikeResponse(_BOARD_DATA.strikes, nodeID, response);
        return response;
    }

    const _resetBoard = () => {
        const ownerID = _BOARD_DATA.owner;

        _BOARD_DATA.init = false;
        _BOARD_DATA.owner = ownerID;
        _BOARD_DATA.width = 10;
        _BOARD_DATA.size = (10 * 10) - 1;
        _BOARD_DATA.board = null;
        _BOARD_DATA.strikes = null,
        _BOARD_DATA.placements = null;
        _BOARD_DATA.cachedTries = null;
        _BOARD_DATA.totalStrikes = 0;
        _BOARD_DATA.totalHits = 0;
        _BOARD_DATA.totalMisses = 0;

        const res = _initBoard();

        if (res.error) {
            return responseFactory.errorResponse(
                { ...res.result },
                `${FACTORY_NAME} ${assignmentResponse.message}`,
                res.kind,
            );
        }

        return responseFactory.successResponse(
            { ..._BOARD_DATA },
            'board rest',
            'info'
        );
    }

    const initResponse = _initBoard(ownerID);

    if (initResponse.error) {
        return responseFactory.errorResponse(
            { ...initResponse.result },
            initResponse.message,
            initResponse.kind,
        )
    }

    return {
        getInit: () => _BOARD_DATA.init,
        getOwner: () => _BOARD_DATA.owner,
        getWidth: () => _BOARD_DATA.width,
        getSize: () => _BOARD_DATA.size,
        getTotalStrikes: () => _BOARD_DATA.strikes,
        getTotalHits: () => _BOARD_DATA.totalHits,
        getTotalMisses: () => _BOARD_DATA.totalMisses,
        getBoard: () => Array.from(_BOARD_DATA.board.values()),
        getStrikes: () => Array.from(_BOARD_DATA.strikes.values()),
        getPlacements: () => Array.from(_BOARD_DATA.placements),
        getCachedPlacementsTried: () => Array.from(_BOARD_DATA.cachedTries.values()),

        getNode: (nodeID) => withSafeResponse(helpers.getNode, _BOARD_DATA.board, nodeID),
        getPlacementCoords: (x, y, increment, health) => withSafeResponse(_getPlacementCoords, x, y, increment, health),
        placeShip: (x, y, increment, shipConfig) => withSafeResponse(_placeShip, x, y, increment, shipConfig),
        strikeBoard: (x, y) => withSafeResponse(_strikeBoard, x, y),
        resetBoard: () => _resetBoard(),
    }
}

export default {
    createBoard,
    ...helpers
}
