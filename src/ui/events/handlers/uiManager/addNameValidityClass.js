const addInputValidityClass = ({ target, isValid }) => {
    if (!target) throw new Error("Target element not found", target);

    target.classList.remove('valid', 'invalid');

    const classesToAdd = isValid ? 'valid' : 'invalid';

    target.classList.add(classesToAdd);

};

export default addInputValidityClass;
