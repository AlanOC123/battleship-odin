import playerFactory from '../../../src/core/factories/playerFactory';

describe('Player Factory', () => {
    let player = null;
    let AI = null;

    beforeEach(() => {
        player = playerFactory('Test');
        AI = playerFactory('AI', true);
     });

    afterEach(() => player = null, AI = null);

    describe('Getter methods', () => {
        it('Correctly gets the player name', () => {
            expect(player.getName()).toBe('Test');
            expect(AI.getName()).toBe('AI');
        });

        it('Correctly gets the player type', () => {
            expect(player.getIsAI()).toBeFalsy();
            expect(AI.getIsAI()).toBeTruthy();
        });

        it('Correctly gets the player ID', () => {
            expect(player.getID()).toEqual(expect.any(Number));
        });

        it('Contains a unique ID', () => {
            expect(player.getID()).not.toEqual(AI.getID());
        });

        it('Correctly gets the date created', () => {
            expect(player.getCreatedAt()).toEqual(expect.any(String));
            expect(() => new Date(player.getCreatedAt())).not.toThrow();
        });

        it('Gets an immutable copy of the player fleet array', () => {
            let fleet = player.getFleet();
            expect(fleet).toEqual(expect.any(Array));
            fleet = [ fleet.pop() ];
            expect(fleet.length).not.toEqual(player.getFleet().length);
        });

        it('Gets the number of ships left', () => {
            expect(player.getShipsLeft()).toEqual(5);
        });

        it('Correctly gets the player map', () => {
            expect(player.getMap()).toEqual(expect.any(Object));
            expect(Object.entries(player.getMap()).length).toBeGreaterThan(0);
        });
    });
});
