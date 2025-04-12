import boardNode from "./boardNode";
import hashCell from "../helpers/hashCell";

const gameBoard = () => {
    const _boardNodes = new Map();
    const _SIZE = 10;
    const _gameBoardElement = document.querySelector('#gameboard');
    let _isBoardInit = false;

    const initialiseNodes = () => {
        for (let i = 1; i <= _SIZE; i++) {
            for (let j = 1; j <= _SIZE; j++) {
                const newCell = boardNode(i, j);
                _boardNodes.set(hashCell(i, j), newCell);
            };
        };

        _isBoardInit = true;
    };

    const getNode = (x, y) => {
        if (x === null || x === undefined || y === null || y === undefined) throw new Error(`Invalid coordinates given: Received ${x}, ${y}`);
        if (isNaN(x) || isNaN(y)) throw new Error(`Invalid coordinates given: Received ${x}, ${y}`);

        return _boardNodes.get(hashCell(x, y)) || null;
    };

    const renderNodes = () => {
        for (const node of _boardNodes.values()) node.renderNode();
    }

    const renderBoard = () => {
        for (const node of _boardNodes.values()) {
            const nodeElement = node.getElement();
            _gameBoardElement.append(nodeElement);
        };
    };

    return {
        initialiseNodes,
        renderBoard,
        renderNodes,
        getNode,
        getGameBoard: () => new Map(_boardNodes),
        getBoardElement: () => _gameBoardElement,
        isInit: () => _isBoardInit,
    }
};

export default gameBoard;
