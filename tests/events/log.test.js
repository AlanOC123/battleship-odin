import log from "../../src/events/log";
import {
    genericMockEventData,
    uniqueMockEventData,
    createGenericMockEventID,
    createUniqueMockEventID,
} from '../__mocks__/events.mock';

describe('Event Log', () => {
    const eventName = {
        testOne: genericMockEventData.name,
        testTwo: uniqueMockEventData.name
    }

    const eventStructure = {
        testOne: createGenericMockEventID(),
        testTwo: createUniqueMockEventID(),
    }

    const genericEntry = {
        name: eventName.testOne,
        type: genericMockEventData.type,
        id: eventStructure.testOne
    }

    const uniqueEntry = {
        name: eventName.testTwo,
        type: uniqueMockEventData.type,
        id: eventStructure.testTwo
    }

    beforeEach(() => log.clearLog());

    it('creates a new event entry successfully', () => {
        expect(log.createEntry(genericEntry)).toBeTruthy();
        expect(log.createEntry(uniqueEntry)).toBeTruthy();
        expect(log.createEntry()).toBeFalsy();
        expect(log.createEntry({ name: null })).toBeFalsy();
        expect(log.createEntry({ name: 123, type: 456, id: 789 })).toBeFalsy();
    });

    it('rejects duplicate unique entries', () => {
        expect(log.createEntry(uniqueEntry)).toBeTruthy();
        expect(log.createEntry(uniqueEntry)).toBeFalsy();
    });

    it('allows generic duplicates', () => {
        expect(log.createEntry({ ...genericEntry, id: '1234' })).toBeTruthy();
        expect(log.createEntry({ ...genericEntry, id: '5678' })).toBeTruthy();
    });

    it('filters entries by key/value', () => {
        log.createEntry({ ...genericEntry, id: '1234' });
        log.createEntry({ ...genericEntry, id: '5678' });
        log.createEntry(uniqueEntry);

        const filterOne = log.filterEntries('type', 'generic');
        const filterTwo = log.filterEntries('type', 'unique');

        expect(filterOne).toEqual(expect.any(Array));
        expect(filterOne.length).toBeGreaterThan(filterTwo.length);

        expect(log.filterEntries()).toBeFalsy();
    });
});
