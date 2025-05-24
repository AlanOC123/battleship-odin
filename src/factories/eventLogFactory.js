import safeClone from '../core/utils/general/safeClone.js';
import isDuplicateUniqueEvent from '../utils/isDuplicateUniqueEvent.js';

const eventLogFactory = (uniqueEvents) => {
    if (!uniqueEvents || !Array.isArray(uniqueEvents) || !uniqueEvents.length) {
        throw new Error("Invalid unique events given. Provide them to prevent race conditions");
    };

    const timeline = [];

    const newTimeStamp = (name, type, src, payload, isDuplicateCoreEvent = false) => {
        if (isDuplicateCoreEvent) {
            throw new Error("Duplicate Core Event detected", name);
        };

        if (!name || typeof name !== 'string') {
            throw new Error("Invalid event name given", name);
        };

        if (!src || typeof src !== 'string') {
            throw new Error("Invalid source given", src);

        }

        if (!payload || typeof payload !== 'object') {
            throw new Error("Invalid event data given", payload);
        };

        return {
            index: timeline.length,
            name,
            type,
            src,
            payload,
            time: new Date().toISOString(),
        };
    };

    const getAll = () => [ ...timeline ];
    const getLatest = () => timeline.length ? timeline[timeline.length - 1] : null;

    const append = (event, payload) => {
        const { name, type, src } = event;
        const lastEvent = getLatest();
        const lastEventName = lastEvent?.name ?? null;
        const isDupe = isDuplicateUniqueEvent(uniqueEvents, name, lastEventName);
        const stamp = newTimeStamp(name, type, src, payload, isDupe);
        timeline.push(stamp);
    };

    const clearAll = () => { timeline.length = 0; };

    return {
        append,
        getAll,
        getLatest,
        clearAll
    };
};

export default eventLogFactory;
