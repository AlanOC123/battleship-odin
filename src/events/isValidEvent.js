import EVENT_NAMES from "./names";

const _SCHEMA_CACHE = new Map();
const _MODULE_NAME = '[Event Validator]';

const getFamilyKey = (name) => name.toUpperCase();
const getEventKey = (key) => key.split('-').map(str => str.toUpperCase()).join('_');

const _getEventSchema = (family, key) => {
    if (!key || !family) {
        throw new Error(`${_MODULE_NAME} invalid event type ${key}, ${family}`);
    };

    if (_SCHEMA_CACHE.has(key)) return _SCHEMA_CACHE.get(key);

    const familyKey = getFamilyKey(family);
    const eventKey = getEventKey(key);

    const schema = EVENT_NAMES[familyKey][eventKey].SCHEMA;

    if(!schema) {
        console.warn(`${_MODULE_NAME} schema not found. ${schema}, ${eventKey}, ${familyKey}`);
        _SCHEMA_CACHE.set(key, false);
        return false;
    };

    _SCHEMA_CACHE.set(key, schema);
    return schema;
};

const isValidEvent = (event, payload) => {
    const { key, family } = event;

    const schema = _getEventSchema(family, key);
    if (!schema) return false;

    for (const key in schema) {
        const expectedType = schema[key];
        if (typeof payload[key] !== expectedType) {
            console.warn(`${_MODULE_NAME} invalid payload type`, typeof payload[key], expectedType);
            return false;
        }
    };

    return true;
};

export default isValidEvent;
