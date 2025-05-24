const playerFactory = (isAI = false) => {
    let playerName = isAI ? 'AI' : null;
    let isValidPlayer = false;
    let gameBoardLink = null;
    let isTurn = false;
    let ships = [];
    let hits = new Set();
    let misses = new Set();
};

export default playerFactory;
