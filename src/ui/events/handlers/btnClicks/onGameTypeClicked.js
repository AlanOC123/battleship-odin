import eventHub from '../../../../eventHub';

const onGameTypeClicked = (e) => {
    if (!e)throw new Error("Invalid event triggered");

    const target = e.target;
    if (!target) throw new Error("Button not found");

    const value = target.textContent;
    eventHub.emit({ name: 'Game Type Selected', type: 'core', src: `${value}Btn` }, { value });
    eventHub.emit({ name: 'Game Type Button Clicked', type: 'ui', src: `${value}Btn` }, { target } );
};

export default onGameTypeClicked;
