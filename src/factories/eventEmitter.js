import eventSchema from "../eventSchema";

const eventEmitter = () => {
    const storedEvents = new Map();

    const on = (eventList, e, fn) => {
        if (!e || ! fn) throw new Error("Invalid event or function given", );
        if (!eventList.includes(e)) throw new Error("Invalid event name, reference event schema");

        const event = storedEvents.get(e) || [];
        event.push(fn);
        storedEvents.set(e, event);
    };

    const off = (e, fn) => {
        if (!storedEvents.has(e)) {
            console.warn(`Event: ${e} not found`);
            return;
        };

        if (!fn) {
            storedEvents.delete(e);
            return;
        };

        const handlers = storedEvents.get(e);
        const eventIndex = handlers.findIndex(func => func === fn);
        if (eventIndex === -1) {
            console.warn('Function not found');
            return;
        };

        handlers.splice(eventIndex, 1);
    };

    const emit = (e, payload) => {
        if (!storedEvents.has(e)) throw new Error(`Event: ${e} not found`);
        const event = storedEvents.get(e);
        event.forEach(fn => fn(payload));
    };

    const once = (e, fn) => {
        const wrapper = (payload) => {
            fn(payload);
            off(e, wrapper);
        };

        on(e, wrapper);
    };

    const debug = () => {
        events: new Map(storedEvents);
    }

    return {
        on,
        off,
        emit,
        once,
        debug,
    };

};

export default eventEmitter;
