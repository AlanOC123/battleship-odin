const eventReducer = () => {
    const handlers = new Map();

    const addHandler = (handlerName, fn) => {
        if (!handlerName || typeof handlerName !== 'string') {
            throw new Error('Invalid handler name given');
        };

        if (!fn || typeof fn !== 'function') {
            throw new Error('Invalid handler name given');
        };

        if (handlers.has(handlerName)) {
            throw new Error('Event already in map');
        }

        handlers.set(handlerName, fn);
    };

    const removeHandler = (handlerName) => {
        if (!handlers.has(handlerName)) {
            throw new Error('Invalid handler name given');
        };

        handlers.delete(handlerName);
    };

    const getHandlers = () => new Map(handlers);

    return {
        addHandler,
        removeHandler,
        getHandlers,
    };
};
