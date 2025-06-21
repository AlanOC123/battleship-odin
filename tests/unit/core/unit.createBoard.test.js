import boardFactory from '../../../src/core/factories/board/board';
import FLEET_CONFIG from '../../../src/core/data/fleet/config';

describe('[Unit] Create Board', () => {
        let board = null;

        beforeEach(() => {
        board = boardFactory.createBoard('1234');
        });

        afterEach(() => {
        board = null;
        });

    describe('Initialization', () => {
        it('initialises board state and owner', () => {
            expect(board.getInit()).toBe(true);
            expect(board.getOwner()).toBe('1234');
        })

        it('creates a board with 100 nodes', () => {
            expect(board.getBoard().length).toEqual(100);
        });

        it('can retrieve nodes by id', () => {
            expect(board.getNode(42)).not.toBeNull()
        })

        it('return null if an invalid node is accessed', () => {
            expect(board.getNode(101)).toEqual(expect.objectContaining({
                error: true,
                kind: 'critical',
            }));
        })

    });

    describe('Ship Placement', () => {
        const carrier = FLEET_CONFIG.CONFIG.CARRIER;
        const destroyer = FLEET_CONFIG.CONFIG.DESTROYER;
        const cruiser = FLEET_CONFIG.CONFIG.CRUISER;
        const submarine = FLEET_CONFIG.CONFIG.SUBMARINE;
        const patrol = FLEET_CONFIG.CONFIG.PATROL;

        it('allows placement in the centre', () => {
            const res = board.getPlacementCoords(5, 5, 10, carrier.HEALTH);
            expect(res).toEqual(expect.objectContaining({
                success: true,
                result: expect.objectContaining({
                    placementNodes: [55, 65, 75, 85, 95]
                })
            }));
        });

        it('automatically flips orientation on a corner', () => {
            const topLeftRes = board.getPlacementCoords(0, 0, 1, destroyer.HEALTH);
            const topRightRes = board.getPlacementCoords(0, 9, 1, cruiser.HEALTH);
            const bottomLeftRes = board.getPlacementCoords(9, 0, 10, submarine.HEALTH);
            const bottomRightRes = board.getPlacementCoords(9, 9, 10, patrol.HEALTH);

            expect(topLeftRes).toEqual(expect.objectContaining({
                success: true,
                result: expect.objectContaining({
                    placementNodes: [0, 1, 2, 3]
                })
            }));
            expect(topRightRes).toEqual(expect.objectContaining({
                success: true,
                result: expect.objectContaining({
                    placementNodes: [9, 8, 7]
                })
            }));
            expect(bottomLeftRes).toEqual(expect.objectContaining({
                success: true,
                result: expect.objectContaining({
                    placementNodes: [90, 80, 70]
                })
            }));
            expect(bottomRightRes).toEqual(expect.objectContaining({
                success: true,
                result: expect.objectContaining({
                    placementNodes: [99, 89]
                })
            }));
        })

        it('automatically flips orientation on or close to a right or bottom leading edge', () => {
            const edgeCaseOneRes = board.getPlacementCoords(2, 9, 1, carrier.HEALTH);
            const edgeCaseTwoRes = board.getPlacementCoords(3, 0, 10, destroyer.HEALTH);
            const edgeCaseThreeRes = board.getPlacementCoords(9, 5, 10, cruiser.HEALTH);

            expect(edgeCaseOneRes).toEqual(expect.objectContaining({
                success: true,
                result: expect.objectContaining({
                    placementNodes: [29, 28, 27, 26, 25]
                })
            }));
            expect(edgeCaseTwoRes).toEqual(expect.objectContaining({
                success: true,
                result: expect.objectContaining({
                    placementNodes: [30, 40, 50, 60]
                })
            }));
            expect(edgeCaseThreeRes).toEqual(expect.objectContaining({
                success: true,
                result: expect.objectContaining({
                    placementNodes: [95, 85, 75]
                })
            }));
        })

        it('assigns proper placement on the board', () => {
            const res = board.placeShip(5, 5, 10, carrier);
            const node = board.getNode(55);
            expect(res).toEqual(expect.objectContaining({
                success: true,
            }));

            expect(node.getShipData().NAME).toEqual(carrier.PARTS[0].NAME);

            expect(board.placeShip()).toEqual(expect.objectContaining({
                success: false,
                error: true,
            }));
        })

        it('prevents overlapping nodes', () => {
            board.placeShip(5, 5, 10, carrier);
            const overlap = board.placeShip(5, 5, 10, carrier);

            expect(overlap).toEqual(expect.objectContaining({
                success: false,
                result: expect.objectContaining({
                    hasOverlap: true,
                })
            }));
        })

        it('caches tested nodes', () => {
            board.getPlacementCoords(2, 9, 1, carrier.HEALTH);
            const cached = board.getPlacementCoords(2, 9, 1, carrier.HEALTH);
            expect(cached).toEqual(expect.objectContaining({ result: expect.objectContaining({ cachedResponse: true }) }));
        })


        it('cached response is faster than fresh calculation', () => {
            const x = 2, y = 9, increment = 1, length = carrier.HEALTH;

            const t1 = performance.now();
            board.getPlacementCoords(x, y, increment, length); // fresh
            const t2 = performance.now();

            const t3 = performance.now();
            board.getPlacementCoords(x, y, increment, length); // cached
            const t4 = performance.now();

            const freshDuration = t2 - t1;
            const cachedDuration = t4 - t3;

            console.log(`Fresh: ${freshDuration}ms, Cached: ${cachedDuration}ms`);

            // Don't test for absolute values — just relative speed
            expect(cachedDuration).toBeLessThan(freshDuration);
        });
    });

    describe('Attacks', () => {
        it('registers a hit on a valid coordinate', () => {
            board.getNode(11).setShipData({ part: 'Test' });
            expect(board.strikeBoard(1, 1)).toEqual(expect.objectContaining({
                success: true,
                result: expect.objectContaining({
                    isHit: true,
                    totalHits: 1,
                    totalStrikes: 1,
                })
            }))
        });

        it('registers a miss on an empty coordinate', () => {
            expect(board.strikeBoard(1, 1)).toEqual(expect.objectContaining({
                success: true,
                result: expect.objectContaining({
                    isHit: false,
                    totalMisses: 1,
                    totalStrikes: 1,
                })
            }));
        })

        it('prevents attacking the same coordinate twice', () => {
            board.strikeBoard(1, 1);
            expect(board.strikeBoard(1, 1)).toEqual(expect.objectContaining({
                success: false,
                result: expect.objectContaining({
                    isHit: false,
                    totalMisses: 1,
                    totalStrikes: 1,
                    nodeMessage: 'Duplicate Hit'
                })
            }))
        })
    });

    describe('Reset & Utility', () => {
        it('resets all nodes to default state', () => {
            board.getNode(11).setShipData({ part: 'Test' });
            board.strikeBoard(1, 1);
            board.resetBoard();
            expect(board.strikeBoard(1, 1)).toEqual(expect.objectContaining({
                    success: true,
                    result: expect.objectContaining({
                        isHit: false,
                        totalMisses: 1,
                        totalStrikes: 1,
                })
            }))
        })

        it('can get a full board map', () => {
            expect(board.getBoard()).toEqual(expect.any(Array))
            expect(board.getBoard().length).toEqual(100);
        });
    });
});
