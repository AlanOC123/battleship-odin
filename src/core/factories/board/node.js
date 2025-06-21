import GLOBAL_NAMES from '../../../data/shared/names';
import boardHelpers from '../../utils/boardHelpers';
import withSafeResponse from '../../../factories/withSafeResponse';
import responseFactory from '../../../factories/response';

const FACTORY_NAME = GLOBAL_NAMES.FACTORY_NAMES.BOARD_NODE;

const createNode = (xCoord, yCoord) => {
    const _NODE_DATA = {
        init: false,
        x: xCoord,
        y: yCoord,
        id: null,
        hasShip: false,
        shipPart: null,
        edges: null,
    }

    const _initNode = () => {
        const id = boardHelpers.getBoardNodeID(xCoord, yCoord);

        if (Number.isNaN(id)) {
            return responseHelpers.errorResponse(
                { init: false, id: null },
                `${FACTORY_NAME} invalid node ID`,
                'critical'
            );
        }

        _NODE_DATA.id = id;
        _NODE_DATA.init = true;
        _NODE_DATA.edges = new Map();

        return responseFactory.successResponse(
            { init: _NODE_DATA.init, id: _NODE_DATA.id, edges: Array.from(_NODE_DATA.edges.values()) },
            'node initialised',
            'info'
        );
    };

    const _setShipData = (shipPart) => {
        if (!shipPart || typeof shipPart !== 'object') {
            return responseHelpers.errorResponse(
                { id: _NODE_DATA.id, hasShip: _NODE_DATA.hasShip, shipPart: _NODE_DATA.shipPart },
                `${FACTORY_NAME} invalid ship part`,
                'error',
            );
        }

        _NODE_DATA.hasShip = true;
        _NODE_DATA.shipPart = { ...shipPart };

        return responseFactory.successResponse(
            { id: _NODE_DATA.id, hasShip: _NODE_DATA.hasShip, shipPart: { ..._NODE_DATA.shipPart } },
            'ship set',
            'info'
        );
    }

    const _addEdge = (id, node) => {
        if (!id || !node) {
            return responseFactory.errorResponse(
                { id: _NODE_DATA.id, edges: Array.from(_NODE_DATA.edges.values()), numEdges: _NODE_DATA.edges.size },
                `${FACTORY_NAME}invalid node`,
                'error'
            )
        }

        boardHelpers.addNodeToNodeEdges(id, node);

        return responseFactory.successResponse(
            { id: _NODE_DATA.id, edges: Array.from(_NODE_DATA.edges.values()), numEdges: _NODE_DATA.edges.size },
            'edge added',
            'info'
        );
    }

    _initNode();

    return {
        getID: () => _NODE_DATA.id,
        getShipData: () => ({ ..._NODE_DATA.shipPart }),
        hasShip: () => _NODE_DATA.hasShip,
        setShipData: (shipPart) => withSafeResponse(_setShipData, shipPart),
        addEdge: (id, node) => withSafeResponse(_addEdge, id, node),
    }
}

export default createNode;
