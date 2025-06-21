import GLOBAL_NAMES from '../../data/shared/names';
import EVENT_HUB from '../../events/hub';
import EVENT_NAMES from '../../data/events/names';

import createUUID from "../../factories/createUUID";
import createPlayer from "../factories/createPlayer";
import state from "./state";

const MODULE_NAME = GLOBAL_NAMES.MODULE_NAMES.PLAYER_REGISTRY;
const STATE_KEY = 'playerData';

const _MIN_NAME_LEN = 2;
const _MAX_NAME_LEN = 20;
const _ID_LEN = 5;
const _ID_BASE = 36;

const _LISTENERS = {
    init: EVENT_NAMES.START_APP,
    updatePlayerTurn: EVENT_NAMES.UPDATE_PLAYER_TURN,
    clear: EVENT_NAMES.CLEAR_PLAYER_REGISTRY,
    reset: EVENT_NAMES.STATE_RESET,
};

const _REGISTRY = new Map();

let _state = null;

const _getNewState = () => Object.assign({}, _state);

const _setMainState = () => {
    const newState = _getNewState();
    state.setState(STATE_KEY, newState);
};

const _defaultState = () => ({
    players: [],
    numPlayers: 0,
    activePlayerID: null,
});

const _initState = ({ isLaunched }) => {
    if (!isLaunched) {
        console.error(`${MODULE_NAME} failed to set up state`);
        return false;
    };

    _state = _defaultState();
    _setMainState();

    return true;
}

const _isValidName = (str) => {
    return str
    && typeof str === 'string'
    && str.length >= _MIN_NAME_LEN
    && str.length <= _MAX_NAME_LEN;
}

const _setPlayerTurn = ({ moveCount }) => {
    if (!moveCount || typeof moveCount !== 'number') {
        throw new Error(`${MODULE_NAME} invalid number of moves. Moves: ${id}`);
    }

    const players = _state.players;
    const playerCount = _state.numPlayers;
    const nextPlayerTurn = moveCount % playerCount;

    if (nextPlayerTurn < 0) {
        throw new Error(`${MODULE_NAME} invalid number of moves. Moves: ${id}`);
    }

    _state.activePlayerID = players[nextPlayerTurn];

    _setMainState();

    return true;
}

const _addPlayer = (name, isAI = false) => {
    if (!_isValidName(name)) {
        throw new Error(`${MODULE_NAME} invalid name. Must be between ${_MIN_NAME_LEN} and ${_MAX_NAME_LEN} long. Name: ${name}`);
    };

    const id = createUUID(_ID_LEN, _ID_BASE);
    const player = createPlayer(name, id, isAI);
    const isFirst = _REGISTRY.size === 0 ? true : false;

    _REGISTRY.set(id, player);

    if (_state) {
        _state.players = Array.from(_REGISTRY.keys());
        _state.numPlayers++;
        _state.activePlayerID = isFirst ? id : _state.activePlayerID;
        _setMainState();
    }

    return true;
};

const _deletePlayer = (id) => {
    if (!id || typeof id !== 'string') {
        throw new Error(`${MODULE_NAME} invalid id. ID: ${id}`);
    };

    if(!_REGISTRY.has(id)) {
        throw new Error(`${MODULE_NAME} player not found. ID: ${id}`);
    };

    _REGISTRY.delete(id);

    if (_state) {
        _state.players = Array.from(_REGISTRY.keys());
        _state.numPlayers--;
        _setMainState();
    }

    return true;
}

const _getPlayer = (id) => {
    if (!id || typeof id !== 'string') {
        throw new Error(`${MODULE_NAME} invalid id. ID: ${id}`);
    };

    if(!_REGISTRY.has(id)) {
        throw new Error(`${MODULE_NAME} player not found. ID: ${id}`);
    };

    return _REGISTRY.get(id);
}


const _clearRegistry = () => {
    _REGISTRY.clear();
    return true;
}

const _resetState = (...keepProps) => {
    const defaultState = _defaultState();
    _clearRegistry();

    console.log(1);
    console.log(_REGISTRY);

    for (const key in _state) {
        if (!keepProps.includes(key)) {
            _state[key][prop] = defaultState[key] ?? null;
        };
    };

    _setMainState();

    return true;
}

EVENT_HUB.subscribeTo(_LISTENERS.init, MODULE_NAME, _initState);
EVENT_HUB.subscribeTo(_LISTENERS.updatePlayerTurn, MODULE_NAME, _setPlayerTurn);
EVENT_HUB.subscribeTo(_LISTENERS.reset, MODULE_NAME, _resetState);

export default {
    addPlayer: (name, isAI = false) => {
        try {
            return _addPlayer(name, isAI);
        } catch (err) {
            console.error(err.message);
            return false;
        }
    },
    deletePlayer: (id) => {
        try {
            return _deletePlayer(id);
        } catch (err) {
            console.error(err.message);
            return false;
        }
    },
    getPlayer: (id) => {
        try {
            return _getPlayer(id);
        } catch (err) {
            console.error(err.message);
            return false;
        }
    },
    getAllPlayers: () => {
        return Array.from(_REGISTRY.entries()).map(([ id, player ]) => ({ id, name: player?.getName() }));
    },
    getActivePlayer: () => {
        return _REGISTRY.get(_state.activePlayerID) ?? null;
    },
    clearRegistry: () => {
        return _clearRegistry();
    }
}
