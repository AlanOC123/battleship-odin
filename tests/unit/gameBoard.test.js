import gameBoard from "../../src/factories/gameBoard";

describe('gameBoard', () => {
    let board = null;

    beforeEach(() => {
        const boardEl = document.createElement('div');
        boardEl.id = 'gameboard';
        document.body.append(boardEl);
        board = gameBoard();
    });
    afterEach(() => {
        document.querySelector('#gameboard')?.remove();
        board = null
    });

    it('Doesnt allow access to private properties', () => {
        expect(board?._boardNodes).toBeUndefined();
        expect(board?._SIZE).toBeUndefined();
        expect(board?._gameBoardElement).toBeUndefined();
        expect(board?._isBoardInit).toBeUndefined();
    });

    it('Correctly initialises the gameboard nodes', () => {
        expect(board.isInit()).toBeFalsy();
        board.initialiseNodes();
        expect(board.isInit()).toBeTruthy();
    });

    it('Correctly retrieves the gameboard and its nodes', () => {
        board.initialiseNodes();
        const gameBoardMap = board.getGameBoard();
        expect(gameBoardMap).toBeDefined();
        expect(gameBoardMap.size).toEqual(100);
    });

    it('Correctly accesses and retrieves nodes in the gameBoard', () => {
        board.initialiseNodes();
        expect(board.getNode(1, 1)).toBeDefined();
        expect(board.getNode(101, 101)).toBeNull();
        expect(() => board.getNode()).toThrow();
        expect(() => board.getNode('a', 2)).toThrow();
        expect(() => board.getNode('3', null)).toThrow();
        expect(() => board.getNode('3', 2)).toBeDefined();
        expect(() => board.getNode({}, [])).toThrow();
    });

    it('Correctly renders all nodes to be mounted to the DOM', () => {
        board.initialiseNodes();
        let testNode = board.getNode(1, 1);
        expect(testNode.getElement()).toBeNull();
        board.renderNodes();
        testNode = board.getNode(1, 1);
        expect(testNode.getElement()).not.toBeNull();
        expect(testNode.getElement()).toBeDefined();
        testNode = board.getNode(9, 9);
        expect(testNode.getElement()).not.toBeNull();
        expect(testNode.getElement()).toBeDefined();
    });

    it('Correctly returns the reference to the gameboard in the DOM', () => {
        expect(board.getBoardElement()).toBeDefined();
        expect(board.getBoardElement()).not.toBeNull();
        expect(board.getBoardElement().id).toBe('gameboard');
    })

    it('Correctly mounts nodes to the DOM', () => {
        board.initialiseNodes();
        board.renderNodes();
        const gameBoardEl = board.getBoardElement();
        expect(gameBoardEl.children.length).toEqual(0);
        board.renderBoard();
        expect(gameBoardEl.children.length).toBeGreaterThan(0);
        expect(gameBoardEl.children.length).toEqual(100);
    });
});
