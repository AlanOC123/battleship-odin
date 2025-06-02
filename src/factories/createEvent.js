const _MODULE_NAME = '[Event Factory]';
import log from "../events/log";

const createEvent = (map, source) => {
    if (!map || !Object.keys(map).length || !source) {
        throw new Error(`${_MODULE_NAME} missing creation data. ${map}, ${source}`,);
    };

    const { KEY, TYPE, FAMILY } = map;

    if (!KEY || typeof KEY !== 'string') throw new Error(`${_MODULE_NAME} cannot create event from key. ${KEY}`);
    if (!TYPE || typeof TYPE !== 'string') throw new Error(`${_MODULE_NAME} invalid event type. ${TYPE}`);
    if (!FAMILY || typeof FAMILY !== 'string') throw new Error(`${_MODULE_NAME} invalid event family. ${FAMILY}`);

    const event = { key: KEY, type: TYPE, source, family: FAMILY };

    if (log.isDuplicateUnique(event)) {
        console.log(event);
        throw new Error(`${_MODULE_NAME} duplicate unique event detected, ${log.filterNodes('type', 'unique')}`);
    };

    return event;
};

export default createEvent;
