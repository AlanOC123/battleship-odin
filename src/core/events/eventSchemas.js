const schemas = {
    'Launch Screen Loaded': {},
    'Launch Button Clicked': {},
};

export const validateEvent = (event, payload) => {
    if (!event || typeof event !== 'string') throw new Error("Invalid event given", event);
    if (!payload) throw new Error("Invalid data given", payload);

    const shape = schemas[event];

    if (!shape) throw new Error("Invalid event shape given", event);

    for (const [key, type] of Object.entries(shape)) {
        if (typeof payload[key] !== type) throw new Error(`Bad ${event} payload`);
    };

    return true;
};
