const eventsSchema = () => {
    const eventNames = new Map();

    const addEventName = (newEvent, eventDescription, eventPayload) => {
        if (!eventNames.has(newEvent)) {
            eventNames.set(newEvent, {
                description: eventDescription,
                payload: eventPayload,
            })
        }
    };

    const removeEventName = (eventName) => {
        if (!eventNames.has(eventName)) {
            console.warn('Event not found');
            return;
        };

        eventNames.delete(eventName);
    };

    const describeSchema = () => {
        const table = [...eventNames.entries()].map(([ name, meta ]) => ({
            event: name,
            ...meta
        }));

        console.table(table);
    }

    const clearAll = () => eventNames.clear();

    const hasEvent = (eventName) => eventNames.has(eventName);

    const getEventInfo = (eventName) => {
        if (!eventNames.has(eventName)) {
            console.warn('Event not found');
            return null;
        };

        const event = eventNames.get(eventName);
        return Object.assign({ name: eventName }, event);
    }

    return {
        addEventName,
        removeEventName,
        describeSchema,
        clearAll,
        hasEvent,
        getEventInfo
    }
};

export default eventsSchema;
