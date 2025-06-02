const _MODULE_NAME = '[UUID Factory]';
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

export default createUUID;
