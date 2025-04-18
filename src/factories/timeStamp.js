import { safeClone } from "../helpers/stateHelpers"

const timeStamp = (eventName, gameState) => {
    if (!eventName || typeof eventName !== 'string') {
        throw new Error("Invalid event name given", eventName);
    };

    if (!gameState || typeof gameState !== 'object') {
        throw new Error("Invalid game state given", gameState);
    };

    const time = new Date().toISOString();
    const domState = document.body.innerHTML ?? null;

    return { event: eventName, state: safeClone(gameState), time, domState };
};

export default timeStamp;
