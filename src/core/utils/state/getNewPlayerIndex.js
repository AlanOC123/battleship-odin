const getNewPlayerIndex = (playerCount, moveCount) => {
    if (!playerCount || !moveCount) {
        throw new Error("Invalid player or moves given", playerCount, moveCount);
    };

    if (isNaN(playerCount) || isNaN(moveCount)) {
        throw new Error("Invalid player or moves given", playerCount, moveCount);
    };

    return moveCount % playerCount;
};

export default getNewPlayerIndex;
