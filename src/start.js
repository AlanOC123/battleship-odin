import eventHub from './events/hub';
import eventRegistry from './events/registry';

const _MODULE_NAME = '[Start App]';

const _EVENT_NAMES = {
    START_APP: 'start-app',
}

const _EVENT_KEYS = {
    START_APP: eventRegistry.createEvent(_EVENT_NAMES.START_APP, { isLaunched: 'boolean' }, 'unique', 'core'),
};

const start = (mode) => {
    const message = eventHub.createMessage(_EVENT_KEYS.START_APP, _MODULE_NAME, { isLaunched: true });
    eventHub.emitMessage(message);
    return true;
};

export default start;
