const schemas = {
    'Page Changed': {
        page: 'string',
        loaded: 'string',
   },
   'Launch Page Loaded': {},
   'Launch Button Clicked': {},
   'Set Up Page Loaded': {},
};

const uiEventValidator = (event, payload) => {
    if (!event || typeof event !== 'string') throw new Error("Invalid event given", event);
    if (!payload) throw new Error("Invalid data given", payload);

    const shape = schemas[event];

    if (!shape) throw new Error("Invalid event shape given", event);

    for (const [key, type] of Object.entries(shape)) {
        if (typeof payload[key] !== type) throw new Error(`Bad ${event} payload`);
    };

    return true;
};

export default uiEventValidator;
