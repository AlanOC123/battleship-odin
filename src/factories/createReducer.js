const _MODULE_NAME = '[Event Reducer]'

const createReducer = () => {
    const _EVENTS = new Map();

    const set = (eventKey, ...fns) => {
        if (!eventKey || typeof eventKey !== 'string') {
            console.warn(`${_MODULE_NAME} no event key given. ${eventKey}`);
            return;
        };

        const handlers = _EVENTS.get(eventKey) || [];
        handlers.push(...fns);
        _EVENTS.set(eventKey, handlers);
    };

    const dispatch = (eventKey, payload) => {
        if (!eventKey || typeof eventKey !== 'string') {
            console.warn(`${_MODULE_NAME} no event key given. ${eventKey}`);
            return;
        };

        const handlers = _EVENTS.get(eventKey);

        if (!handlers || handlers.length === 0) {
            console.warn(`${_MODULE_NAME} no functions to execute. ${eventKey}`);
            return;
        }
        handlers.forEach(fn => fn(payload));
    };

    return {
        set,
        dispatch,
    };
};

export default createReducer;
