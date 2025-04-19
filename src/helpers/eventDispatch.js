const eventDispatch = (handlerMap, eventObject) => {
    const tempMap = new Map(handlerMap);
    const tempEvent = Object.assign({}, eventObject);

    const { eventName } = eventObject;

    if (!eventName) {
        throw new Error('Invalid event object given');
    }

    if (!tempMap.has(eventName)) {
        throw new Error('Invalid handler name given');
    };

    const handler = tempMap.get(eventName);
    return handler(tempEvent);
};

export default eventDispatch;
