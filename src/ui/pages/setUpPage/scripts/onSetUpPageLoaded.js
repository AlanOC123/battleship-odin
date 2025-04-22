import onCancelButtonClicked from './onCancelButtonClicked';

const onSetUpPageLoaded = () => {
    let playerName = null;
    let aiName = null;
    let difficulty = null;
    let gameType = null;

    const playerNameInput = document.getElementById('player-name');
    const aiNameInput = document.getElementById('ai-name');
    const difficultyBtns = [...document.querySelectorAll('.difficulty-btn')];
    const gameTypeBtns = [ ...document.querySelectorAll('.game-type-btn') ];
    const startBtn = document.getElementById('start-game');
    const cancelBtn = document.getElementById('return-to-launch');

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
