import eventDispatch from '../../src/helpers/eventDispatch';

describe('Event Dispatch', () => {
    let handler = null;

    beforeEach(() => {
        handler = new Map([[ 'Game Started', () => 1 ], [ 'Game Ended', () => 2 ]]);
    });

    afterEach(() => {
        handler = null;
    });

    it('Correctly dispatches an event', () => {
        expect(eventDispatch(handler, { eventName: 'Game Started' })).toEqual(1);
        expect(eventDispatch(handler, { eventName: 'Game Ended' })).toEqual(2);
        expect(() => eventDispatch(handler, 'daddafd')).toThrow();
        expect(() => eventDispatch()).toThrow();
    })
})
