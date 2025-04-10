import boardNode from "../../src/factories/boardNode";

describe('boardNode', () => {
    let newNode = null;

    beforeEach(() => newNode = boardNode(1, 2));

    afterEach(() => newNode = null);

    it('Creates a valid node', () => {

        expect(newNode).not.toBeUndefined();
        expect(newNode).not.toBeFalsy();
        expect(newNode).not.toBeNull();
        expect(newNode).toBeDefined();
    });

    it('Correctly sets and retrieves coordinates', () => {
        expect(newNode?.coordinates).toBeUndefined();
        expect(newNode.getCoordinates()).toEqual(expect.any(Array));
        expect(newNode.getCoordinates()).toEqual([1, 2]);
        expect(newNode.getCoordinates()).not.toEqual([]);
        expect(newNode.getCoordinates()).not.toEqual(['1', '2']);
    });

    it('Correctly renders and creates the DOM element', () => {
        expect(newNode.getElement()).toBeNull();

        newNode.renderNode();
        expect(newNode?.element).toBeUndefined();
        expect(newNode.getElement()).toBeDefined();
        expect(newNode.getElement()).toBeInstanceOf(globalThis.Node);
        expect(newNode.getElement().classList.contains('w-full')).toBeTruthy();
    });

    it('Correctly sets and retrieves hit state and ship containing state', () => {
        expect(newNode?.containsShipPart).toBeUndefined();
        expect(newNode?.isHit).toBeUndefined();
        expect(newNode.hasShip()).toBeFalsy();
        expect(newNode.hasShip()).not.toBeUndefined();
        expect(newNode.hasShip()).not.toBeNull();
        expect(newNode.getHitState()).not.toBeUndefined();
        expect(newNode.getHitState()).not.toBeNull();
        expect(newNode.getHitState()).toBeFalsy();

        newNode.setNodeContainsShipPart();
        expect(newNode.hasShip()).toBeTruthy();
        newNode.recieveAttack();
        expect(newNode.getHitState()).toBeTruthy();
    })

    it('Receives attacks without a ship and updates its state correctly via and API', () => {
        expect(newNode.recieveAttack()).toBe('miss');

        newNode.renderNode();
        expect(newNode.recieveAttack()).toBe('miss');
        expect(newNode.getElement().classList.contains('bg-gray-400')).toBeTruthy();
        expect(newNode.getElement().classList.contains('bg-red-500')).toBeFalsy();
    });

    it('Receives attacks with a ship and updates its state correctly via and API', () => {
        expect(newNode.hasShip()).toBeFalsy();
        newNode.setNodeContainsShipPart();
        expect(newNode.hasShip()).toBeTruthy();
        newNode.renderNode();
        expect(newNode.recieveAttack()).toBe('hit');
        expect(newNode.getHitState()).toBeTruthy();
        expect(newNode.getElement().classList.contains('bg-red-500')).toBeTruthy();
        expect(newNode.getElement().classList.contains('bg-gray-400')).toBeFalsy();
    });
});
