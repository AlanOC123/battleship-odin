const isCoreEvent = (events, name) => events.includes(name);

const isDuplicateUniqueEvent = (events, current, last) => {
    if (!current || typeof current !== 'string' || (last ? typeof last !== 'string' : false)) {
        throw new Error("Invalid data type(s)", current, last);
    };

    return last ? isCoreEvent(events, current) && current === last : false;
};

export default isDuplicateUniqueEvent;
