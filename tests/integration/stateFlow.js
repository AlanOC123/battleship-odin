import hub from "../../src/events/hub";
import state from "../../src/core/singletons/state";
import createEvent from "../../src/factories/createEvent";
import EVENT_NAMES from "../../src/events/names";

describe('State Manager Integration', () => {
  beforeEach(() => {

    hub.removeAll();
    state.registerRoutes();
  });

  it('handles app start and sends state copy', () => {
    const startEvent = createEvent(EVENT_NAMES.CORE.START_APP, '[Test]');
    const requestEvent = createEvent(EVENT_NAMES.CORE.REQUEST_STATE_COPY, '[Test]');

    const callback = jest.fn();

    hub.on(EVENT_NAMES.CORE.STATE_COPY_SENT.KEY, callback);

    hub.emit(startEvent, {
      key: startEvent.key,
      action: 'set',
      data: { isLaunched: true }
    });

    hub.emit(requestEvent, {
      key: requestEvent.key,
      action: 'get'
    });

    expect(callback).toHaveBeenCalled();

    const [payload] = callback.mock.calls[0];

    expect(payload.launchState.isLaunched).toBe(true);
    expect(payload.metaData).toBeDefined();
    expect(payload.metaData.id).toMatch(/[a-z0-9]{10}/);
  });
});
