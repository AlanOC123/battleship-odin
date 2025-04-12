import { eventEmitterFactory } from "../../src/gameEventManager";

describe('Event Emitter', () => {
    let manager = null;
    let schema = [ 'testEvent' ];

    beforeEach(() => manager = eventEmitterFactory());

    afterEach(() => manager = null);

    it ('Correctly adds a new event', () => {
        expect(() => manager.on(schema, 'testEvent', () => 1)).not.toThrow();
    });

    it('Correctly fires a new event', () => {
        const mockOne = jest.fn((val) => val * 2);
        manager.on(schema, 'testEvent', mockOne);
        manager.emit('testEvent', 4)
        expect(mockOne).toBeCalledWith(4);
        expect(mockOne).toHaveBeenCalledTimes(1);
        expect(mockOne).toHaveReturnedWith(8);
    });

    it('Correctly fires multiple handlers', () => {
        const mockOne = jest.fn(({ val }) => val * 2);
        const mockTwo = jest.fn(({ msg }) => `Received: ${msg}`);
        const payload = { val: 4, msg: `Runs well` };

        manager.on(schema, 'testEvent', mockOne, mockTwo);
        manager.emit('testEvent', payload);

        expect(mockOne).toBeCalledWith(payload);
        expect(mockOne).toHaveBeenCalledTimes(1);
        expect(mockOne).toHaveReturnedWith(8);

        expect(mockTwo).toBeCalledWith(payload);
        expect(mockTwo).toHaveBeenCalledTimes(1);
        expect(mockTwo).toHaveReturnedWith('Received: Runs well');
    });

    it('Correctly removes handlers from the event scope', () => {
        const OFF_RESULT = {
            EVENT_NOT_FOUND: 0,
            ALL_REMOVED: 1,
            HANDLER_NOT_FOUND: 2,
            HANDLER_REMOVED: 3,
          };

        const mockOne = jest.fn(({ val }) => val * 2);
        const mockTwo = jest.fn(({ msg }) => `${msg} Received`);
        const payload = { val: 4, msg: 'Game Started' };

        manager.on(schema, 'testEvent', mockOne);
        expect(manager.off('Bad Event')).toEqual(OFF_RESULT.EVENT_NOT_FOUND);
        expect(manager.off('testEvent')).toEqual(OFF_RESULT.ALL_REMOVED);

        manager.on(schema, 'testEvent', mockOne, mockTwo);
        expect(manager.off('testEvent', () => 'Do This')).toEqual(OFF_RESULT.HANDLER_NOT_FOUND);
        expect(manager.off('testEvent', mockTwo)).toEqual(OFF_RESULT.HANDLER_REMOVED);

        manager.emit('testEvent', payload);
        expect(mockOne).toBeCalledWith(payload);
        expect(mockOne).toHaveBeenCalledTimes(1);
        expect(mockOne).toHaveReturnedWith(8);
        expect(mockTwo).not.toHaveBeenCalled();
    });

    it('Correctly fires an only once event, only once', () => {
        const mock = jest.fn();

        manager.once(schema, 'testEvent', mock);
        manager.emit('testEvent');
        manager.emit('testEvent');
        expect(mock).toHaveBeenCalledTimes(1);
    });

    it('Correctly gives a copied instance of all stored events for inspection', () => {
        const mock = jest.fn();
        manager.on(schema, 'testEvent', mock);
        expect(manager.debug().events.has('testEvent')).toBeTruthy();
        expect(manager.debug().length).toEqual(1);
        const mapCopy = manager.debug();
        mapCopy.events.set(1, 1);
        expect(mapCopy.events.has(1)).toBeTruthy();
        expect(manager.debug().events.has(1)).toBeFalsy();
    });
})
