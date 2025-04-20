import coreEvents from "../../data/coreEvents.js";

const coreEventNames = coreEvents.map(([name, fn]) => name);

const isCoreEvent = (name) => coreEventNames.includes(name);

const isDuplicateCoreEvent = (current, last) => {
    if (!current || typeof current !== 'string' || (last ? typeof last !== 'string' : false)) {
        throw new Error("Invalid data type(s)", current, last);
    };

    return last ? isCoreEvent(current) && current === last : false;
};

export default isDuplicateCoreEvent;
