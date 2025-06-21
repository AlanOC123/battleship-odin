const FACTORY_NAME = '[Ship Node Factory]';

const createShipNode = (id, part) => {
    if (!part || typeof part !== 'object') {
        throw new Error(`${FACTORY_NAME} (${id}): Invalid part data`);
    }

    const { NAME: name, HEAD: isHead, TAIL: isTail, DESCRIPTION: description, INDEX: index } = part;

    if (
        typeof name !== 'string' ||
        typeof description !== 'string' ||
        typeof isHead !== 'boolean' ||
        typeof isTail !== 'boolean' ||
        typeof index !== 'number' || index < 0
    ) {
        throw new Error(`${FACTORY_NAME} (${id}): Invalid part shape`);
    }

    return { id, name, description, isHead, isTail, index };
}

export default createShipNode;
