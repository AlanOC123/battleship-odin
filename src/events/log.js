import createUUID from "../factories/createUUID";

let _LOG = new Map();
const _MODULE_NAME = '[Event Log]'

const _FAMILY_PREFIX_MAP = {
    core: 'cr',
    ui: 'ui',
    test: 'te'
};

const _TYPE_PREFIX_MAP = {
    unique: 'un',
    generic: 'gn'
};

const _createKey = (type, family) => {
    if (!type || typeof type !== 'string') {
        throw new Error(`${_MODULE_NAME} cannot create key from event. Invalid type. ${type}`);
    };

    if (!family || typeof family !== 'string') {
        throw new Error(`${_MODULE_NAME} cannot create key from event. Invalid family. ${family}`);
    };

    const id = createUUID(8, 16);
    const familyPrefix = _FAMILY_PREFIX_MAP[family];
    const typePrefix = _TYPE_PREFIX_MAP[type];

    if (!familyPrefix || !typePrefix) {
        throw new Error(`${_MODULE_NAME} cannot create key from event. Invalid prefix. ${familyPrefix}, ${typePrefix}`);
    };

    return `${familyPrefix}-${typePrefix}-${id}`;
};

const isDuplicateUnique = (event) => {
    if (!event) {
        throw new Error(`${_MODULE_NAME} missing event. ${event}`);
    };

    const { key, type } = event;

    if (!type || !key) {
        throw new Error(`${_MODULE_NAME} missing event type or key. ${type}, ${key}`);
    };

    const values = Array.from(_LOG.values());

    return type === 'unique' && values.some(node => node.key === key && node.type === type);
};

const createNode = (event) => {
    const { key, type, source, family } = event;

    if (!key || !type || !source || !family) {
        throw new Error(`${_MODULE_NAME} cannot create node from event. Missing data. ${key}, ${type}, ${source}, ${family}`);
    };

    const id = _createKey(type, family);

    const node = {
        key,
        type,
        family,
        source,
        time: new Date().toISOString()
    };

    _LOG.set(id, node);
    return node;
};

const getNodes = () => Array.from(_LOG.entries());

const filterNodes = (key, value) => {
    if (!key || !value) {
        throw new Error(`${_MODULE_NAME} missing filters. ${key}, ${value}`);
    };

    const all = Array.from(_LOG.values());
    const filtered = all.filter(node => node[key] === value);

    return filtered;
}

const clearNodes = () => _LOG = new Map();

export default {
    createNode,
    getNodes,
    filterNodes,
    clearNodes,
    isDuplicateUnique,
}
