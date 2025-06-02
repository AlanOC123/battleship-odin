import isValidEvent from "./isValidEvent";
import log from './log';

let _EVENTS = new Map();
const _MODULE_NAME = '[Event Hub]';

const on = (eventKey, ...fns) => {
    const handlers = _EVENTS.get(eventKey) || [];
    handlers.push(...fns);
    _EVENTS.set(eventKey, handlers);
};

const off = (eventKey) => {
    if (!_EVENTS.has(eventKey)) return;
    _EVENTS.delete(eventKey);
};

const removeAll = () => _EVENTS = new Map();

const emit = (event, payload) => {
    if (!event) return;

    if (!isValidEvent(event, payload)) {
        throw new Error(`${_MODULE_NAME} invalid event provided. ${event.key}, ${payload}`);
    };

    log.createNode(event);
    console.log(log.getNodes());
    const handlers = _EVENTS.get(event.key);

    if (!handlers || handlers.length === 0) {
        console.warn(`${_MODULE_NAME} no functions to execute. ${event.key}, ${payload}`);
        return;
    };

    handlers.forEach(fn => fn(payload));
};

export default {
    on,
    off,
    emit,
    removeAll,
}
