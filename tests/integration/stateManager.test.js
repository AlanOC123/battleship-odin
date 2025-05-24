import stateManagerFactory from '../../src/core/factories/stateManagerFactory';

describe('stateManagerFactory', () => {
    let mockEventHub;
    let mockReducerFactory;
    let mockDispatchHandler;
    let emittedEvents;

    beforeEach(() => {
      emittedEvents = [];
      mockEventHub = {
        on: jest.fn(),
        emit: jest.fn((event, payload) => emittedEvents.push({ event, payload })),
      };
      mockDispatchHandler = jest.fn().mockReturnValue({});
      mockReducerFactory = jest.fn(() => ({
        dispatchHandler: mockDispatchHandler,
      }));
    });

    it('subscribes to all events in the eventStructure', () => {
      stateManagerFactory(mockEventHub, mockReducerFactory);  // Require here to run init logic

      const expectedEvents = ['App Started', 'App Restarted', 'Set Up Started'];

      expectedEvents.forEach((eventName) => {
        expect(mockEventHub.on).toHaveBeenCalledWith(
          eventName,
          expect.any(Function)
        );
      });
    });

    it('handles "App Started" by updating state and emitting "State Changed"', () => {
      stateManagerFactory(mockEventHub, mockReducerFactory);

      // Simulate "App Started"
      const callback = mockEventHub.on.mock.calls.find(
        ([eventName]) => eventName === 'App Started'
      )[1];

      callback();  // No payload

      const stateChangedEvent = emittedEvents.find(
        ({ event }) => event.name === 'State Changed'
      );

      expect(stateChangedEvent).toBeDefined();
      expect(stateChangedEvent.event).toEqual({
        name: 'State Changed',
        type: 'core',
        src: 'StateMnger',
      });
    });

    it('delegates to reducer and emits updated state on other events', () => {
      stateManagerFactory(mockEventHub, mockReducerFactory);

      const callback = mockEventHub.on.mock.calls.find(
        ([eventName]) => eventName === 'Set Up Started'
      )[1];

      const dummyPayload = { playerName: 'Alice' };
      const reducerOutput = { isSetUpStarted: true };
      mockDispatchHandler.mockReturnValueOnce(reducerOutput);

      callback(dummyPayload);

      expect(mockDispatchHandler).toHaveBeenCalledWith('Set Up Started', dummyPayload);

      const stateChangedEvent = emittedEvents.find(
        ({ event }) => event.name === 'State Changed'
      );

      expect(stateChangedEvent.payload.updatedState.isSetUpStarted).toBe(true);
    });
  });
