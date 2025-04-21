import validateEvent from "../../../src/core/events/eventSchemas";

describe('Event Schemas', () => {
    it('validates an event correctly', () => {
        expect(validateEvent('Launch Screen Loaded', {})).toBeTruthy();
    });

    it('throws when given data that isnt a string', () => {
        expect(() => validateEvent(123, {})).toThrow();
    });

    it('throws when given data that isnt an event', () => {
        expect(() => validateEvent('Jump Start', {})).toThrow();
    });

    it('throws when the schema doesnt match', () => {
        expect(() => validateEvent('Game Set Up', { player: 1 })).toThrow();
    });
})
