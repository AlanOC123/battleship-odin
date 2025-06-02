import { mockPayload, mockEvent, buildMockEvent } from '../../__mocks__/events.mock';
import createEvent from '../../../src/factories/createEvent';

describe('Create Event', () => {
    it('creates an event object', () => {
        const event = buildMockEvent();
        expect(event).toEqual(expect.objectContaining({
            key: expect.any(String),
            type: expect.any(String),
            source: expect.any(String),
            family: expect.any(String),
        }));
    });

    it('throws on missing data', () => {
        expect(() => createEvent()).toThrow();
        expect(() => createEvent(mockEvent.map)).toThrow();
        expect(() => createEvent(mockEvent.source)).toThrow();
    });

    it('returns the event key, type and source', () => {
        const { key, type, source, family } = buildMockEvent();
        expect(key).toBe('mock-event');
        expect(type).toBe('generic');
        expect(source).toBe('MockTest');
        expect(family).toBe('test');
    })
});
