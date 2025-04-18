import { stateController } from "../../src/logic/stateController";

describe('State Controller', () => {
    let state = null;

    beforeEach(() => state = stateController());
    afterEach(() => state = null);

    it('Correctly denies access to private variable', () => {
        expect(state?._GAME_TYPE).toBeUndefined();
        expect(state?._CURRENT_PLAYER).toBeUndefined();
        expect(state?._TIME_STAMPS).toBeUndefined();
    });

    it('Correctly exposes dispatch in test mode', () => {
        expect(state?._dispatch).toBeDefined();
    });

    it('Correctly exposes a cloned state', () => {
        const initial = state.getState();
        expect(initial).toEqual(expect.objectContaining({
            _GAME_TYPE: null,
            _IS_SETUP_COMPLETE: false,
            _IS_SHIPS_PLACED: false,
            _IS_GAME_STARTED: false,
            _IS_GAME_ENDED: false,
        }));

        initial.type = 'Bad Data';
        const newState = state.getState();
        expect(newState.type).not.toBe(initial.type);
    });

    it('Correctly dispatches an event', () => {
        const event = { eventName: 'Set Up Complete', boardSize: 10, players: ['Player', 'AI'], timeStamp: new Date().toISOString() };

        state._dispatch(event);
        const newState = state.getState();

        expect(newState).toEqual(expect.objectContaining({ _IS_SETUP_COMPLETE: true, _BOARD_SIZE: 10, _ALL_PLAYERS: ['Player', 'AI'] }));
    });

    it('Correctly blocks invalid events', () => {
        const event = { eventName: 'Bad Event', boardSize: 10, players: ['Player', 'AI'], timeStamp: new Date().toISOString() };

        expect(() => state._dispatch(event)).toThrow();
    });

    it('Correctly adds and access timeline nodes', () => {
        const event = { eventName: 'Set Up Complete', boardSize: 10, players: ['Player', 'AI'], timeStamp: new Date().toISOString() };
        expect(state.getTimeline().length).toEqual(0);
        state._dispatch(event);
        expect(state.getTimeline().length).toBeGreaterThan(0);
    });

    it('Correctly recognises all ships being placed', () => {
        const shipsPlaced = { eventName: 'All Ships Placed', numberOfShipsPlaced: 10 };
        const setUpComplete = { eventName: 'Set Up Complete', boardSize: 10, players: ['Player', 'AI'], timeStamp: new Date().toISOString() };

        expect(() => state._dispatch(shipsPlaced)).toThrow();
        state._dispatch(setUpComplete);
        state._dispatch(shipsPlaced);
        const newState = state.getState();
        expect(newState).toEqual(expect.objectContaining({ _IS_SETUP_COMPLETE: true, _IS_SHIPS_PLACED: true }));
    });

    it('Correctly starts the game', () => {
        const shipsPlaced = { eventName: 'All Ships Placed', numberOfShipsPlaced: 10 };
        const setUpComplete = { eventName: 'Set Up Complete', boardSize: 10, players: ['Player', 'AI'], timeStamp: new Date().toISOString() };
        const gameStarted = { eventName: 'Game Started', gameType: 'P', timeStamp: new Date().toISOString() };

        state._dispatch(setUpComplete);
        state._dispatch(shipsPlaced);

        expect(state.getState()._GAME_TYPE).not.toBe('PvE');
        expect(() => state._dispatch(gameStarted)).toThrow();
        gameStarted.gameType = 'PvE';
        state._dispatch(gameStarted);
        expect(state.getState()._GAME_TYPE).toBe('PvE');
        expect(state.getState()._IS_GAME_STARTED).toBeTruthy();
    });

    it('Correctly updates the player on turn', () => {
        const shipsPlaced = { eventName: 'All Ships Placed', numberOfShipsPlaced: 10 };
        const setUpComplete = { eventName: 'Set Up Complete', boardSize: 10, players: ['Player', 'AI'], timeStamp: new Date().toISOString() };
        const gameStarted = { eventName: 'Game Started', gameType: 'PvE', timeStamp: new Date().toISOString() };
        const turnChanged = { eventName: 'Turn Changed', moveCount: 'a', timeStamp: new Date().toISOString() };

        state._dispatch(setUpComplete);
        state._dispatch(shipsPlaced);
        state._dispatch(gameStarted);
        expect(() => state._dispatch(turnChanged)).toThrow();
        turnChanged.moveCount = 3;
        state._dispatch(turnChanged);

        expect(state.getState()._NUMBER_OF_MOVES).toEqual(4);
        expect(state.getState()._CURRENT_PLAYER_INDEX).toEqual(0);

        turnChanged.moveCount = 6;
        state._dispatch(turnChanged);

        expect(state.getState()._NUMBER_OF_MOVES).toEqual(7);
        expect(state.getState()._CURRENT_PLAYER_INDEX).toEqual(1);
    })
});
