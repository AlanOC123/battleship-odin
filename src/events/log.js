import GLOBAL_NAMES from '../data/shared/names';

const _MODULE_NAME = GLOBAL_NAMES.MODULE_NAMES.EVENT_LOG;

let _log = new Map();

const _logValues = () => Array.from(_log.values());

const _isDuplicateEntry = (name, type) => {
    if (!name || !type) {
        throw new Error(`${_MODULE_NAME} missing event type or key. name: ${name}, type: ${type}`);
    };

    const conflict = _logValues().find(entry => entry.name === name && entry.type === type);
    const isDupe = type === 'unique' && !!conflict;
    return { isDupe, conflict };
};

const _createEntry = (event) => {
    if (!event || typeof event !== 'object') {
        throw new Error(`${_MODULE_NAME} missing event. event: ${event}`);
    };

    const { name, type, id } = event;

    if (!name || !type || !id) {
        throw new Error(`${_MODULE_NAME} missing event data. name: ${name}, type: ${type}, id: ${id}`);
    };

    if (typeof name !== 'string' || typeof type !== 'string' || typeof id !== 'string') {
        throw new Error(`${_MODULE_NAME} invalid data type. name: ${typeof name}, type: ${typeof type}, id: ${typeof id}`);
    }

    const { isDupe, conflict } = _isDuplicateEntry(name, type);

    if (isDupe) {
        throw new Error(`${_MODULE_NAME} duplicate entry detected. name: ${name}, type: ${type}, conflict: ${JSON.stringify(conflict)}`);
    };

    _log.set(id, { ...event, time: new Date().toISOString() });
    return true;
};

const _filterEntries = (key, value) => {
    if (!key || value === undefined) {
        throw new Error(`${_MODULE_NAME} missing filters or invalid. key: ${key}, value: ${value}`);
    };

    return _logValues().filter(node => node[key] === value);
};

const getEntries = () => _logValues();

const clearLog = () => _log = new Map();

export default {
    createEntry: (event) => {
        try {
            return _createEntry(event)
        } catch (err) {
            console.error(err.message);
            return false;
        }
    },
    filterEntries: (key, value) => {
        try {
            return _filterEntries(key, value)
        } catch (err) {
            console.error(err.message);
            return false;
        }
    },
    getEntries,
    clearLog,
}
