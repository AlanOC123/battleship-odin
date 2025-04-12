import eventSchema from "../../src/eventSchema";
import eventEmitter from "../../src/factories/eventEmitter";

describe('Event Emitter', () => {
    let manager = null;
    let schema = null;

    beforeEach(() => {
        schema = eventSchema();
        manager = eventEmitter();
    });

    afterEach(() => schema = manager = null);

    it ('Correctly adds a new event', () => {
        expect
    })
})
