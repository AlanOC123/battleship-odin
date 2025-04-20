const safeClone = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error("Invalid state object given");
    };

    return typeof structuredClone === 'function'
    ? structuredClone(object) : JSON.parse(JSON.stringify(object));
};

export default safeClone;
