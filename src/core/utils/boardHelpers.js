import createNode from "../factories/board/node";
import responseFactory from '../../factories/response';

const DIRECTIONS = [
    { dx: -1, dy: 0 },
    { dx: +1, dy: 0 },
    { dx: 0, dy: -1 },
    { dx: 0, dy: +1 },
];

const getY = (id) => id % 10;
const getX = (id) => Math.floor(id / 10);

const getBoardNodeID = (x, y, width = 10) => (x * width) + y;
const getCoordinatesFromID = (id) => ({ x: getX(id), y: getY(id) });
const addNodeToNodeEdges = (edgeMap, id, node) => edgeMap.set(id, node);

const isPlacedOnBoard = (placements, start) => placements.has(start);

const hasBeenTried = (cache, id) => cache.has(id);
const getCachedTry = (cache, id) => cache.get(id);
const cacheTry = (cache, id, response) => cache.set(id, response);

const addCoordsToPlacement = (coords, placement) => coords.forEach(coord => placement.add(coord));
const addPlacementToCache = (coords, placement) => placement.add(coords);

const hasBeenStruck = (strikes, nodeID) => strikes.has(nodeID);
const getStrikeResponse = (strikes, nodeID) => strikes.get(nodeID);
const cacheStrikeResponse = (strikes, nodeID, response) => strikes.set(nodeID, response);

const getNextID = (curr, increment, i = 1) => curr + (i * increment);
const isOverlapping = (curr, placements) => placements.has(curr);

const overflowsY = (next) => getY(next) === 0 ? true : false;
const overflowsX = (next) => next >= 100 ? true : false;

const checkOverflow = (curr, increment, remaining, i) => {
    if (increment < 0 || remaining === 0) return false;
    const next = getNextID(curr, increment, i);
    return increment === 1 ? overflowsY(next) : overflowsX(next);
}

const getPlacementCoords = (start, increment, length, placements) => {
    let nodes = [];
    let hasOverlap = false;
    let attemptedFlip = false;
    const overlappingNodes = [];

    for (let i = 0; i < length; i++) {
        const curr = getNextID(start, increment, i);
        const remaining = length - i - 1;

        nodes.push(curr);

        if (isOverlapping(curr, placements)) {
            hasOverlap = true;
            overlappingNodes.push(curr);
        }

        if (checkOverflow(curr, increment, remaining)) {
            attemptedFlip = true;
            increment *= -1;
            nodes = [];
            i = -1;
        }
    }

    if (hasOverlap) {
        return responseFactory.successResponse(
            {
                attemptedFlip,
                hasOverlap,
                overlappingNodes,
                placementNodes: nodes,
            },
            'overlapping nodes found',
            'info'
        );
    }

    return responseFactory.successResponse(
        {
            attemptedFlip:
            attemptedFlip,
            hasOverlap,
            overlappingNodes,
            placementNodes: nodes,
        },
        'valid nodes gathered',
        'info'
    );
}

const assignPartsToBoard = (ship, parts, nodes, board) => {
    let hasAssignmentFailure = false;
    const assignmentFailures = [];

    nodes.forEach((id, ind) => {
        const node = getNode(board, id);
        const shipPart = parts.find(part => part.INDEX === ind);

        if (node && shipPart) {
            node.setShipData({ id: ship, ...shipPart });
        } else {
            hasAssignmentFailure = true;
            assignmentFailures.push({ id, ind, node });
        }
    })

    if (hasAssignmentFailure) {
        return responseFactory.errorResponse(
            {
                hasAssignmentFailure,
                assignmentFailures,
                placementNodes: nodes
            },
            'failed to assign ship parts to nodes',
            'error'
        )
    }

    return responseFactory.successResponse(
        {
            hasAssignmentFailure,
            assignmentFailures,
            placementNodes: nodes
        },
        'ship parts mapped to nodes',
        'info',
    )
}

const getBoard = (width = 10) => {
    const board = new Map();

    for (let i = 0; i < width; i++) {
        for (let j = 0; j < width; j++) {

            const id = getBoardNodeID(i, j);
            const node = getNode(board, id) ?? createNode(i, j);

            DIRECTIONS.forEach(({ dx, dy }) => {
                const ni = i + dx;
                const nj = j + dy;

                if (ni >= 0 && ni < width && nj >= 0 && nj < width) {
                    const edgeID = getBoardNodeID(ni, nj);
                    const edgeNode = getNode(board, edgeID) ?? createNode(ni, nj);

                    if (!getNode(board, edgeID)) board.set(edgeID, edgeNode);
                    node.addEdge(edgeID, edgeNode);
                };
            });
            board.set(id, node);
        };
    };

    if (board.size < 100) {
        return responseFactory.errorResponse(
            { boardWidth: width, board: new Map(), boardSize: board.size },
            'invalid board, not enough nodes',
            'critical'
        );
    }

    return responseFactory.successResponse(
        { boardWidth: width, board: new Map(board), boardSize: board.size },
        'valid board created',
        'info'
    );
}

const getNode = (board, nodeID) => board.get(nodeID);

export default {
    getBoardNodeID,
    getCoordinatesFromID,
    addNodeToNodeEdges,
    isPlacedOnBoard,
    hasBeenTried,
    getCachedTry,
    cacheTry,
    addCoordsToPlacement,
    addPlacementToCache,
    hasBeenStruck,
    getStrikeResponse,
    cacheStrikeResponse,
    getPlacementCoords,
    assignPartsToBoard,
    getBoard,
    getNode,
}
