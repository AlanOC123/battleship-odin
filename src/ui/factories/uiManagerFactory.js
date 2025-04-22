import addNameValidityClass from "../events/handlers/uiManager/addNameValidityClass";
import addNameValidityMsg from "../events/handlers/uiManager/addNameValidityMsg";
import addDifficultySelectedClass from "../events/handlers/uiManager/addDifficultySelectedClass";
import addGameTypeSelectedClass from "../events/handlers/uiManager/addGameTypeSelectedClass";

const uiManagerFactory = (eventHub, reducerFactory) => {
    if (!eventHub || !reducerFactory) throw new Error("Invalid set up", eventHub, reducerFactory, eventStructure);

    const eventStructure = [
        [ 'Name Input Validated', [ addNameValidityClass, addNameValidityMsg ] ],
        [ 'Difficulty Button Clicked', [ addDifficultySelectedClass ] ],
        [ 'Game Type Button Clicked', [ addGameTypeSelectedClass ] ],
    ]

    const reducer = reducerFactory(eventStructure);

    const addEventsToHub = (eventName) => {
        if (!eventName || typeof eventName !== 'string') throw new Error("Invalid event name", eventName);
        eventHub.on(eventName, (payload) => reducer.dispatchHandler(eventName, payload));
    };

    eventStructure.forEach(([e, _]) => addEventsToHub(e));
};

export default uiManagerFactory;
