import shipFactory from "../../src/factories/shipFactory";

describe('Ship Factory', () => {
    let destroyer = null;
    let submarine = null;
    let cruiser = null;
    let battleship = null;
    let carrier = null;

    beforeEach(() => {
        destroyer = shipFactory({ name: 'Destroyer', length: 2, axis: 'x' });
        submarine = shipFactory({ name: 'Submarine', length: 3, axis: 'y' });
        cruiser = shipFactory({ name: 'Cruiser', length: 3, axis: 'y' });
        battleship = shipFactory({ name: 'Battleship', length: 4, axis: 'x' });
        carrier = shipFactory({ name: 'Carrier', length: 5, axis: 'y' });
    });

    afterEach(() => {
        destroyer = null;
        submarine = null;
        cruiser = null;
        battleship = null;
        carrier = null;
    })

    it('Correctly prevents access to private properties', () => {
        expect(destroyer?.shipName).toBeUndefined();
        expect(destroyer?.shipParts).toBeUndefined();
        expect(destroyer?.shipLength).toBeUndefined();
        expect(destroyer?.isSunk).toBeUndefined();
    });

    it('Correctly gets the ship name', () => {
        expect(destroyer.getShipName()).toBe('Destroyer');
        expect(carrier.getShipName()).toBe('Carrier');
        expect(carrier.getShipName()).not.toBe('Submarine');
    });

    it('Correctly relays ship parts locations', () => {
        expect(Array.isArray(destroyer.getShipParts())).toBeTruthy();
        expect(destroyer.getShipParts().length).toEqual(0);
    })

    it('Correctly gets the ship length', () => {
        expect(destroyer.getShipLength()).toEqual(2);
        expect(carrier.getShipLength()).toEqual(5);
        expect(carrier.getShipLength()).not.toBe(3);
    });

    it('Correctly gets the ships status', () => {
        expect(destroyer.getIsShipSunk()).toBeFalsy();
        expect(carrier.getIsShipSunk()).toBeFalsy();
        expect(carrier.getIsShipSunk()).not.toBeTruthy();
    });

    it('Correctly set an x, y tuple coordinate', () => {
        expect(submarine.getShipParts().includes([ 1, 3 ])).toBeFalsy();
        expect(() => submarine.setShipCoordinate('three', 3)).toThrow();
        expect(() => submarine.setShipCoordinate(3)).toThrow();
        submarine.setShipCoordinate(1, 3);
        console.log(submarine.getShipParts());
        expect(submarine.getShipParts().some(([ x, y ]) => x === 1 && y === 3)).toBeTruthy();
        submarine.setShipCoordinate(1, 4);
        submarine.setShipCoordinate(1, 5);
        expect(() => submarine.setShipCoordinate(1, 6)).toThrow();
    });

    it('Correctly handles a received hit', () => {
        const hitData = { coordinates: { x: 1, y: 3 } };
        expect(submarine.receivedHit(hitData)).toBeNull();
        submarine.setShipCoordinate(1, 3);
        submarine.receivedHit(hitData);
        expect(submarine.getShipParts().some(([ x, y ]) => x === 1 && y === 3)).toBeFalsy();
    });

    it('Correctly sinks a ship', () => {
        cruiser.setShipCoordinate(1, 3);
        cruiser.setShipCoordinate(1, 4);
        cruiser.setShipCoordinate(1, 5);
        expect(cruiser.getIsShipSunk()).toBeFalsy();

        const hitOne = { coordinates: { x: 1, y: 3 } };
        const hitTwo = { coordinates: { x: 1, y: 4 } };
        const hitThree = { coordinates: { x: 1, y: 5 } };

        cruiser.receivedHit(hitOne);
        cruiser.receivedHit(hitTwo);
        cruiser.receivedHit(hitThree);

        expect(cruiser.getIsShipSunk()).toBeTruthy();
    });
});
