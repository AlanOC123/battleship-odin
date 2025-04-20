const getTemplateClone = (htmlString) => {
    if (!htmlString || typeof htmlString !== 'string') throw new Error("Invalid html provided.", htmlString);

    const template = document.createElement('template');
    template.innerHTML = htmlString;
    return template.content.cloneNode(true);
};

export default getTemplateClone;
