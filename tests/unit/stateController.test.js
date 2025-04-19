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

    
});
