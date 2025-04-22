import DOMManager from '../../../managers/domManager';

const addDifficultySelectedClass = ({ target }) => {
    if (!target) throw new Error("No button given");

    const { difficultyOptions } = DOMManager.getSetupPageElements();
    const { easy, medium, hard } = difficultyOptions;
    [ easy, medium, hard ].forEach(btn => btn.classList.remove('selected'));
    target.classList.add('selected');
}

export default addDifficultySelectedClass;
