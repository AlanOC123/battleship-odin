import { buildMockEvent, mockPayload } from "../__mocks__/events.mock";
import hub from "../../src/events/hub";

describe('Event Hub', () => {
    const handler = jest.fn();
    let event = null;

    beforeEach(() => {
        event = buildMockEvent();
        handler.mockClear();
        hub.removeAll()
    })

    it('registers a handler and emits an event successfully', () => {
        hub.on(event.key, handler);
        hub.emit(event, mockPayload);

        expect(handler).toHaveBeenCalledWith(mockPayload);
    });

    it('calls handler multiple times on successive emits', () => {
        hub.on(event.key, handler);
        hub.emit(event, mockPayload);
        hub.emit(event, mockPayload);

        expect(handler).toHaveBeenCalledTimes(2);
    });

    it('throws when emitting an invalid event payload', () => {
        const invalidPayload = { foo: 123 };

        expect(() => hub.emit(event, invalidPayload)).toThrow();
    });

    it('throws if payload is missing or undefined', () => {
        hub.on(event.key, handler);
        expect(() => hub.emit(event)).toThrow();
    });

    it('removes a handler with off()', () => {
        hub.on(event.key, handler);
        hub.off(event.key);
        hub.emit(event, mockPayload);
        expect(handler).not.toHaveBeenCalled();
    });

    it('calls all registered handlers for an event', () => {
        const fn1 = jest.fn();
        const fn2 = jest.fn();

        hub.on(event.key, fn1, fn2);
        hub.emit(event, mockPayload);

        expect(fn1).toHaveBeenCalled();
        expect(fn2).toHaveBeenCalled();
    });

    it('does nothing when off() is called on a non-existent key', () => {
        expect(() => hub.off('non-existent-key')).not.toThrow();
    });
});
