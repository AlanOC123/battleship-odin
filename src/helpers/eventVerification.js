import coreEvents from "../data/coreEvents";
import gameEvents from "../data/gameEvents";

const allEvents = [ ...coreEvents, ...gameEvents ];

const checkTuple = (eventArray, eventName) => {
    for (const [ name ] of eventArray) {
        if (eventName === name) return true;
    };

    return false;
};

const isCoreEvent = (eventName) => checkTuple(coreEvents, eventName);

const isGameEvent = (eventName) => checkTuple(gameEvents, eventName);

const isKnownEvent = (eventName) => checkTuple(allEvents, eventName);

export {
    isCoreEvent,
    isGameEvent,
    isKnownEvent
};
