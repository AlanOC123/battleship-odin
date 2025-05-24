import eventHub from '../../../../eventHub';

const onDifficultyClicked = (e) => {
    if (!e)throw new Error("Invalid event triggered");

    const target = e.target;
    if (!target) throw new Error("Button not found");

    console.log(e);

    const value = target.textContent;
    eventHub.emit({ name: 'Difficulty Selected', type: 'core', src: `${value}Btn` }, { value });
    eventHub.emit({ name: 'Difficulty Button Clicked', type: 'ui', src: `${value}Btn` }, { target } );
};

export default onDifficultyClicked;
