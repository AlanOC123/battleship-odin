import createUUID from '../../factories/createUUID';
import hub from '../../events/hub';
import EVENT_NAMES from '../../events/names';
import createEvent from '../../factories/createEvent';

const _MODULE_NAME = '[State Manager]'

const _STATE = {
    metaData: {
        version: '1.0',
        id: createUUID(10, 36),
        deviceInfo: {
            agent: navigator.userAgent,
            language: navigator.language,
            hardwardConcurrency: navigator.hardwareConcurrency || 'unknown',
            memory: navigator.deviceMemory || 'unknown',
        },
        start: new Date(),
        end: null,
    },
    launchState: {
        launchPhase: 'not-started',
        isLaunched: false,
        isPlayerCreated: false,
        isSetUp: false,
        isStarted: false,
        gameType: null,
        numPlayers: 0,
    }
};

const _safeCopy = (data) => JSON.parse(JSON.stringify(data));

const _ROUTING = {
    GET: {
        [ EVENT_NAMES.CORE.REQUEST_DEBUG_STATE.KEY ]: {
            response:  EVENT_NAMES.CORE.DEBUG_STATE_SENT,
            payload: _STATE.metaData,
        },
    },
    SET: {
        [ EVENT_NAMES.CORE.START_APP.KEY ]: {
            handler: _setLaunchState,
            response: EVENT_NAMES.CORE.APP_STARTED,
            payload: { ok: true },
        }
    },
    GETALL: {
        [ EVENT_NAMES.CORE.REQUEST_STATE_COPY.KEY ]: {
            response: EVENT_NAMES.CORE.STATE_COPY_SENT,
            payload: _STATE,
        }
    }
}

const _handleRequest = (payload) => {
    if (!payload) throw new Error(`${_MODULE_NAME} payload not given. ${payload}`);

    const key = payload.key;
    const action = payload.action.toUpperCase();
    const data = payload.data;

    if (!['GET', 'SET', 'GETALL'].includes(action)) {
        throw new Error(`${_MODULE_NAME} unsupported action: ${action}`);
    }

    if (!key || !action) {
        throw new Error(`${_MODULE_NAME} cannot complete operation. Missing key or action. ${key}, ${action}`);
    }

    const operationData = _ROUTING[action];

    if (!operationData){
        throw new Error(`${_MODULE_NAME} cannot complete operation. Invalid action. ${action}`);
    };

    const responseData = operationData[key];

    if (!responseData){
        throw new Error(`${_MODULE_NAME} cannot complete operation. Invalid key. ${key}`);
    };

    if (action === 'SET') {
        const handlerFn = responseData.handler;

        if (!handlerFn) {
            throw new Error(`${_MODULE_NAME} cannot complete operation. Invalid key. ${key}`);
        };

        responseData.payload.ok = handlerFn(data);
    };

    const eventData = createEvent(responseData.response, _MODULE_NAME);
    const payloadData = _safeCopy(responseData.payload);

    hub.emit(eventData, payloadData);
};

function _isValidSetRequest(newState) {
    if (!newState) {
        console.warn(`${_MODULE_NAME} cannot complete operation. Invalid state. ${newState}`);
        return false;
    };

    return true;
}

function _setLaunchState(newState) {
    if (!_isValidSetRequest(newState)) return false;

    for (const key of Object.keys(newState)) {
        if (key in _STATE.launchState) {
            _STATE.launchState[key] = newState[key];
        };
    };

    return true;
};

const registerRoutes = () => {
    for (const [ _, data ] of Object.entries(_ROUTING)) {
        for (const key of Object.keys(data)) {
            hub.on(key, _handleRequest)
        }
    }
}

export default {
    registerRoutes,
}
