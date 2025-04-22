const findBtnWithTextContent = (string, btns) => {
    if (!string || typeof string !== 'string') throw new Error("Invalid text provided");
    if (!btns || !Array.isArray(btns) || !btns.length) throw new Error("Invalid buttons array given");
    return btns.find(btn => btn.textContent === string) || null;
};

export default findBtnWithTextContent;
