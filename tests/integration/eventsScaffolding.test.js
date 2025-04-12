import { eventEmitterFactory } from "../../src/gameEventManager";
import { eventSchemaFactory } from "../../src/gameEventSchema";

describe('Event Scaffolding Intergration', () => {
    let manager, schema = null;

    beforeEach(() => {
        schema = eventSchemaFactory();
        manager = eventEmitterFactory();
        schema.addEventName('testEvent', 'Tests event integration', 'null')
    });

    afterEach(() => manager = schema = null);

    it('Correctly checks if the event emitter is testing the schema for a valid entry', () => {
        expect(() => manager.on(schema.getEventNames(), 'testEvent', () => true)).not.toThrow();
    })
});
