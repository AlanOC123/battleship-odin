const stateController = () => {
    const _currentState = {
        _GAME_TYPE: null,
        _IS_SETUP_COMPLETE: false,
        _IS_SHIPS_PLACED: false,
        _IS_GAME_STARTED: false,
        _IS_GAME_ENDED: false,
        _ALL_PLAYERS: [],
        _PLAYER_COUNT: 0,
        _CURRENT_PLAYER_INDEX: 0,
        _CURRENT_PLAYER: null,
        _NUMBER_OF_MOVES: 0,
        _NUMBER_OF_SHIPS: 10,
        _BOARD_SIZE: 10,
        _GAME_WINNER: null,
    };

    const _SINGLETON_EVENTS = [
        'Game Started',
        'Game Ended',
        'Set Up Complete',
        'All Ships Placed',
        'Game Restarted',
        'Player Forfeited'
    ];

    const _TIME_STAMPS = [];

    const _captureState = () => {
        return { ..._currentState };
    };

    const _setCurrentPlayer = (newIndex) => _currentState._ALL_PLAYERS[newIndex];

    const _getNewIndex = (playerCount, moveCount) => moveCount % playerCount;

    const _canPlaceShips = () => _currentState._IS_SETUP_COMPLETE;

    const _hasEnoughShips = (numberOfShips) => numberOfShips === _currentState._NUMBER_OF_SHIPS;

    const _isValidPlayersArray = (playersArray) => Array.isArray(playersArray);

    const _hasEnoughPlayers = (playerCount) => playerCount > 1;

    const _hasStarted = () => {
        return _currentState._IS_SETUP_COMPLETE
        && _currentState._IS_SHIPS_PLACED
        && _currentState._IS_GAME_STARTED;
    };

    const _reducers = {
        'Set Up Complete': (event) => {
            const { players, boardSize, timeStamp, eventName } = event;

            if (!_isValidPlayersArray(players)) throw new Error("Invalid player type given");
            const playerCount = players.length;

            if (!_hasEnoughPlayers(playerCount)) throw new Error("Not enough players given");

            if (!boardSize) throw new Error("Invalid board size given");

            _currentState._ALL_PLAYERS = players;
            _currentState._CURRENT_PLAYER = _currentState._ALL_PLAYERS[_currentState._CURRENT_PLAYER_INDEX];
            _currentState._PLAYER_COUNT = players.length;
            _currentState._BOARD_SIZE = boardSize;
            _currentState._IS_SETUP_COMPLETE = true;

            _TIME_STAMPS.push({ event: eventName, time: timeStamp, state: _captureState() });
        },
        'All Ships Placed': (event) => {
            const { numberOfShipsPlaced, timeStamp, eventName } = event;
            if (!_canPlaceShips()) throw new Error("Set Up Not Complete Yet");
            if (!_hasEnoughShips(numberOfShipsPlaced)) throw new Error("Not enough ships to start game");

            _currentState._IS_SHIPS_PLACED = true;
            _TIME_STAMPS.push({ event: eventName, time: timeStamp, state: _captureState() });
        },
        'Game Started': (event) => {
            const { gameType, timeStamp, eventName } = event;
            const availableTypes = [ 'PvE' ];
            if (!availableTypes.includes(gameType)) throw new Error(`Invalid game type provided: ${gameType}`);

            if (!_currentState._IS_SHIPS_PLACED || !_currentState._IS_SETUP_COMPLETE) throw new Error(`Game Not Set Up Correctly: ${_captureState()}`);

            _currentState._GAME_TYPE = gameType;
            _currentState._IS_GAME_STARTED = true;
            _TIME_STAMPS.push({ event: eventName, time: timeStamp, state: _captureState() });
        },
        'Turn Changed': (event) => {
            if (!_hasStarted()) {
                throw new Error("Invalid game state");
            };

            const currentPlayerCount = _currentState._PLAYER_COUNT;

            if (!_hasEnoughPlayers(currentPlayerCount)) {
                throw new Error("Not enough players");
            };

            const { moveCount, timeStamp, eventName } = event;

            if (isNaN(moveCount)) {
                throw new Error("Invalid move count");
            };

            const updatedMoveCount = moveCount + 1;
            const playerCount = _currentState._PLAYER_COUNT;
            const newIndex = _getNewIndex(playerCount, updatedMoveCount);

            _currentState._CURRENT_PLAYER_INDEX = newIndex;
            _currentState._NUMBER_OF_MOVES = updatedMoveCount;
            _currentState._CURRENT_PLAYER = _setCurrentPlayer(newIndex);

            _TIME_STAMPS.push({ event: eventName, time: timeStamp, state: _captureState() });
        },
    };

    const _dispatch = (event) => {
        const handler = _reducers[event.eventName];
        const currentTimeline = [_TIME_STAMPS];
        const lastEvent = currentTimeline.pop();

        if (lastEvent && _SINGLETON_EVENTS.includes(lastEvent.event)) {
            throw new Error("Duplicate event received which shouldnt be replicated");
        }

        if (!handler) {
            throw new Error(`Invalid event received: ${event.eventName}`);
        };

        handler(event);
    };

    const safeClone = (obj) => typeof structuredClone === 'function'
    ? structuredClone(obj)
    : JSON.parse(JSON.stringify(obj))

    return {
        getState: () => safeClone(_captureState()),
        getTimeline: () => [ ..._TIME_STAMPS ],
        ...(process.env.NODE_ENV === 'test' && { _dispatch })
    }
};

const gameState = stateController()

export { stateController };

export default gameState;
