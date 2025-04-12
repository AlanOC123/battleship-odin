import { eventSchemaFactory } from "../../src/gameEventSchema";

describe('Event Schema', () => {
    let schema = null;

    beforeEach(() => schema = eventSchemaFactory());
    afterEach(() => schema = null);

    it('Correctly allows access to event names', () => {
        expect(schema?.eventName).toBeUndefined();
    });

    it('Correctly adds a new event', () => {
        expect(schema.hasEvent('testEvent')).toBeFalsy();
        schema.addEventName('testEvent', 'Test Event Name', 'null');
        expect(schema.hasEvent('testEvent')).toBeTruthy();
    });

    it('Correctly removes an event', () => {
        schema.addEventName('testEvent', 'Test Event Name', 'null');
        expect(schema.hasEvent('testEvent')).toBeTruthy();
        schema.removeEventName('testEvent');
        expect(schema.hasEvent('testEvent')).toBeFalsy();
    });

    it('Correctly clears all events', () => {
        schema.addEventName('testEventOne', 'Test One Event Name', 'null');
        schema.addEventName('testEventTwo', 'Test Two Event Name', 'null');
        schema.addEventName('testEventThree', 'Test Three Event Name', 'null');
        expect(schema.hasEvent('testEventOne')).toBeTruthy();
        expect(schema.hasEvent('testEventTwo')).toBeTruthy();
        expect(schema.hasEvent('testEventThree')).toBeTruthy();
        schema.clearAll();
        expect(schema.hasEvent('testEventOne')).toBeFalsy();
        expect(schema.hasEvent('testEventTwo')).toBeFalsy();
        expect(schema.hasEvent('testEventThree')).toBeFalsy();
    });

    it('Correctly get an event description', () => {
        schema.addEventName('testEvent', 'Test Event Name', 'null');
        expect(schema.getEventInfo('testEvent')).toEqual({ name: 'testEvent', description: 'Test Event Name', payload: "null" });
        expect(schema.getEventInfo('Bad Event')).toBeNull();
    });
});
