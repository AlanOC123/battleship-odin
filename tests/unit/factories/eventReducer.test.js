import eventReducerFactory from "../../../src/core/factories/eventReducerFactory";

describe('Event Reducer', () => {
    let reducer = null;
    const eventStructure = [
        ['Test One', [ () => 1 ]],
        ['Test Two', [ () => 2] ],
        ['Test Three', [ () => 3] ],
    ]
    beforeEach(() => reducer = eventReducerFactory(eventStructure));
    afterEach(() => reducer = null);

    it('throws when not given a structure of events', () => {
        expect(() => eventReducerFactory()).toThrow();
    })

    describe('Get Handlers Method', () => {
        it('correctly returns a map of the events', () => {
            expect(reducer.getHandlers().map).toEqual(expect.any(Map));
        });

        it('gets an immutable instance of the events', () => {
            const { map } = reducer.getHandlers();
            map.set('Bad', () => 4);
            expect(reducer.getHandlers().map.has('Bad')).toBeFalsy();
        });

        it('correctly gets an array of events from the keys thats immutable', () => {
            const { events } = reducer.getHandlers();
            expect(events).toEqual(expect.arrayContaining([ 'Test One' ]));
            events.push('Bad');
            expect(reducer.getHandlers().events).not.toEqual(expect.arrayContaining([ 'Bad' ]))
        });

        it('correctly gets an array of fns from the keys thats immutable', () => {
            const { fns } = reducer.getHandlers();
            console.log(fns)
            expect(fns).toEqual(expect.arrayContaining([ expect.any(Function) ]));
            function badFunc() { return 4 }
            fns.push(badFunc);
            expect(reducer.getHandlers().fns.length).toEqual(3);
        });

        it('correctly get the size of the handler map', () => {
            expect(reducer.getHandlers().size).toEqual(3);
        });
    });

    describe('Dispatch Handler Method', () => {
        it('executes an array of functions on receipt of event', () => {
            const funcOne = jest.fn(() => 1);
            const funcTwo = jest.fn(() => 2);
            const funcThree = jest.fn(({ val }) => val + 1);
            const funcFour = jest.fn(() => 4);

            let testStructure = [
                [ 'Test One', [ funcOne, funcTwo, funcThree ] ],
                [ 'Test Two', [ funcFour ] ],
            ];

            reducer = eventReducerFactory(testStructure);
            expect(reducer.dispatchHandler('Test One', { val: 3 }));
            expect(funcOne).toHaveBeenCalled();
            expect(funcTwo).toHaveBeenCalled();
            expect(funcOne).toHaveReturnedWith(1);
            expect(funcThree).toHaveBeenCalledWith({ val: 3 });
            expect(funcThree).toHaveReturnedWith(4);
            expect(funcFour).not.toHaveBeenCalled();
        });

        it('throws on invalid or missing event or missing payload', () => {
            expect(() => reducer.dispatchHandler()).toThrow();
            expect(() => reducer.dispatchHandler({}, {})).toThrow();
            expect(() => reducer.dispatchHandler('Test')).toThrow();
        });
    });
});
