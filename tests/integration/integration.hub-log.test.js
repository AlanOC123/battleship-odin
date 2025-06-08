import log from "../../src/events/log";
import hub from "../../src/events/hub";

import {
    genericMockEventData,
    uniqueMockEventData,
    validMockPayload,
    invalidMockPayload,
    partialMockPayload,
    createGenericMockEventID,
    createUniqueMockEventID,
} from '../__mocks__/events.mock';

describe('Event Hub, Event Log Integration', () => {
    const source = '[Hub Test]';
    const eventName = {
        testOne: genericMockEventData.name,
        testTwo: uniqueMockEventData.name
    }

    const eventStructure = {
        testOne: createGenericMockEventID(),
        testTwo: createUniqueMockEventID(),
    }

    const mockFnOne = jest.fn();
    const mockFnTwo = jest.fn();
    const mockFnThree = jest.fn();

    beforeEach(() => {
        log.clearLog();
        hub.clearHub();
        jest.clearAllMocks();
    });

    it('successfully emits a message on a clean event input', () => {
        hub.subscribeTo(eventName.testOne, source, mockFnOne);
        const message = hub.createMessage(eventStructure.testOne, source, validMockPayload);
        expect(hub.emitMessage(message)).toBeTruthy();
        expect(mockFnOne).toHaveBeenCalled();
    });

    it('prevents emissions of a double unique event', () => {
        hub.subscribeTo(eventName.testTwo, source, mockFnOne);
        const message = hub.createMessage(eventStructure.testTwo, source, validMockPayload);
        expect(hub.emitMessage(message)).toBeTruthy();
        expect(hub.emitMessage(message)).toBeFalsy();
        expect(mockFnOne).toHaveBeenCalledTimes(1);
    });

    it('prevents emission of invalid payload', () => {
        hub.subscribeTo(eventName.testOne, source, mockFnOne);
        const message = hub.createMessage(eventStructure.testOne, source, invalidMockPayload);
        expect(hub.emitMessage(message)).toBeFalsy();
        expect(mockFnOne).not.toHaveBeenCalled();
    });

    it('prevents emission of partial payload', () => {
        hub.subscribeTo(eventName.testOne, source, mockFnOne);
        const message = hub.createMessage(eventStructure.testOne, source, partialMockPayload);
        expect(hub.emitMessage(message)).toBeFalsy();
        expect(mockFnOne).not.toHaveBeenCalled();
    });

    it('emits all handlers', () => {
        hub.subscribeTo(eventName.testOne, source, mockFnOne, mockFnTwo, mockFnThree);
        const message = hub.createMessage(eventStructure.testOne, source, validMockPayload);
        expect(hub.emitMessage(message)).toBeTruthy();
        expect(mockFnOne).toHaveBeenCalled();
        expect(mockFnTwo).toHaveBeenCalled();
        expect(mockFnThree).toHaveBeenCalled();
    });

    it('prevent emissions when an event has no subscribers', () => {
        const message = hub.createMessage(eventStructure.testOne, source, validMockPayload);
        expect(hub.emitMessage(message)).toBeFalsy();
    });

    it('correctly logs entries to the event log during emission', () => {
        hub.subscribeTo(eventName.testOne, source, mockFnOne, mockFnTwo, mockFnThree);
        const message = hub.createMessage(eventStructure.testOne, source, validMockPayload);
        expect(hub.emitMessage(message)).toBeTruthy();
        expect(log.getEntries().length).toBeGreaterThan(0);
    })
});
