import log from './log';
import registry from "./registry";
import GLOBAL_NAMES from '../data/shared/names';

const _MODULE_NAME = GLOBAL_NAMES.MODULE_NAMES.EVENT_HUB;

let _hub = new Map();

const _isPresent = (key, map) => map.has(key);

const _validateSchema = (schema, payload) => {
    for (const key in schema) {
        const given = typeof payload[key];
        const expected = schema[key];

        if (given !== expected) return { isValid: false, typeData: { key, expected, given } }
    };

    return { isValid: true, typeData: null };
};

const _subscribeTo = (evName, source, ...fns) => {
    if (!source || typeof source !== 'string') {
        throw new Error(`${_MODULE_NAME} invalid source given: ${source}`);
    }

    if(!fns || fns.length === 0) {
        throw new Error(`${_MODULE_NAME} no handler functions provided. ${fns}`);
    };

    const subscribers = _hub.get(evName) || new Map();
    const handlers = subscribers.has(source) ? subscribers.get(source) : new Set();

    for (const fn of fns) {
        handlers.add(fn)
    };

    subscribers.set(source, handlers);

    _hub.set(evName, subscribers);
    return true;
};

const _unsubscribeFrom = (evName, source) => {
    if (!_isPresent(evName, _hub)) {
        throw new Error(`${_MODULE_NAME} no event: ${evName}`);
    };

    const subscribers = _hub.get(evName);

    if (!_isPresent(source, subscribers)) {
        throw new Error(`${_MODULE_NAME} source is not subscribed: ${source}`);
    };

    subscribers.delete(source);
    return true;
};

const _removeEvent = (evName) => {
    if (!_isPresent(evName, _hub)) {
        throw new Error(`${_MODULE_NAME} no event: ${evName}`);
    };

    _hub.delete(evName);
    return true;
}

const _emitMessage = (message) => {
    const { event, payload } = message;
    const { name, source } = event;

    const isValidEntry = log.createEntry(event)

    if(!isValidEntry) {
        throw new Error(`${_MODULE_NAME} error emitting message. Error: ${err.message}`);
    }

    const subscribers = _hub.get(name);

    if (!subscribers || subscribers.size === 0) {
        throw new Error(`${_MODULE_NAME} no subscribers for event: ${name}`);
    };

    try {
        for (const [ sourceKey, handlers ] of subscribers.entries()) {
            for (const fn of handlers) {
                try {
                    fn(payload);
                } catch (err) {
                    console.error(`${_MODULE_NAME} handler error in ${sourceKey}: ${err.message}`);
                }
            }
        }
    } catch (err) {
        throw new Error(`${_MODULE_NAME} error handling event in ${source}. Error ${err.message}`);
    };

    return true;
};

const _createMessage = (id, source, payload) => {
    const eventStructure = registry.getEvent(id);
    const { name, type, family, schema } = eventStructure;

    const { isValid, typeData } = _validateSchema(schema, payload);

    if (!isValid) {
        const { key, expected, given } = typeData;
        throw new Error(`${_MODULE_NAME} invalid schema. Key: ${key}. Expected: ${expected}. Given: ${given}`);
    }

    const event = Object.assign({}, { id, name, type, family, source });
    return { event, payload };
};

const _getSubscribers = (evName) => {
    if (!_isPresent(evName, _hub)) {
        throw new Error(`${_MODULE_NAME} no event: ${evName}`);
    };

    const subscribers = _hub.get(evName);

    if (!subscribers) {
        throw new Error(`${_MODULE_NAME} no subscribers: ${subscribers}`);
    }

    return Array.from(subscribers.keys());
}

const clearHub = () => _hub = new Map();

export default {
    subscribeTo: (evName, source, ...fns) => {
        try {
            return _subscribeTo(evName, source, ...fns)
        } catch (err) {
            console.error(err.message);
            return false;
        };
    },
    unsubscribeFrom: (evName, source) => {
        try {
            return _unsubscribeFrom(evName, source)
        } catch (err) {
            console.error(err.message);
            return false;
        };
    },
    emitMessage: (message) => {
        try {
            return _emitMessage(message);
        } catch (err) {
            console.error(err.message);
            return false;
        };
    },
    createMessage: (id, source, payload) => {
        try {
            return _createMessage(id, source, payload);
        } catch (err) {
            console.error(err.message);
            return false;
        };
    },
    removeEvent: (evName) => {
        try {
            return _removeEvent(evName)
        } catch (err) {
            console.error(err.message);
            return false;
        };
    },
    getSubscribers: (evName) => {
        try {
            return _getSubscribers(evName)
        } catch (err) {
            console.error(err.message);
            return false;
        };
    },
    clearHub,
};
