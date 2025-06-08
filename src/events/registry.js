import createUUID from '../factories/createUUID';

const _MODULE_NAME = '[Event Registry]';
const _ID_BASE = 36;
const _ID_LEN = 10;

let _REGISTRY = new Map();

const _validate = {
    string: (val) => typeof val === 'string' && val.trim() !== '',
    object: (val) => typeof val === 'object' && val !== null || val !== undefined,
    enum: (val, options) => options.includes(val),
};

const _isValidEvent = (name, schema, type, family) => {
    const failures = [];
    if (!_validate.string(name)) failures.push('name');
    if (!_validate.object(schema)) failures.push('schema');
    if (!_validate.enum(type, ['unique', 'generic'])) failures.push('type');
    if (!_validate.enum(family, ['core', 'ui', 'test'])) failures.push('family');
    return { isValid: failures.length === 0, log: failures };
};

const _toBaseID = (str) => [...str].reduce((prev, curr) => prev += curr.charCodeAt(0), 0).toString(_ID_BASE);

const _createEventKey = (name, type, family) => `${_toBaseID(name)}-${_toBaseID(type)}-${_toBaseID(family)}-${createUUID(_ID_LEN, _ID_BASE)}`;

const _isPresent = (id) => {
    const keys = Array.from(_REGISTRY.keys());

    for (const key of keys) {
        const [ name, type, family ] = key.split('-');

        if(id.includes(name) && id.includes(type) && id.includes(family)) {
            return { isPresent: true, presentKey: key };
        };
    };

    return { isPresent: false, presentKey: null };
};

const _createEvent = (name, schema, type, family) => {
    const { isValid, log } = _isValidEvent(name, schema, type, family);

    if (!isValid) {
        throw new Error(`$${_MODULE_NAME} invalid event, ${log}`);
    };

    const id = _createEventKey(name, type, family);
    const { isPresent, presentKey } = _isPresent(id);

    if (isPresent) {
        console.warn(`${_MODULE_NAME} duplicate entry. ${id}`);
        return presentKey;
    };

    _REGISTRY.set(id, { name, schema, type, family });
    return id;
};

const _deleteEvent = (id) => {
    if (!_validate.string(id)) {
        throw new Error(`${_MODULE_NAME} invalid id provided. ${id}`);
    };

    if(!_isPresent(id).isPresent) {
        throw new Error(`${_MODULE_NAME} event not found. ${id}`);
    };

    _REGISTRY.delete(id);
    return true;
};

const _getEvent = (id) => {
    if (!_validate.string(id)) {
        throw new Error(`${_MODULE_NAME} invalid id provided. ${id}`);
    };

    if (!_isPresent(id).isPresent) {
        throw new Error(`${_MODULE_NAME} id not found. ${id}`);
    };

    return Object.assign({}, _REGISTRY.get(id));
}

const clearRegistry = () => _REGISTRY = new Map();

export default {
    createEvent: (name, schema, type, family) => {
        try {
            return _createEvent(name, schema, type, family)
        } catch (err) {
            console.error(err.message);
            return false;
        }
    },
    deleteEvent: (id) => {
        try {
            return _deleteEvent(id);
        } catch (err) {
            console.error(err.message);
            return false;
        }
    },
    getEvent: (id) => {
        try {
            return _getEvent(id);
        } catch (err) {
            console.error(err.message);
            return false;
        }
    },
    clearRegistry,
};
