import eventEmitter from "../../src/factories/eventEmitter";
import eventsSchema from "../../src/eventSchema";

describe('Event Scaffolding Intergration', () => {
    let manager, schema = null;

    beforeEach(() => {
        schema = eventsSchema();
        manager = eventEmitter();
        schema.addEventName('testEvent', 'Tests event integration', 'null')
    });

    afterEach(() => manager = schema = null);

    it('Correctly checks if the event emitter is testing the schema for a valid entry', () => {
        expect(() => manager.on(schema.getEventNames(), 'testEvent', () => true)).not.toThrow();
    })
});
