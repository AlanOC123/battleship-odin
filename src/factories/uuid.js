import GLOBAL_NAMES from '../data/shared/names';

const _MODULE_NAME = GLOBAL_NAMES.FACTORY_NAMES.UUID;

const _MAX_LENGTH = 20;
const _MIN_LENGTH = 5;
const _MIN_BASE = 2;
const _MAX_BASE = 36;

const _isValidBase = (base) => base >= _MIN_BASE && base <= _MAX_BASE;
const _isValidLength = (length) => length >= _MIN_LENGTH && length <= _MAX_LENGTH;

const createUUID = (length = _MIN_LENGTH, base = _MIN_BASE) => {
    if (!_isValidBase(base) || !_isValidLength(length)) {
        throw new Error(`${_MODULE_NAME} invalid base or length provided. ${base}, ${length}`);
    };

    return Array.from({ length }, () => Math.floor(Math.random() * base).toString(base)).join('');
};

const minUUIDLength = _MIN_LENGTH;
const maxUUIDLength = _MAX_LENGTH;

const minUUIDBase = _MIN_BASE;
const maxUUIDBase = _MAX_BASE;

export default {
    createUUID,
    minUUIDLength,
    maxUUIDLength,
    minUUIDBase,
    maxUUIDBase,
}
