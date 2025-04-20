const clearScreen = (root) => {
    if (!root) throw new Error("Root component not given", root);
    if (!(root instanceof HTMLElement)) throw new Error("Invalid root component given", typeof root);
    root.innerHTML = '';
};

const injectTemplate = (appElement, htmlString) => {
    if (!htmlString || typeof htmlString !== 'string') throw new Error("Invalid html provided.", htmlString);
    if (!appElement || !(appElement instanceof HTMLDivElement)) throw new Error("Invalid root provided", appElement);

    const template = document.createElement('template');
    template.innerHTML = htmlString;
    appElement.appendChild(template.content.cloneNode(true));
};

export {
    clearScreen,
    injectTemplate,
}
