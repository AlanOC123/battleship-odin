import {
    validMockPayload,
    invalidMockPayload,
    partialMockPayload,
    createGenericMockEventID,
    createUniqueMockEventID,
} from "../__mocks__/events.mock";

import hub from "../../src/events/hub";

describe('Event Hub', () => {
    const SRC = '[Hub Test]';

    const eventNames = {
        test_one: 'mock-generic-event',
        test_two: 'mock-unique-event'
    };

    const eventKeys = {
        test_one: createGenericMockEventID(),
        test_two: createUniqueMockEventID(),
    };

    const mockFnOne = jest.fn();
    const mockFnTwo = jest.fn();
    const mockFnThree = jest.fn();

    beforeEach(() => hub.clearHub());

    it('subscribes one or more handlers from a source to an event', () => {
        expect(hub.subscribeTo(eventNames.test_one, SRC, mockFnOne)).toBeTruthy();
        expect(hub.subscribeTo(eventNames.test_one, 123, mockFnOne)).toBeFalsy();
        expect(hub.subscribeTo(eventNames.test_one, SRC)).toBeFalsy();
        expect(hub.subscribeTo(eventNames.test_one, SRC, mockFnTwo, mockFnThree)).toBeTruthy();
    });

    it('unsubscribes one or more handlers from a source from an event', () => {
        expect(hub.unsubscribeFrom()).toBeFalsy();
        expect(hub.unsubscribeFrom(eventNames.test_one)).toBeFalsy();
        expect(hub.unsubscribeFrom(eventNames.test_one, SRC)).toBeFalsy();

        hub.subscribeTo(eventNames.test_one, SRC, mockFnOne, mockFnTwo, mockFnThree);
        expect(hub.unsubscribeFrom(eventNames.test_one, SRC)).toBeTruthy();
        expect(hub.unsubscribeFrom(eventNames.test_one, SRC)).toBeFalsy();
    });

    it('removes all sources from an event', () => {
        hub.subscribeTo(eventNames.test_one, SRC, mockFnOne, mockFnTwo, mockFnThree);
        expect(hub.removeEvent(eventNames.test_one)).toBeTruthy();
        expect(hub.unsubscribeFrom(eventNames.test_one, SRC)).toBeFalsy();
    });

    it('returns a properly structures message object, rejects bad schema', () => {
        expect(hub.createMessage(eventKeys.test_one, SRC, validMockPayload)).toBeTruthy();
        expect(hub.createMessage(eventKeys.test_one, SRC, invalidMockPayload)).toBeFalsy();
        expect(hub.createMessage(eventKeys.test_one, SRC, partialMockPayload)).toBeFalsy();
    });

    it('returns an array of sources subscribed to an event', () => {
        const srcOne = `${SRC} One`;
        const srcTwo = `${SRC} Two`;
        const srcThree = `${SRC} Three`;

        expect(hub.getSubscribers()).toBeFalsy();
        expect(hub.getSubscribers(eventNames.test_one)).toBeFalsy();

        hub.subscribeTo(eventNames.test_one, srcOne, mockFnOne);
        hub.subscribeTo(eventNames.test_one, srcTwo, mockFnTwo);
        hub.subscribeTo(eventNames.test_one, srcThree, mockFnThree);

        const subscribers = hub.getSubscribers(eventNames.test_one);
        expect(subscribers).toEqual(expect.any(Array));
    });
});
