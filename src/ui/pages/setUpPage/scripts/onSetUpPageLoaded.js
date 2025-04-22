import onCancelButtonClicked from './onCancelButtonClicked';

const onSetUpPageLoaded = () => {
    let playerName = null;
    let aiName = null;
    let difficulty = null;
    let gameType = null;

    const isValid = playerNameInput
    && aiNameInput
    && difficultyBtns.length
    && gameTypeBtns.length
    && startBtn
    && cancelBtn

    if (!isValid) throw new Error("Set up page not loaded correctly");

    cancelBtn.onclick = onCancelButtonClicked;
};

export default onSetUpPageLoaded;
