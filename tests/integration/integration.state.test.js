import GLOBAL_NAMES from '../../src/data/shared/names.js';
import EVENT_KEYS from '../../src/data/events/keys.js';
import state from "../../src/core/singletons/state";
import eventHub from '../../src/events/hub';

const MODULE_NAME = GLOBAL_NAMES.MODULE_NAMES.TEST_SUITE;

describe('[Integration] State', () => {
    const msg = eventHub.createMessage(EVENT_KEYS.START_APP, MODULE_NAME, { isLaunched: true });

    it('initialises state once start runs', () => {
        expect(state.getState()).toBeNull();
        eventHub.emitMessage(msg);
        expect(state.getState()).toEqual(expect.any(Object));
    });

    it('allows access to meta data once initilaised', () => {
        eventHub.emitMessage(msg);
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
