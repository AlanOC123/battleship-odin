const eventEmitterFactory = () => {
    const storedEvents = new Map();

    const on = (eventList, e, ...fns) => {
        if (!e || ! fns) throw new Error("Invalid event or function given", );
        if (!eventList.includes(e)) throw new Error("Invalid event name, reference event schema");

        const event = storedEvents.get(e) || [];
        event.push(...fns);
        storedEvents.set(e, event);
    };

    const off = (e, fn) => {
        if (!storedEvents.has(e)) {
            console.warn(`Event: ${e} not found`);
            return 0;
        };

        if (!fn) {
            storedEvents.delete(e);
            return 1;
        };

        const handlers = storedEvents.get(e);
        const eventIndex = handlers.findIndex(func => func === fn);
        if (eventIndex === -1) {
            console.warn('Function not found');
            return 2;
        };

        handlers.splice(eventIndex, 1);
        return 3;
    };

    const emit = (e, payload) => {
        if (!storedEvents.has(e)) throw new Error(`Event: ${e} not found`);
        const event = storedEvents.get(e);
        event.forEach(fn => fn(payload));
    };

    const once = (schema, e, fn) => {
        const wrapper = (payload) => {
            fn(payload);
            off(e, wrapper);
        };

        on(schema, e, wrapper);
    };

    const debug = () => ({
        events: new Map(storedEvents),
        length: storedEvents.size,
    })

    return {
        on,
        off,
        emit,
        once,
        debug,
    };

};

const gameEventManager = eventEmitterFactory();

export { eventEmitterFactory };

export default gameEventManager;
