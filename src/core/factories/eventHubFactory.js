const eventHubFactory = (validatorFn) => {
    const listeners = new Map();

    const on = (e, ...fns) => {
        fns = fns.flat();
        if (!e || fns.length === 0) throw new Error("Invalid event or function given", );
        if (!listeners.has(e)) listeners.set(e, []);
        listeners.get(e).push(...fns);
    };

    const once = (e, fn, all = false) => {
        const wrapper = (payload) => { fn(payload); (all ? off(e) : off(e, wrapper)); };
        on(e, wrapper);
    };

    const off = (e, fn) => {
        if (!e || typeof e !== "string") throw new Error("Invalid event given");
        if (!listeners.has(e)) return;
        if (!fn) { listeners.delete(e); return; };

        const handlers = listeners.get(e);
        listeners.set(e, handlers.filter(handler => handler !== fn));
    };

    const emit = (e, payload) => {
        console.log(e, payload)
        if (!e || typeof e !== "string" || typeof payload !== 'object') throw new Error("Invalid event or payload", e, payload);

        validatorFn(e, payload);
        (listeners.get(e) || []).forEach(fn => fn(payload));
    }

    const debug = () => ({ listeners: new Map(listeners), length: listeners.size });

    return {
        on,
        off,
        emit,
        once,
        debug,
    }
};

export default eventHubFactory;
