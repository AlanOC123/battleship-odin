const getCurrentPlayer = (allPlayers, newIndex) => {
    if (!Array.isArray(allPlayers) || allPlayers.length < 2) {
        throw new Error("Invalid players list given", allPlayers);
    };

    if (newIndex > allPlayers.length - 1 || isNaN(newIndex)) {
        throw new Error("Invalid player position given", newIndex);
    };
    return allPlayers[newIndex];
};

export default getCurrentPlayer;
