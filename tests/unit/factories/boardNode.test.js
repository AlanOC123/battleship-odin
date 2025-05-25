import boardNodeFactory from "../../../src/core/factories/boardNodeFactory";

describe('Board Node', () => {

    let node = null;
    let x = 3, y =4;

    beforeEach(() => node = boardNodeFactory(x, y));
    afterEach(() => node = null);

    describe('Node Creation', () => {
        it('Correctly creates a node', () => {
            expect(node).not.toBeNull();
        });

        it('Correctly hashes its ID', () => {
            expect(node.getID()).toEqual(expect.any(String));
            expect(node.getID()).toEqual('3, 4');
        });
    });

    describe('Node state', () => {
        it('Initialises ship containing status to false', () => {
            expect(node.hasShip()).toBeFalsy();
        });

        it('Initialises hit state to false', () => {
            expect(node.getHitState()).toBeFalsy();
        });

        it('Updates containing ship part', () => {
            expect(node.hasShip()).toBeFalsy();
            node.setNodeContainsShipPart();
            expect(node.hasShip()).toBeTruthy();
        });

        it('Updates hit state correctly', () => {
            expect(node.getHitState()).toBeFalsy();
            expect(node.receiveAttack()).toEqual('miss');
            expect(node.getHitState()).toBeTruthy();
            node.setNodeContainsShipPart();
            expect(node.receiveAttack()).toEqual('hit');
        });
    });

    describe('Connected Nodes', () => {
        it('Correctly adds a neighboring node', () => {
            const nodeOne = boardNodeFactory(4, 4);
            const nodeTwo = boardNodeFactory(2, 4);
            const nodeThree = boardNodeFactory(3, 3);
            const nodeFour = boardNodeFactory(3, 5);
            expect(() => node.addEdge(nodeOne)).not.toThrow();
            [ nodeTwo, nodeThree, nodeFour ].forEach(cell => node.addEdge(cell));
            expect(node.getEdges()).toEqual(expect.any(Array));
            const connectedNodes = node.getEdges();
            expect(connectedNodes.length).toEqual(4);
        });

        it('Correctly returns a copy of the connected nodes', () =>{
            const nodeOne = boardNodeFactory(4, 4);
            const nodeTwo = boardNodeFactory(2, 4);
            const nodeThree = boardNodeFactory(3, 3);
            const nodeFour = boardNodeFactory(3, 5);
            [ nodeOne, nodeTwo, nodeThree, nodeFour ].forEach(cell => node.addEdge(cell));
            const connectedNodes = node.getEdges();
            expect(connectedNodes.length).toEqual(4);
            connectedNodes.splice(0, 1);
            expect(connectedNodes.length).toEqual(3);
            expect(node.getEdges().length).toEqual(4);
        });
    })
})
