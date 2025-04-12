const eventsSchema = (() => {
    const eventNames = new Set();

    const addEventName = (newEvent) => {
        if (!eventNames.has(newEvent)) eventNames.add(newEvent);
    };

    const removeEventName = (eventName) => {
        if (!eventNames.has(eventName)) {
            console.warn('Event not found');
            return;
        };

        eventNames.delete(eventName);
    };

    const describeSchema = () => console.table(eventNames.values());

    const clearAll = () => eventNames.clear();

    const hasEvent = (eventName) => eventNames.has(eventName);

    return {
        addEventName,
        removeEventName,
        describeSchema,
        clearAll,
        hasEvent,
    }
})();

export default eventsSchema;
