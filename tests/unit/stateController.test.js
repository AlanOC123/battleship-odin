import { stateController } from "../../src/logic/stateController";

describe('State Controller', () => {
    let state = null;

    beforeEach(() => state = stateController());
    afterEach(() => state = null);

    it('Correctly denies access to private variable', () => {
        expect(state?._GAME_TYPE).toBeUndefined();
        expect(state?._CURRENT_PLAYER).toBeUndefined();
        expect(state?._TIME_STAMPS).toBeUndefined();
    });

    it('Correctly exposes a cloned state', () => {

    });

    it('Correctly dispatches an event', () => {

    });

    it('Correctly blocks invalid events', () => {

    });

    it('Correctly adds and access timeline nodes', () => {

    });

    it('Correctly recognises all ships being placed', () => {

    });

    it('Correctly starts the game', () => {

    });

    it('Correctly updates the player on turn', () => {

    })
});
