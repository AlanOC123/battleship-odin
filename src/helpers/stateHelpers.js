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
    const validGameTypes = ['PvE'];
    const isValidType = gameType && validGameTypes.includes(gameType);
    const isValidPlayerCount = Array.isArray(playersArray) && playerCount > 1;

    return isValidType && isValidPlayerCount;
};

const isShipsPlaced = (numberOfShips) => numberOfShips > 10;

const canGameStart = (isSetUp, isShipsPlaced) => isSetUp && isShipsPlaced

const isGameInProgress = (isSetUp, isShipsPlaced, isGameStarted, isGameEnded) => {
    return isSetUp && isShipsPlaced && isGameStarted && !isGameEnded;
};

const safeClone = (object) => typeof structuredClone === 'function'
? structuredClone(object) : JSON.parse(JSON.stringify(object));

export {
    getCurrentPlayer,
    getNewPlayerIndex,
    isValidSetUp,
    isShipsPlaced,
    canGameStart,
    isGameInProgress,
    safeClone
}
