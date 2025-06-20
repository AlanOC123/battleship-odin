import GLOBAL_NAMES from '../../src/data/shared/names'
import registry from "../../src/events/registry";
import hub from "../../src/events/hub";

const MODULE_NAME = GLOBAL_NAMES.MODULE_NAMES.TEST_SUITE;

export const genericMockEventData = {
    name: 'mock-generic-event',
    schema: {
        foo: 'string',
        bar: 'number'
    },
    type: 'generic',
    family: 'test'
};

export const uniqueMockEventData = {
    name: 'mock-unique-event',
    schema: {
        foo: 'string',
        bar: 'number'
    },
    type: 'unique',
    family: 'test'
}

export const validMockPayload = {
    foo: 'hello',
    bar: 42
};

export const invalidMockPayload = {
    foo: 42,
    bar: 'hello'
};

export const partialMockPayload = {
    foo: 42,
};

export const createGenericMockEventID = () => registry.createEvent(
    genericMockEventData.name,
    genericMockEventData.schema,
    genericMockEventData.type,
    genericMockEventData.family
);

export const createUniqueMockEventID = () => registry.createEvent(
    uniqueMockEventData.name,
    uniqueMockEventData.schema,
    uniqueMockEventData.type,
    uniqueMockEventData.family
);

export const createGenericMockMessage = () => hub.createMessage(createGenericMockEventID(), MODULE_NAME, validMockPayload);
export const createUniqueMockMessage = () => hub.createMessage(createUniqueMockEventID(), MODULE_NAME, validMockPayload);
