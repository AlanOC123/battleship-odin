const hashPlayerID = (playerName) => {
    if (!playerName || typeof playerName !== 'string') throw new Error("Invalid player name");
    const timeStamp = new Date().toISOString();
    const getCharValue = (c) => Number(c) ? Number(c) : c.charCodeAt(0);
    const reduceString = (s) => [...s].reduce((prev, curr) => prev += getCharValue(curr), 0);
    const randomNum = Math.floor(Math.random() * 1000);

    return (reduceString(playerName) + reduceString(timeStamp)) * randomNum;
};

export default hashPlayerID;
