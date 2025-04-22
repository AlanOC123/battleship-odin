import onCancelButtonClicked from '../btnClicks/onCancelButtonClicked';
import onInputChanged from '../inputChanges/onNameInputChanged';
import onDifficultyClicked from '../btnClicks/onDifficultyClicked';
import onGameTypeClicked from '../btnClicks/onGameTypeClicked';
import DOMManager from '../../../managers/domManager';

const onSetUpPageLoaded = () => {
    const { inputs, difficultyOptions, gameTypeOptions, gameControls } = DOMManager.getSetupPageElements();
    const { playerName, aiName } = inputs;
    const { easy, medium, hard } = difficultyOptions;
    const { pvp, pve } = gameTypeOptions;
    const { start, cancel } = gameControls;

    const isValid = (playerName && aiName)
    && (easy && medium && hard)
    && (pvp && pve)
    && (start && cancel)

    if (!isValid) throw new Error("Set up page not loaded correctly");

    cancel.onclick = onCancelButtonClicked;
    playerName.onchange = aiName.onchange = onInputChanged;
    [easy, medium, hard].forEach(btn => btn.onclick = onDifficultyClicked);
    [pve, pvp].forEach(btn => btn.onclick = onGameTypeClicked);
};

export default onSetUpPageLoaded;
