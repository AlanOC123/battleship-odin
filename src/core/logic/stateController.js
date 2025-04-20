import { getCurrentPlayer, getNewPlayerIndex, isValidSetUp, isShipsPlaced, canGameStart, isGameInProgress, safeClone } from "../../src/helpers/stateHelpers";
import eventReducer from "../factories/eventReducerFactory";
import eventDispatch from "../helpers/eventDispatch";
import timeStampFactory from "../factories/timeStampFactory";

const stateController = () => {
    const _CURRENT_STATE = {
        _GAME_TYPE: null,
        _ALL_PLAYERS: [],
        _PLAYER_COUNT: 0,
        _CURRENT_PLAYER_INDEX: 0,
        _CURRENT_PLAYER: null,
        _NUMBER_OF_MOVES: 0,
        _NUMBER_OF_SHIPS: 0,
        _IS_SETUP_COMPLETE: false,
        _IS_SHIPS_PLACED: false,
        _IS_GAME_STARTED: false,
        _IS_GAME_ENDED: false,
        _GAME_WINNER: null,
    };

    const _TIME_STAMPS = [];

    const reducer = eventReducer();

    return {
        getState: () => safeClone(),
        getTimeline: () => [ ..._TIME_STAMPS ],
    }
};

const gameState = stateController()

export { stateController };

export default gameState;
