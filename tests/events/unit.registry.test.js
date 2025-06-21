import { genericMockEventData } from "../__mocks__/mock.events";
import registry from "../../src/events/registry";

describe('[Unit] Event Registry', () => {
    beforeEach(() => registry.clearRegistry());

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('creates a new event type', () => {
        const { name, schema, type, family } = genericMockEventData;
        expect(registry.createEvent(name, schema, type, family)).toEqual(expect.any(String));
    });

    it('prevents a duplicate event from being added', () => {
        const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
        const { name, schema, type, family } = genericMockEventData;
        registry.createEvent(name, schema, type, family);
        registry.createEvent(name, schema, type, family);
        expect(warnSpy).toHaveBeenCalled()
    });

    it('deletes an event from an id', () => {
        const { name, schema, type, family } = genericMockEventData;
        const id = registry.createEvent(name, schema, type, family);
        expect(registry.deleteEvent()).toBeFalsy();
        expect(registry.deleteEvent(id)).toBeTruthy();
        expect(registry.deleteEvent('test')).toBeFalsy();
    });
});
