const eventHubFactory = (validatorFn) => {
    const listeners = new Map();

    const on = (e, ...fns) => {
        if (!e || ! fns) throw new Error("Invalid event or function given", );
        if (!listeners.has(e)) listeners.set(e, []);
        listeners.get(e).push(...fns);
    };

    const once = (e, fn) => {
        const wrapper = (payload) => { fn(payload); off(e, wrapper); };
        on(e, wrapper);
    };

    const off = (e, fn) => {
        if (!listeners.has(e)) return;
        if (!fn) { listeners.delete(e); return; };

        const handlers = listeners.get(e);
        listeners.set(e, handlers.filter(handler => handler !== fn));
    };

    const emit = (e, payload) => {
        validatorFn(e, payload);
        (listeners.get(e) || []).forEach(fn => fn(payload));
    }

    const debug = () => ({ events: new Map(storedEvents), length: storedEvents.size });

    return {
        on,
        off,
        emit,
        once,
        debug,
    }
};

export default eventHubFactory;
