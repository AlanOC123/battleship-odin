import eventHubFactory from "../../../src/core/factories/eventHubFactory";
import validateEvent from "../../../src/core/events/eventSchemas";

describe('Event Hub', () => {
    let hub = null;

    beforeEach(() => hub = eventHubFactory(validateEvent));
    afterEach(() => hub = null);

    describe('Debug Method', () => {
        it('gives correct debug information', () => {
            const debug = hub.debug();
            expect(debug).toEqual(expect.objectContaining({ listeners: expect.any(Map), length: expect.any(Number) }));
        });

        it('provides and immutable copy of the listeners', () => {
            const debugOne = hub.debug();
            const listeners = debugOne.listeners;
            listeners.set('Test', () => 'Test');
            const debugTwo = hub.debug();
            expect(debugOne.listeners.has('Test')).toBeTruthy();
            expect(debugTwo.listeners.has('Test')).toBeFalsy();
        });
    });

    describe('On Method', () => {
        it('adds a new listener', () => {
            let debug = hub.debug();
            expect(debug.length).toEqual(0);
            hub.on('Test', () => 'Test');
            debug = hub.debug();
            expect(debug.length).toEqual(1);
        });

        it('throws on missing event or functions', () => {
            expect(() => hub.on()).toThrow();
        });

        it('adds multiple handlers at once', () => {
            const funcOne = () => 1;
            const funcTwo = () => 2;
            hub.on('Test', funcOne, funcTwo);
            const debug = hub.debug();
            const { listeners } = debug;
            const fns = listeners.get('Test');
            expect(fns.includes(funcOne)).toBeTruthy();
            expect(fns.includes(funcTwo)).toBeTruthy();
        });

        it('adds an array of functions', () => {
            const funcOne = () => 1;
            const funcTwo = () => 2;
            const arr = [ funcOne, funcTwo ];
            hub.on('Test', arr);
            const debug = hub.debug();
            const { listeners } = debug;
            const fns = listeners.get('Test');
            expect(fns.includes(funcOne)).toBeTruthy();
            expect(fns.includes(funcTwo)).toBeTruthy();
        });

        it('throws on empty array', () => {
            expect(() => hub.on('Test', [])).toThrow();
        });
    });

    describe('Off Method', () => {
        it('removes a listener', () => {
            const func = () => 1;
            hub.on('Test', func);
            hub.off('Test');
            expect(hub.debug().length).toEqual(0);
        });

        it('removes a handler', () => {
            const funcOne = () => 1;
            const funcTwo = () => 1;
            hub.on('Test', funcOne, funcTwo);
            hub.off('Test', funcOne);
            const debug = hub.debug();
            const listeners = debug.listeners;
            const handlers = listeners.get('Test');
            expect(handlers.includes(funcTwo)).toBeTruthy();
            expect(handlers.includes(funcOne)).toBeFalsy();
        });

        it('throws on missing or invalid event', () => {
            expect(() => hub.off()).toThrow();
            expect(() => hub.off(123)).toThrow();
        });
   });

   describe('Emit Method', () => {
    const func = jest.fn();

        beforeEach(() => {
            hub.on('Launch Screen Loaded', func);
        });

        afterEach(() => {
            hub.off('Launch Screen Loaded');
        });

        it('correctly emits an event', () => {
            hub.emit('Launch Screen Loaded', { data: 'Test' });
            expect(func).toHaveBeenCalled();
            expect(func).toHaveBeenCalledWith({ data: 'Test' });
        });

        it('emits the correct event', () => {
            const fnA = jest.fn();
            const fnB = jest.fn();

            hub.on('Launch Screen Loaded', fnA);
            hub.on('Launch Button Clicked', fnB);

            hub.emit('Launch Screen Loaded', {});
            expect(fnA).toHaveBeenCalled();
            expect(fnB).not.toHaveBeenCalled();
        })

        it('correctly throws on missing parameters', () => {
            expect(() => hub.emit()).toThrow();
            expect(() => hub.emit(123, {})).toThrow();
            expect(() => hub.emit('Test', 123)).toThrow();
        });
   });

    describe('Once Method', () => {
        it('calls a once method only once', () => {
            const func = jest.fn();
            hub.once('Launch Screen Loaded', func);
            hub.emit('Launch Screen Loaded', {});
            expect(func).toHaveBeenCalledTimes(1);
        });

        it('removes the handler after a shallow call', () => {
            const func = jest.fn();
            hub.once('Launch Screen Loaded', func);
            hub.emit('Launch Screen Loaded', {});
            const debug = hub.debug();
            expect(debug.listeners.get('Launch Screen Loaded').length).toEqual(0);
        });

        it('removes an event after a deep call', () => {
            const func = jest.fn();
            hub.once('Launch Screen Loaded', func, true);
            hub.emit('Launch Screen Loaded', {});
            const debug = hub.debug();
            expect(debug.listeners.get('Launch Screen Loaded')).toBeUndefined();
        })
    });
});
