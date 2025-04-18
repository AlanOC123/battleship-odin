const getCurrentPlayer = (allPlayers, newIndex) => {
    if (!Array.isArray(allPlayers) || allPlayers.length < 2) {
        throw new Error("Invalid players list given", allPlayers);
    };

    if (newIndex > allPlayers.length - 1 || isNaN(newIndex)) {
        throw new Error("Invalid player position given", newIndex);
    };
    return allPlayers[newIndex];
};

const getNewPlayerIndex = (playerCount, moveCount) => {
    if (!playerCount || !moveCount) {
        throw new Error("Invalid player or moves given", playerCount, moveCount);
    };

    if (isNaN(playerCount) || isNaN(moveCount)) {
        throw new Error("Invalid player or moves given", playerCount, moveCount);
    };

    return moveCount % playerCount;
};

const isValidSetUp = (gameType, playersArray, playerCount) => {
    if (typeof gameType !== 'string' || !Array.isArray(playersArray) || isNaN(playerCount)) {
        throw new Error("Invalid parameters to verify set up state", gameType, playersArray, playerCount);
    };

    const validGameTypes = ['PvE'];
    const isValidType = gameType && validGameTypes.includes(gameType);
    const isValidPlayerCount = Array.isArray(playersArray) && playerCount > 1;

    return isValidType && isValidPlayerCount;
};

const isShipsPlaced = (numberOfShips) => numberOfShips === 10;

const canGameStart = (isSetUp, isShipsPlaced) => {
    if (
        typeof isSetUp === 'undefined'
        || typeof isShipsPlaced === 'undefined'
    ) {
            throw new Error("Parameters missing to check start", isSetUp, isShipsPlaced);
    };
    return isSetUp && isShipsPlaced;
}

const isGameInProgress = (isSetUp, isShipsPlaced, isGameStarted, isGameEnded) => {
    if (
        typeof isSetUp === 'undefined'
        || typeof isShipsPlaced === 'undefined'
        || typeof isGameStarted === 'undefined'
        || typeof isGameEnded === 'undefined'
    ) {
            throw new Error("Parameters missing to check progress", isSetUp, isShipsPlaced, isGameStarted, isGameEnded);
    };
    return isSetUp && isShipsPlaced && isGameStarted && !isGameEnded;
};

const safeClone = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error("Invalid state object given");
    };

    return typeof structuredClone === 'function'
    ? structuredClone(object) : JSON.parse(JSON.stringify(object));
}

export {
    getCurrentPlayer,
    getNewPlayerIndex,
    isValidSetUp,
    isShipsPlaced,
    canGameStart,
    isGameInProgress,
    safeClone
}
