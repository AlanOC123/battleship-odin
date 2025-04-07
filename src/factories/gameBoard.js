import boardNode from "./boardNode";
import hashCell from "../helpers/hashCell";

const gameBoard = () => {
    const boardNodes = new Map();
    const _SIZE = 10;
    const gameBoardElement = document.querySelector('#gameboard');

    const initialiseNodes = () => {
        for (let i = 0; i < _SIZE; i++) {
            for (let j = 0; j < _SIZE; j++) {
                const newCell = boardNode(i, j);
                const [x, y] = newCell.getCoordinates();
                boardNodes.set(hashCell(x, y), newCell);
            };
        };
    };

    const getNode = (x, y) => {
        if (x === null || x === undefined || y === null || y === undefined) throw new Error(`Invalid coordinates given: Received ${x}, ${y}`);
        if (isNaN(x) || isNaN(y)) throw new Error(`Invalid coordinates given: Received ${x}, ${y}`);

        return boardNodes.get(hashCell(x, y));
    }

    const renderBoard = () => {
        for (const node of boardNodes.values()) {
            const nodeElement = node.getElement();
            gameBoardElement.append(nodeElement);
        };
    };

    return {
        initialiseNodes,
        renderBoard,
        getNode,
        getAllNodes: () => boardNodes,
    }
};

export default gameBoard;
