import state from "../../src/core/singletons/state";
import start from '../../src/start';

describe('State Start', () => {
    it('initialises state once start runs', () => {
        expect(state.getState()).toBeNull();
        start();
        expect(state.getState()).toEqual(expect.any(Object));
    });

    it('allows access to meta data once initilaised', () => {
        start();
        expect(state.getState('metaData')).toEqual(expect.objectContaining({
            id: expect.any(String),
            device: expect.any(String),
            memory: expect.anything(),
            threads: expect.anything(),
            start: expect.any(String),
            end: null,
        }));
    });
});
