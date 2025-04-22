import DOMManager from '../../../managers/domManager';

const addGameTypeSelectedClass = ({ target }) => {
    if (!target) throw new Error("No button given");

    const { gameTypeOptions } = DOMManager.getSetupPageElements();
    const { pve, pvp } = gameTypeOptions;
    [ pve, pvp ].forEach(btn => btn.classList.remove('selected'));
    target.classList.add('selected');
}

export default addGameTypeSelectedClass;
