const eventReducerFactory = (eventStructure) => {
    if (!eventStructure) throw new Error("No events given for module");

    const handlers = new Map(eventStructure);

    const removeHandler = (handlerName) => {
        if (!handlers.has(handlerName)) {
            throw new Error('Invalid handler name given');
        };

        handlers.delete(handlerName);
    };

    const getHandlers = () => new Map(handlers);

    const dispatchHandler = (event, payload) => {
        if (!event || typeof event !== 'string' || ! payload) throw new Error("Invalid event or payload. Received ", event, payload);

        if (!handlers.has(event)) return;
        const fns = handlers.get(event);
        for (const fn of [].concat(fns)) {
            if (typeof fn === 'function') fn(payload)
        };
    };

    return {
        removeHandler,
        getHandlers,
        dispatchHandler
    };
};

export default eventReducerFactory;
