import hub from './events/hub';
import state from './core/singletons/state';
import createEvent from './factories/createEvent';
import EVENT_NAMES from './events/names';

const _MODULE_NAME = '[Start App]'

const start = (mode) => {
    state.registerRoutes();
    const startEvent = createEvent(EVENT_NAMES.CORE.START_APP, _MODULE_NAME);
    const requestEvent = createEvent(EVENT_NAMES.CORE.REQUEST_STATE_COPY, _MODULE_NAME);
    hub.on(EVENT_NAMES.CORE.STATE_COPY_SENT.KEY, (payload) => console.log(payload));
    hub.emit(startEvent, { key: startEvent.key, action: 'set', data: { isLaunched: true } });
    hub.emit(requestEvent, { key: requestEvent.key, action: 'getall' });
};

export default start;
