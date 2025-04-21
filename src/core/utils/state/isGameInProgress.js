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

export default isGameInProgress;
