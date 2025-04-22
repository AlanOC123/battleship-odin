const hashElement = (selector, multiple = false) => {
    const isGeneric = !(selector.startsWith('#') || selector.startsWith('.'));
    if (!selector || typeof multiple !== 'boolean') throw new Error("Invalid arguements given");
    return `${(multiple ? 'all' : 'single')}-${(isGeneric ? selector : selector.split('').slice(1).join(''))}`;
};

export default hashElement
