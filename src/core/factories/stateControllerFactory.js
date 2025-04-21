import safeClone from "../utils/general/safeClone";

const stateController = (gameEvents, reducerFactory) => {
    const state = {

    };

    const eventMapper = reducerFactory(gameEvents);

    return {
        getState: () => safeClone(state),
    }
};

export default stateController;
