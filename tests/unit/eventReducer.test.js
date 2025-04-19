import eventReducerFactory from "../../src/factories/eventReducerFactory";

describe('Event Reducer', () => {
    let reducer = null;

    beforeEach(() => {
        reducer = eventReducerFactory();
    });

    afterEach(() => {
        reducer = null;
    });

    it('Correctly adds a new handler', () => {
        const eventName = 'Game Started';
        const fn = () => 1;

        expect(() => reducer.addHandler(eventName, fn)).not.toThrow();
        expect(() => reducer.addHandler(eventName, fn)).toThrow();
        expect(() => reducer.addHandler()).toThrow();
        expect(() => reducer.addHandler(123, 'fn')).toThrow();
    });

    it('Correctly gets the handlers', () => {
        const eventName = 'Game Started';
        const fn = () => 1;
        reducer.addHandler(eventName, fn)
        expect(reducer.getHandlers().size).toEqual(1);
    });

    it('Correctly removes a handler', () => {
        const eventName = 'Game Started';
        const fn = () => 1;
        reducer.addHandler(eventName, fn)
        expect(reducer.getHandlers().size).toEqual(1);
        reducer.removeHandler(eventName);
        expect(reducer.getHandlers().size).toEqual(0);
        expect(() => reducer.removeHandler(eventName)).toThrow();
    })
})
