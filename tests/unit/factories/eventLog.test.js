import eventLogFactory from "../../../src/core/factories/eventLogFactory";

describe('Event Log', () => {
    let log = null;
    beforeEach(() => log = eventLogFactory());
    afterEach(() => log = null);

    describe('Get All Method', () => {
        it('gets all the stamps', () => {
            expect(log.getAll()).toEqual([]);
        });

        it('prevents mutation of timeline', () => {
            const timeline = log.getAll();
            timeline.push('Test');
            expect(log.getAll().length).toEqual(0);
        });

        it('prevents access to private timeline', () => {
            expect(log?.timeline).toBeUndefined();
        });
    })

    describe('Add Time Stamp Method', () => {
        it('correctly creates and adds a new time stamp', () => {
            expect(log.getAll().length).toEqual(0);
            log.append('Test', { a: true });
            expect(log.getAll().length).toEqual(1);
        });

        it('prevents duplicate cores from being added', () => {
            log.append('Launch Page Loaded', { a: true });
            expect(log.getAll().length).toEqual(1);
            expect(() => log.append('Launch Page Loaded', { a: true })).toThrow();
            expect(log.getAll().length).toEqual(1);
        })
    });

    describe('Get Latest Method', () => {
        it('get the latest timestamp from the timeline', () => {
            log.append('Test', { a: true });
            expect(log.getLatest()).toEqual(expect.objectContaining({ event: 'Test', state: { a: true } }));
        });

        it('keeps the timeline intact when getting the latest', () => {
            log.append('Test', { a: true });
            expect(log.getAll().length).toEqual(1);
            let latest = log.getLatest();
            expect(log.getAll().length).toEqual(1);
            latest.event = 'wrong';
            expect(log.getLatest()).toEqual(expect.objectContaining({ event: 'Test' }));
        });
    });

    describe('Clear All Method', () => {
        it('clears all stamps from timeline', () => {
            log.append('Test', { a: true });
            expect(log.getAll().length).toEqual(1);
            log.clearAll();
            expect(log.getAll().length).toEqual(0);
            expect(log.getLatest()).toBeNull();
        });
    });
});
