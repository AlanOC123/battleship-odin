import eventHub from '../../events/hub';
import eventRegistry from '../../events/registry';
import createUUID from '../../factories/createUUID';

const _MODULE_NAME = '[State]'

const _EVENT_NAMES = {
    stateUpdated: 'state-updated',
    stateReset: 'state-reset',
    startApp: 'start-app',
}

const _EVENT_KEYS = {
    stateUpdated: eventRegistry.createEvent(
        _EVENT_NAMES.stateUpdated,
        { stateUpdated: 'boolean' },
        'generic',
        'core'
    ),
    stateReset: eventRegistry.createEvent(
        _EVENT_NAMES.stateReset,
        { state: 'object' },
        'unique',
        'core'
    ),
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

    const message = eventHub.createMessage(_EVENT_KEYS.stateUpdated, _MODULE_NAME, { stateUpdated: true });
    eventHub.emitMessage(message);
    return true;
}

const _initState = ({ isLaunched }) => {
    if (!isLaunched) {
        console.error(`${_MODULE_NAME} failed to set up state`);
        return false;
    };

    _STATE = _defaultState();
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

    const newState = _safeClone(_STATE);

    const message = eventHub.createMessage(_EVENT_NAMES.stateReset, _MODULE_NAME, { state: newState })
    eventHub.emitMessage(message);
    return true;
};

eventHub.subscribeTo(_EVENT_NAMES.startApp, _MODULE_NAME, _initState);

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
