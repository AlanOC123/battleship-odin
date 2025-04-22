import eventHub from "../../../../eventHub";

const onNameInputChanged = (e) => {
    const target = e.target;
    if (!target) throw new Error("Invalid event triggered");
    const value = target.value;
    const reference = target.id === 'player-name' ? 'Player' : target.id === 'ai-name' ? 'AI' : 'Unknown';

    let isValid = true;
    if (!value || typeof value !== 'string') isValid = false;

    eventHub.emit({name: 'Name Input Validated', type: 'ui', src: `${reference}Input`}, { target, value, reference, isValid });
    eventHub.emit({ name: 'Name Input Changed', type: 'core', src: `${reference}Input` }, { value, reference, isValid });
};

export default onNameInputChanged;
