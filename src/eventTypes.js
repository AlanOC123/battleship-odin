const eventType = (eventName) => {
    const structure = {
        eventName
    };

    return {
        getStructure: () => ({ ...structure }),
    };
};

const onStart = (type) => {
    const baseEvent = eventType('Game Started').getStructure();

    return  Object.freeze({
        ...baseEvent,
        gameType: type,
        timeStamp: new Date().toISOString(),
    });
};

const onEnd = (winner) => {
    const baseEvent = eventType('Game Ended').getStructure();

    return Object.freeze({
        ...baseEvent,
        winner,
        timeStamp: new Date().toISOString(),
    })
}

export { onStart, onEnd }
