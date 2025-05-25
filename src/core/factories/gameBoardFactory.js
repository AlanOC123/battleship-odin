import boardNodeFactory from "./boardNodeFactory";
import hashCell from "../utils/gameBoard/hashCell";

const gameBoardFactory = () => {
    const SIZE = 10;
    const graphNodes = new Map();

    const getNode = (nodeID) => graphNodes.get(nodeID) ?? null;

    const buildGraph = () => {
        const directions = [
            { dx: -1, dy: 0 },
            { dx: +1, dy: 0 },
            { dx: 0, dy: -1 },
            { dx: 0, dy: +1 },
        ];

        for (let i = 0; i < SIZE; i++) {
            for (let j = 0; j < SIZE; j++) {
                const currID = hashCell(i, j);
                const currNode = getNode(currID) ?? boardNodeFactory(i, j);

                directions.forEach(({ dx, dy }) => {
                    const ni = i + dx;
                    const nj = j + dy;

                    if (ni >= 0 && ni < SIZE && nj >= 0 && nj < SIZE) {
                        const edgeID = hashCell(ni, nj);
                        const edgeNode = getNode(edgeID) ?? boardNodeFactory(ni, nj);
                        if (!graphNodes.has(edgeID)) graphNodes.set(edgeID, edgeNode);
                        currNode.addEdge(edgeNode);
                    };
                });

                graphNodes.set(currID, currNode);
            };
        };
    };

    buildGraph();

    return {
        getSingleNode: (nodeID) => getNode(nodeID) ? Object.assign({}, getNode(nodeID)) : null,
        getGraph: () => new Map(graphNodes),
        getGraphArray: () => Array.from(graphNodes).flat().filter((_, i) => i % 2 > 0),
    };
};

export default gameBoardFactory;
