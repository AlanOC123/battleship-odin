import safeClone from '../utils/general/safeClone.js';
import isDuplicateCoreEvent from '../utils/eventLog/isDuplicateCoreEvent.js';

const eventLogFactory = () => {
    const timeline = [];

    const newTimeStamp = (event, state, domState = null, isDuplicateCoreEvent = false) => {
        if (isDuplicateCoreEvent) {
            throw new Error("Duplicate Core Event detected", event);
        };

        if (!event || typeof event !== 'string') {
            throw new Error("Invalid event name given", event);
        };

        if (!state || typeof state !== 'object') {
            throw new Error("Invalid game state given", state);
        };

        return {
            event,
            state,
            time: new Date().toISOString(),
            domState
        };
    };

    const getAll = () => [ ...timeline ];
    const getLatest = () => (timeline.length ? timeline[timeline.length - 1] : null);

    const append = (currentEventName, gameState, domSnapshot = null) => {
        const lastEvent = getLatest();
        const lastEventName = lastEvent?.event ?? null;
        const isDupe = isDuplicateCoreEvent(currentEventName, lastEventName);
        const stamp = newTimeStamp(currentEventName, safeClone(gameState), domSnapshot, isDupe);
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
