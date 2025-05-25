import gameBoardFactory from "../../src/core/factories/gameBoardFactory";

describe('Game Board', () => {
    let gameBoard = null;

    beforeEach(() => gameBoard = gameBoardFactory());
    afterEach(() => gameBoard = null);

    it('Creates all nodes', () => {
        const graph = gameBoard.getGraph();
        expect(graph).toEqual(expect.any(Map));
        expect(graph.size).toEqual(100);
    });

    it('Gets a single node from the graph', () => {
        expect(gameBoard.getSingleNode('3, 4')).not.toBeNull();
        expect(gameBoard.getSingleNode('11, 12')).toBeNull();
    });

    it('Returns an immutable form of the graph in an array and a map', () => {
        const graphMap = gameBoard.getGraph();
        const graphArray = gameBoard.getGraphArray();
        expect(graphArray).toEqual(expect.any(Array));
        expect(graphArray.length).toEqual(100);
        graphMap.delete('3, 4');
        graphArray.splice(0, 1);
        expect(graphMap.size).not.toEqual(100);
        expect(gameBoard.getGraph().size).toEqual(100);
        expect(graphArray.length).not.toEqual(100);
    });

    it('Correctly builds the graph', () => {
        const middleOne = gameBoard.getSingleNode('5, 5');
        const middleOneEdges = middleOne.getEdges()
        expect(middleOneEdges.length).toEqual(4);

        const middleTwo = gameBoard.getSingleNode('0, 5');
        const middleTwoEdges = middleTwo.getEdges()
        expect(middleTwoEdges.length).toEqual(3);

        const middleThree = gameBoard.getSingleNode('5, 9');
        const middleThreeEdges = middleThree.getEdges()
        expect(middleThreeEdges.length).toEqual(3);

        const cornerOne = gameBoard.getSingleNode('0, 0');
        const cornerOneEdges = cornerOne.getEdges();
        expect(cornerOneEdges.length).toEqual(2);

        const cornerTwo = gameBoard.getSingleNode('9, 0');
        const cornerTwoEdges = cornerTwo.getEdges();
        expect(cornerTwoEdges.length).toEqual(2);

        const cornerThree = gameBoard.getSingleNode('0, 9');
        const cornerThreeEdges = cornerThree.getEdges();
        expect(cornerThreeEdges.length).toEqual(2);

        const cornerFour = gameBoard.getSingleNode('9, 9');
        const cornerFourEdges = cornerFour.getEdges();
        expect(cornerFourEdges.length).toEqual(2);
    })
})
