const isValidSetUp = (gameType, playersArray, playerCount) => {
    if (typeof gameType !== 'string' || !Array.isArray(playersArray) || isNaN(playerCount)) {
        throw new Error("Invalid parameters to verify set up state", gameType, playersArray, playerCount);
    };

    const validGameTypes = ['PvE'];
    const isValidType = gameType && validGameTypes.includes(gameType);
    const isValidPlayerCount = Array.isArray(playersArray) && playerCount > 1;

    return isValidType && isValidPlayerCount;
};

export default isValidSetUp;
