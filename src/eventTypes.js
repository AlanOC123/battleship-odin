const deepFreeze = (obj) => {
    Object.keys(obj).forEach(key => {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            Object.freeze(obj[key])
        };
    });

    return Object.freeze(obj);
}

const eventType = (eventName) => {
    const structure = {
        eventName
    };

    return {
        getStructure: () => ({ ...structure }),
    };
};

const onStart = (gameType) => {
    const baseEvent = eventType('Game Started').getStructure();

    return deepFreeze({
        ...baseEvent,
        gameType,
        timeStamp: new Date().toISOString(),
    });
};

const onEnd = (gameWinner) => {
    const baseEvent = eventType('Game Ended').getStructure();

    return deepFreeze({
        ...baseEvent,
        gameWinner,
        timeStamp: new Date().toISOString(),
    });
};

const onShotFired = (currentPlayer, moveCount, coordinates) => {
    const baseEvent = eventType('Shot Fired').getStructure();

    return deepFreeze({
        ...baseEvent,
        currentPlayer,
        moveCount,
        coordinates,
        timeStamp: new Date().toISOString(),
    });
};

const onShipSunk = (attackingPlayer, defendingPlayer, moveCount, shipType) => {
    const baseEvent = eventType('Ship Sunk').getStructure();

    return deepFreeze({
        ...baseEvent,
        attackingPlayer,
        defendingPlayer,
        moveCount,
        shipType,
        timeStamp: new Date().toISOString(),
    })
};

const onShipPlaced = (currentPlayer, coordinates) => {
    const baseEvent = eventType('Ship Placed').getStructure();

    return deepFreeze({
        ...baseEvent,
        currentPlayer,
        coordinates,
        timeStamp: new Date().toISOString(),
    });
};

const onSetUpComplete = () => {
    const baseEvent = eventType('Set Up Complete').getStructure();

    return deepFreeze({
        ...baseEvent,
        timeStamp: new Date().toISOString(),
    });
};

const onTurnChange = (currentPlayer, moveCount) => {
    const baseEvent = eventType('Turn Changed').getStructure();

    return deepFreeze({
        ...baseEvent,
        currentPlayer,
        moveCount,
        timeStamp: new Date().toISOString(),
    });
};

const onInValidMove = (currentPlayer, reason) => {
    const baseEvent = eventType('Invalid Move').getStructure();

    return deepFreeze({
        ...baseEvent,
        currentPlayer,
        reason,
        timeStamp: new Date().toISOString(),
    });
};

const onHitRegistered = (attackingPlayer, defendingPlayer, coordinates) => {
    const baseEvent = eventType('Hit Registered').getStructure();

    return deepFreeze({
        ...baseEvent,
        attackingPlayer,
        defendingPlayer,
        coordinates,
        timeStamp: new Date().toISOString(),
    });
};

const onAllShipsPlaced = () => {
    const baseEvent = eventType('All Ships Placed').getStructure();

    return deepFreeze({
        ...baseEvent,
        timeStamp: new Date().toISOString(),
    });
};

const onRepeatCoordinate = (currentPlayer, coordinates) => {
    const baseEvent = eventType('Repeated Move').getStructure();

    return deepFreeze({
        ...baseEvent,
        currentPlayer,
        coordinates,
        timeStamp: new Date().toISOString(),
    });
};

const onGameRestart = (fromCheckpoint = false, playerName = 'Player') => {
    const baseEvent = eventType('Game Restarted').getStructure();

    return deepFreeze({
        ...baseEvent,
        fromCheckpoint,
        playerName,
        timeStamp: new Date().toISOString(),
    });
};

const onPlayerForfeit = (playerName) => {
    const baseEvent = eventType('Player Forfeited').getStructure();

    return deepFreeze({
        ...baseEvent,
        playerName,
        timeStamp: new Date().toISOString(),
    });
};

export { onStart, onEnd, onGameRestart, onPlayerForfeit };
export { onShipPlaced, onSetUpComplete, onAllShipsPlaced };
export { onShotFired, onHitRegistered, onShipSunk, onTurnChange };
export { onInValidMove, onRepeatCoordinate };
