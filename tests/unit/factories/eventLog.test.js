import eventLogFactory from "../../../src/factories/eventLogFactory";

describe('Event Log', () => {
    let log = null;
    beforeEach(() => log = eventLogFactory([ 'Test' ]));
    afterEach(() => log = null);

    describe('Get All Method', () => {
        it('gets a copy of the timeline', () => {
            const t = log.getAll();
            expect(t.length).toEqual(0);
            t[0] = 1;
            expect(log.getAll().length).toEqual(0);
        })
    })

    describe('Append Method', () => {
        it('correctly creates and adds a new time stamp', () => {
            const event = { name: 'Test', type: 'Test', src: 'Test' };
            log.append(event, { data: 'Test' });
            expect(log.getAll().length).toEqual(1);
        });

        it('prevents duplicate unique events from being added', () => {
            const event = { name: 'Test', type: 'Test', src: 'Test' };
            log.append(event, { data: 'Test' });
            expect(() => log.append(event, { data: 'Test' })).toThrow()
        });

        it('throws on invalid or missing event data', () => {
            expect(() => log.append()).toThrow();
            expect(() => log.append('Test', {})).toThrow();
            expect(() => log.append({}, {})).toThrow();
            expect(() => log.append({ name: 'Test', type: 'Test', src: 'Test' })).toThrow();
        });
    });

    describe('Clear All Method', () => {
        it('clears all logs in the timeline', () => {
            const event = { name: 'Test', type: 'Test', src: 'Test' };
            log.append(event, { data: 'Test' });
            expect(log.getAll().length).toEqual(1);
            log.clearAll();
            expect(log.getAll().length).toEqual(0);
        });
    });
});
