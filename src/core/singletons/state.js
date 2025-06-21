import GLOBAL_NAMES from '../../data/shared/names';
import EVENT_HUB from '../../events/hub';
import EVENT_NAMES from '../../data/events/names';
import EVENT_KEYS from '../../data/events/keys';
import createUUID from '../../factories/createUUID';

const _MODULE_NAME = GLOBAL_NAMES.MODULE_NAMES.STATE;

const _LISTENERS = {
    init: EVENT_NAMES.START_APP,
}

const _PUBLISHERS = {
    update: EVENT_KEYS.STATE_UPDATED,
    reset: EVENT_KEYS.STATE_RESET,
}

const _defaultState = () => ({
    metaData: {
        id: createUUID(10, 36),
        device: navigator.userAgent,
        memory: navigator.deviceMemory || 'unknown',
        threads: navigator.hardwareConcurrency || 'unknown',
        start: new Date().toISOString(),
        end: null,
    },
    appFlow: {
        isStarted: true,
        isLaunched: false,
        isSetUp: false,
        isAllPlayersShipsPlaced: false,
        isGameStarted: false,
        isGameEnded: false,
    }
});

let _STATE = null;

const _safeClone = (data) => {
    return typeof structuredClone === 'function' ? structuredClone(data) : JSON.parse(JSON.stringify(data));
}

const _initState = ({ isLaunched }) => {
    if (!isLaunched) {
        console.error(`${_MODULE_NAME} failed to set up state`);
        return false;
    };

    _STATE = _defaultState();
    return true;
}

const _getState = (key) => {
    if (key === undefined) {
        return _safeClone(_STATE);
    };

    if (typeof key !== 'string') {
        throw new Error(`${_MODULE_NAME} invalid key provided. Key: ${key}`);
    };

    const data = _STATE[key];

    if (!data) {
        throw new Error(`${_MODULE_NAME} invalid key provided. Data not found. Key: ${key} Data: ${data}`);
    };

    return _safeClone(data);
};

const _setState = (key, newState) => {
    if (typeof key !== 'string') {
        throw new Error(`${_MODULE_NAME} invalid key provided. Key: ${key}`);
    };

    if (typeof newState !== 'object' || newState === null) {
        throw new Error(`${_MODULE_NAME} invalid state provided. State: ${newState}`);
    }

    const existing = _STATE[key];

    if (!existing) {
        _STATE[key] = { ...newState };
    } else {
        for (const prop in newState) {
            if (Object.prototype.hasOwnProperty.call(newState, prop)) {
                existing[prop] = newState[prop];
            }
         };
    };

    const message = EVENT_HUB.createMessage(_PUBLISHERS.update, _MODULE_NAME, { stateUpdated: true });
    EVENT_HUB.emitMessage(message);
    return true;
}

const resetState = (...keepProps) => {
    const defaultState = _defaultState();

    for (const key in _STATE) {
        for (const prop in _STATE[key]) {
            if (!keepProps.includes(prop)) {
                _STATE[key][prop] = defaultState[key]?.[prop] ?? null;
            };
        };
    };

    const message = EVENT_HUB.createMessage(_PUBLISHERS.reset, _MODULE_NAME, { props: keepProps })
    EVENT_HUB.emitMessage(message);
    return true;
};

EVENT_HUB.subscribeTo(_LISTENERS.init, _MODULE_NAME, _initState);

export default {
    getState: (key) => {
        try {
            return _getState(key);
        } catch (err) {
            console.error(err.message);
            return false;
        }
    },
    setState: (key, newState) => {
        try {
            return _setState(key, newState);
        } catch (err) {
            console.error(err.message);
            return false;
        }
    },
    resetState,
};
