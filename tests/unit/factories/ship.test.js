import createFleet from '../../../src/core/utils/general/createFleet';

describe('Ship Factory', () => {
    let fleet = [];
    beforeEach(() => fleet = createFleet(1234));

    afterEach(() => fleet.length = 0);

    describe('Ship Data', () => {
        let shipOne = null;
        let shipTwo = null;

        beforeEach(() => {
            shipOne = fleet[0];
            shipTwo = fleet[1];
        });

        afterEach(() => shipOne = shipTwo = null);

        it('Correctly gets the name', () => {
            expect(shipOne).toBeDefined();
            expect(shipOne.getName()).toBe('Carrier');
            expect(shipTwo).toBeDefined();
            expect(shipTwo.getName()).toBe('Battleship');
        });

        it('Correctly gets the length', () => {
            expect(shipOne.getLength()).toEqual(5);
            expect(shipTwo.getLength()).toEqual(4);
        });

        it('Correctly assigns an owner', () => {
            expect(shipOne.getOwner()).toEqual(1234);
            expect(shipOne.getOwner()).toEqual(shipTwo.getOwner());
        });

        it('Correctly gets its health', () => {
            expect(shipOne.getTimesHit()).toBe(0);
        });

        it('Correctly checks its sink state', () => {
            expect(shipOne.getIsSunk()).toBeFalsy();
        });

        it('Correctly checks its found state', () => {
            expect(shipOne.getIsFound()).toBeFalsy();
        });

        it('Correctly gets its orientation', () => {
            expect(shipOne.getAxis()).toBe('X');
        });

        it('Correctly gets an immutable copy of the ship coordinates', () => {
            const coords = shipOne.getCoordinates();
            expect(coords).toEqual(expect.any(Array));
            coords.push('Test');
            expect(shipOne.getCoordinates().length).toEqual(0);
        });

        it('Correctly adds and gets a coordinate', () => {
            shipOne.addCoordinate({ nodeID: '1, 1', position: 1 });
            expect(shipOne.getCoordinates().length).toEqual(1);
            expect(() =>shipOne.addCoordinate({ nodeID: '1, 1', position: 1 })).toThrow();
            expect(() => shipOne.addCoordinate()).toThrow();
        });

        it('Gets an immutable copy of the coordinate segements', () => {
            shipOne.addCoordinate({ nodeID: '1, 1', position: 1 });
            const segments = shipOne.getSegments();
            expect(segments).toEqual(expect.any(Array));
            expect(segments.length).toEqual(1);
            segments.push('Test');
            expect(shipOne.getSegments().length).toEqual(1);
        })
    });

    describe('State Changes', () => {
        let shipOne = null;
        let shipTwo = null;

        beforeEach(() => {
            shipOne = fleet[0];
            shipTwo = fleet[1];

            for (let i = 1; i < 2; i++) {
                for (let j = 1; j < 5; j++) {
                    if (i === 1) shipOne.addCoordinate({ nodeID: `${i}, ${j}`, position: j });
                    if (i === 2 && j < 5) shipTwo.addCoordinate({ nodeID: `${i}, ${j}`, position: j });
                };
            };
        });

        afterEach(() => shipOne = shipTwo = null);

        it('Receives a hit', () => {
            expect(() => shipOne.receiveHit()).toThrow();
            expect(shipOne.receiveHit({ nodeID: `1, 1` })).toBe('Carrier Hit');
            expect(shipOne.getIsFound()).toBeTruthy();
        })

        it('Updates hit count on hit', () => {
            expect(shipOne.getTimesHit()).toEqual(0);
            shipOne.receiveHit({ nodeID: `1, 1` });
            expect(shipOne.getTimesHit()).toEqual(1);
        });

        it('Marks ship found on first hit', () => {
            expect(shipOne.getIsFound()).toBeFalsy();
            shipOne.receiveHit({ nodeID: `1, 1` });
            expect(shipOne.getIsFound()).toBeTruthy();
        });

        it('Sinks ship on enough hits', () => {
            expect(shipOne.getIsSunk()).toBeFalsy();
            shipOne.receiveHit({ nodeID: `1, 1` });
            shipOne.receiveHit({ nodeID: `1, 2` });
            shipOne.receiveHit({ nodeID: `1, 3` });
            shipOne.receiveHit({ nodeID: `1, 4` });
            shipOne.receiveHit({ nodeID: `1, 5` });
            expect(shipOne.getIsSunk()).toBeTruthy();
        });

        it('Updates a node state on hit', () => {
           shipOne.receiveHit({ nodeID: `1, 1` });
           const [ node ] = shipOne.getSegments();
           const [ _, { isHit } ] = node;
           expect(isHit).toBeTruthy();
        });

        it('Recognises on unconnected node', () => {
            expect(shipTwo.receiveHit({ nodeID: `1, 1` })).toBe('Invalid target')
        });

        it('Prevents duplicate hit', () => {
            shipOne.receiveHit({ nodeID: `1, 1` });
            expect(shipOne.receiveHit({ nodeID: `1, 1` })).toBe('Already destroyed');
        });

        it('Switches axis', () => {
            expect(shipOne.getAxis()).toBe('X');
            shipOne.switchAxis();
            expect(shipOne.getAxis()).toBe('Y');
        });

        it('Resets ship state', () => {
            shipOne.switchAxis();
            shipOne.receiveHit({ nodeID: `1, 1` });
            shipOne.resetShip();
            const coords = shipOne.getCoordinates();
            expect(coords.length).toEqual(0);
            expect(shipOne.getAxis()).toBe('X');
            expect(shipOne.getIsFound()).toBeFalsy();
            expect(shipOne.getTimesHit()).toEqual(0);
        });
    });
});
