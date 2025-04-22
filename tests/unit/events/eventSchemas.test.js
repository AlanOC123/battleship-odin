import coreEventValidator from '../../../src/core/events/coreEventValidator';

describe('Event Schemas', () => {
    it('validates an event correctly', () => {
        expect(coreEventValidator('App Started', {})).toBeTruthy();
    });

    it('throws when given data that isnt a string', () => {
        expect(() => coreEventValidator(123, {})).toThrow();
    });

    it('throws when given data that isnt an event', () => {
        expect(() => coreEventValidator('Jump Start', {})).toThrow();
    });

    it('throws when the schema doesnt match', () => {
        expect(() => coreEventValidator('Game Set Up', { player: 1 })).toThrow();
    });
})
