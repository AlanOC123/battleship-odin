import EVENT_HUB from './events/hub';
import EVENT_KEYS from './data/events/keys';

const _MODULE_NAME = '[Start App]';

const start = (mode) => {
    const message = EVENT_HUB.createMessage(EVENT_KEYS.START_APP, _MODULE_NAME, { isLaunched: true });

    try {
        return EVENT_HUB.emitMessage(message);
    } catch (err) {
        console.error(err.message);
        return false;
    }
};

export default start;
