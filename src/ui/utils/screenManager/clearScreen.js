const clearScreen = (root) => {
    if (!root) throw new Error("Root component not given", root);
    if (!(root instanceof HTMLElement)) throw new Error("Invalid root component given", typeof root);
    root.innerHTML = '';
};

export default clearScreen;
