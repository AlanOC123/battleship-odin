import { getCurrentPlayer, getNewPlayerIndex, isValidSetUp, isShipsPlaced, canGameStart, isGameInProgress, safeClone } from "../../src/helpers/stateHelpers";

import eventReducer from "../factories/eventReducer";
import eventDispatch from "../helpers/eventDispatch";

const stateController = () => {
    const _currentState = {
        _GAME_TYPE: null,
        _ALL_PLAYERS: [],
        _PLAYER_COUNT: 0,
        _CURRENT_PLAYER_INDEX: 0,
        _CURRENT_PLAYER: null,
        _NUMBER_OF_MOVES: 0,
        _NUMBER_OF_SHIPS: 0,
        _GAME_WINNER: null,
        _IS_SETUP_COMPLETE: false,
        _IS_SHIPS_PLACED: false,
        _IS_GAME_STARTED: false,
        _IS_GAME_ENDED: false,
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

    const reducer = eventReducer();

    const safeClone = (obj) => typeof structuredClone === 'function'
    ? structuredClone(obj)
    : JSON.parse(JSON.stringify(obj))

    return {
        getState: () => safeClone(_captureState()),
        getTimeline: () => [ ..._TIME_STAMPS ],
    }
};

const gameState = stateController()

export { stateController };

export default gameState;
