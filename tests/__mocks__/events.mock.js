import EVENT_NAMES from "../../src/events/names";
import createEvent from "../../src/factories/createEvent";

export const mockPayload = {
    foo: 'hello',
    bar: 42
};

export const mockEvent = {
    map: EVENT_NAMES.TEST.MOCK_EVENT,
    payload: mockPayload,
    source: 'MockTest',
}

export const uniqueEvent = {
    map: {
        ...EVENT_NAMES.TEST.MOCK_EVENT,
        TYPE: 'unique',
    },
    payload: mockPayload,
    source: 'MockTest',
}

export const buildMockEvent = () => createEvent(mockEvent.map, mockEvent.source);

export const buildUniqueMockEvent = () => createEvent(uniqueEvent.map, uniqueEvent.source);
