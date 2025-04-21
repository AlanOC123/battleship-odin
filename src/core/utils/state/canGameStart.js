const canGameStart = (isSetUp, isShipsPlaced) => {
    if (typeof isSetUp === 'undefined' || typeof isShipsPlaced === 'undefined') {
            throw new Error("Parameters missing to check start", isSetUp, isShipsPlaced);
    };

    return isSetUp && isShipsPlaced;
};

export default canGameStart;
