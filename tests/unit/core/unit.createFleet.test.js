import fleetFactory from "../../../src/core/factories/fleet";

describe('[Unit] Create Fleet', () => {
    let fleet = null;

    beforeEach(() => {
        fleet = fleetFactory.createFleet('1234');
    });

    afterEach(() => {
        fleet = null;
    });

    describe('Initialization', () => {
        it ('prevents a failed fleet from forming', () => {
            let failedFleet = fleetFactory.createFleet();
            expect(failedFleet).toEqual(expect.objectContaining({
                error: true,
            }))
        });

        it('gets a successful init state', () => {
            expect(fleet.getInit()).toBe(true);
            expect(fleet.getOwner()).toBe('1234');
        })
    });

    describe('Ship placement', () => {
        it('allows ship selection', () => {
            const success = fleet.selectShip('carrier');
            expect(success).toEqual(expect.objectContaining({
                success: true,
                result: expect.objectContaining({
                    selectedShip: 'carrier',
                    isPlaced: false,
                })
            }))

            let fail = fleet.selectShip();
            expect(fail).toEqual(expect.objectContaining({
                error: true,
                result: expect.objectContaining({
                    selectedShip: null,
                })
            }))

            fail = fleet.selectShip('helicopter');
            expect(fail).toEqual(expect.objectContaining({
                error: true,
                result: expect.objectContaining({
                    selectedShip: null,
                    options: expect.any(Array),
                }),
                kind: 'warn'
            }))
        })

        it('places a ship', () => {
            let fail = fleet.placeShip([55, 65, 75, 85, 95]);
            expect(fail).toEqual(expect.objectContaining({
                error: true,
                result: expect.objectContaining({
                    selectedShip: null,
                })
            }))

            fleet.selectShip('carrier');
            fail = fleet.placeShip([55, 65, 75]);
            expect(fail).toEqual(expect.objectContaining({
                error: true,
            }))

            fleet.selectShip('carrier');
            const success = fleet.placeShip([55, 65, 75, 85, 95]);
            expect(success).toEqual(expect.objectContaining({
                success: true,
                result: expect.objectContaining({
                    placedShips: 1,
                    allShipsPlaced: false,
                })
            }))
        })
    });

    describe('Ship attacks', () => {
        it('receives an attack on a ship and prevent invalid attack attempts', () => {
            fleet.selectShip('carrier');
            fleet.placeShip([55,65,75,85,95]);

            let fail = fleet.attackShip();
            expect(fail).toEqual(expect.objectContaining({
                error: true,
                result: expect.objectContaining({
                    id: undefined,
                    coord: undefined,
                })
            }))

            fail = fleet.attackShip('helicopter', 55);

            expect(fail).toEqual(expect.objectContaining({
                error: true,
                result: expect.objectContaining({
                    id: 'helicopter',
                    options: expect.any(Array),
                })
            }))

            const success = fleet.attackShip('carrier', 55);

            expect(success).toEqual(expect.objectContaining({
                success: true,
                result: expect.objectContaining({
                    id: 'carrier',
                    coord: 55,
                    isSunk: false,
                    allShipsSunk: false,
                })
            }))
        })
    })

    describe('Fleet status', () => {
        const placementData = [
            { id: 'carrier', coords: [ 55, 65, 75, 85, 95 ] },
            { id: 'destroyer', coords: [ 0, 1, 2, 3 ] },
            { id: 'cruiser', coords: [ 29, 28, 27 ] },
            { id: 'cruiser', coords: [ 81, 82, 83 ] },
            { id: 'submarine', coords: [ 70, 80, 90 ] },
            { id: 'helicopter', coords: [ 15, 16 ] },
            { id: 'patrol', coords: [ 12, 13 ] },
        ]

        it ('updates on all ships placed', () => {
            const mappedPlacementsResponses = placementData.map(({ id, coords }) => {
                fleet.selectShip(id);
                return fleet.placeShip(coords);
            })

            const first = mappedPlacementsResponses[0];
            const final = mappedPlacementsResponses[mappedPlacementsResponses.length - 1];

            expect(first).toEqual(expect.objectContaining({
                success: true,
                result: expect.objectContaining({
                    placedShips: 1,
                    allShipsPlaced: false,
                })
            }))

            expect(final).toEqual(expect.objectContaining({
                success: true,
                result: expect.objectContaining({
                    placedShips: 5,
                    allShipsPlaced: true,
                })
            }))
        })

        it('updates on all ships sunk', () => {
            placementData.forEach(({ id, coords }) => {
                fleet.selectShip(id);
                fleet.placeShip(coords);
            });

            const mappedHitsResponses = placementData.map(({ id, coords }) => {
                let res = null;
                coords.forEach(coord => {
                    res = fleet.attackShip(id, coord);
                })

                return res;
            });

            const first = mappedHitsResponses[0];
            const final = mappedHitsResponses[mappedHitsResponses.length - 1];

            expect(first).toEqual(expect.objectContaining({
                success: true,
                result: expect.objectContaining({
                    remainingShips: 4,
                    allShipsSunk: false,
                })
            }))

            expect(final).toEqual(expect.objectContaining({
                success: true,
                result: expect.objectContaining({
                    remainingShips: 0,
                    allShipsSunk: true,
                })
            }))
        })
    });

    describe('Fleet utilities', () => {
        it('gets a ship from an id', () => {
            fleet.selectShip('patrol')
            fleet.placeShip([1, 2]);
            let fail = fleet.getShipFromFleet('helicopter');

            expect(fail).toEqual(expect.objectContaining({
                error: true,
                result: expect.objectContaining({
                    id: 'helicopter',
                    options: expect.any(Array),
                }),
                kind: 'warn'
            }))

            fail = fleet.getShipFromFleet();
            expect(fail).toEqual(expect.objectContaining({
                error: true,
                result: expect.objectContaining({
                    id: undefined,
                    options: expect.any(Array),
                }),
                kind: 'warn'
            }))
        })

        it('resets the fleet', () => {
            const placementData = [
                { id: 'carrier', coords: [ 55, 65, 75, 85, 95 ] },
                { id: 'destroyer', coords: [ 0, 1, 2, 3 ] },
                { id: 'cruiser', coords: [ 29, 28, 27 ] },
                { id: 'cruiser', coords: [ 81, 82, 83 ] },
                { id: 'submarine', coords: [ 70, 80, 90 ] },
                { id: 'helicopter', coords: [ 15, 16 ] },
                { id: 'patrol', coords: [ 12, 13 ] },
            ]

            placementData.forEach(({ id, coords }) => {
                fleet.selectShip(id);
                fleet.placeShip(coords);
            });

            expect(fleet.getAllShipsPlaced()).toBe(true);

            fleet.resetFleet();
            expect(fleet.getOwner()).toBe('1234');
            expect(fleet.getInit()).toBe(true);
            expect(fleet.getAllShipsPlaced()).toBe(false);
        })
    })

});
