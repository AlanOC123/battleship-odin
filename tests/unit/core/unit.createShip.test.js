import shipFactory from "../../../src/core/factories/ship/ship";
import image from '../../__mocks__/mock.image';


describe('[Unit] Create Ship', () => {
    const config = shipFactory.getConfigurationData().result.shipConfigurations[0];
    let ship = null;

    beforeEach(() => ship = shipFactory.createShip(config));

    afterEach(() => ship = null);

    describe('Initialisation', ()=> {
        it('initialises ship meta data', () => {
            expect(ship.getID()).toBe('carrier');
            expect(ship.getParts()).toEqual(expect.any(Array));
            expect(ship.getOrientation()).toEqual(10);
        })

        it('initialises ship lifecycle data', () => {
            expect(ship.getCondition()).toEqual(100);
            expect(ship.getParts()).toEqual(expect.any(Array));
            expect(ship.getOrientation()).toEqual(10);
        })

        it('initialises ship placement data', () => {
            expect(ship.getPlacement()).toEqual(expect.any(Array));
        })

        it ('initialises ship status data', () => {
            expect(ship.getIsPlaced()).toEqual(false);
            expect(ship.getIsSunk()).toEqual(false);
        })
    })

    describe('Ship placement', () => {
        it('correctly sets ship location', () => {
            const success = ship.placeShip([55, 65, 75, 85, 95]);
            expect(success).toEqual(expect.objectContaining({
                success: true,
                result: expect.objectContaining({
                    attemptedPlacements: [55, 65, 75, 85, 95]
                })
            }))

            expect(ship.getIsPlaced()).toBe(true);

            let fail = ship.placeShip()
            expect(fail).toEqual(expect.objectContaining({
                success: false,
                error: true,
            }))

            fail = ship.placeShip([1, 2, 3]);

            expect(fail).toEqual(expect.objectContaining({
                success: false,
                error: true,
            }));

            fail = ship.placeShip([1, 'two', 3, 4, 5]);

            expect(fail).toEqual(expect.objectContaining({
                success: false,
                error: true,
            }));

            const duplicate = ship.placeShip([1, 2, 3, 4, 5]);

            expect(duplicate).toEqual(expect.objectContaining({
                success: true,
                result: expect.objectContaining({
                    attemptedPlacements: [1, 2, 3, 4, 5],
                    overridePlacement: true,
                    prevCoords: [55, 65, 75, 85, 95]
                })
            }))
        })
    })

    describe('Ship hit', () => {
        it('registers a hit', () => {
            ship.placeShip([55, 65, 75, 85, 95])

            const success = ship.receiveHit(55);

            expect(success).toEqual(expect.objectContaining({
                success: true,
                result: expect.objectContaining({
                    hits: 1,
                    condition: 80,
                    isSunk: false,
                })
            }))

            let fail = ship.receiveHit(1);

            expect(fail).toEqual(expect.objectContaining({
                error: true,
                result: expect.objectContaining({
                    hits: 1,
                    condition: 80,
                    coord: 1,
                })
            }))

            ship.receiveHit(65);
            ship.receiveHit(75);

            const critical = ship.receiveHit(85);

            expect(critical).toEqual(expect.objectContaining({
                success: true,
                result: expect.objectContaining({
                    hits: 4,
                    condition: 20,
                    isSunk: false,
                })
            }))
        })

        it('sinks a ship', () => {
            ship.placeShip([55, 65, 75, 85, 95])
            ship.receiveHit(55);
            ship.receiveHit(65);
            ship.receiveHit(75);

            const critical = ship.receiveHit(85);

            expect(critical).toEqual(expect.objectContaining({
                success: true,
                result: expect.objectContaining({
                    hits: 4,
                    condition: 20,
                    isSunk: false,
                })
            }))

            const sunk = ship.receiveHit(95);

            expect(sunk).toEqual(expect.objectContaining({
                success: true,
                result: expect.objectContaining({
                    hits: 5,
                    condition: 0,
                    isSunk: true,
                })
            }))

            const emptyHit = ship.receiveHit(55);
            expect(emptyHit).toEqual(expect.objectContaining({
                error: true,
                result: expect.objectContaining({
                    hits: 5,
                    condition: 0,
                    isSunk: true,
                }),
                kind: 'warn',
            }))
        })
    })

    describe('Ship data updates', () => {
        it('changes the orientation value', () => {
            expect(ship.getOrientation()).toEqual(10);
            const success = ship.setOrientation('Y');
            expect(success).toEqual(expect.objectContaining({
                success: true,
                result: expect.objectContaining({
                    key: 'Y',
                    value: 1,
                }),
            }))

            const fail = ship.setOrientation(123);
            expect(fail).toEqual(expect.objectContaining({
                error: true,
                result: expect.objectContaining({
                    key: 123,
                }),
            }))
        })
    });
});
