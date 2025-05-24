import uiManagerFactory from "../../src/ui/factories/uiManagerFactory";

describe('UI Manager Factory', () => {
    let mockEventHub, mockReducerFactory, mockDispatchHandler, uiManager;

    beforeEach(() => {
        mockDispatchHandler = jest.fn();

        mockEventHub = {
            on: jest.fn(),
        };

        mockReducerFactory = jest.fn(() => ({
            dispatchHandler: mockDispatchHandler,
        }));
    });

    it('subscribes to all events in the event structure', () => {
        uiManagerFactory(mockEventHub, mockReducerFactory);

        const expectedEvents = [
            'Name Input Validated',
            'Difficulty Button Clicked',
            'Game Type Button Clicked',
        ];

        expectedEvents.forEach((event, index) => {
            expect(mockEventHub.on).toHaveBeenNthCalledWith(index + 1, event, expect.any(Function))
        })
    });

    it('calls dispatch when eventHub emits', () => {
        uiManagerFactory(mockEventHub, mockReducerFactory);

        const callback = mockEventHub.on.mock.calls.find(call => call[0] === 'Name Input Validated')[1];

        const fakePayload = { name: 'Test' };
        callback(fakePayload);

        expect(mockDispatchHandler).toHaveBeenCalledWith('Name Input Validated', fakePayload);
    });

    it('throws an error if the event hub or the reducer are missing', () => {
        expect(() => uiManagerFactory(null, mockReducerFactory)).toThrow();
        expect(() => uiManagerFactory(mockEventHub, null)).toThrow();
    })
})
