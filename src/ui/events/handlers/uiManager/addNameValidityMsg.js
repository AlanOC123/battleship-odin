const addNameValidityMsg = ({ target, isValid }) => {
    if (!target) throw new Error("Target element not found", target);

    const span = target.parentElement.querySelector('span');
    if (!span) throw new Error("Error msg field not found");

    if (!isValid) span.classList.remove('hidden');
    else {
        span.classList.add('hidden');
        span.textContent = '';
        return;
    }

    const msg = isValid ? `` : 'Invalid Name Given';
    span.textContent = msg;
};

export default addNameValidityMsg;
