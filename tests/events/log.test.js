import log from "../../src/events/log";
import { mockEvent, buildMockEvent, buildUniqueMockEvent } from '../__mocks__/events.mock';

describe('Event Log', () => {
    it('creates a valid node from an event object', () => {
        const event = buildMockEvent();
        expect(log.createNode(event)).toEqual(expect.objectContaining({
            key: expect.any(String),
            type: expect.any(String),
            source: expect.any(String),
            family: expect.any(String),
            time: expect.any(String),
        }));
        expect(() => log.createNode()).toThrow();
        expect(() => log.createNode(event)).not.toThrow();
    });

    it('returns an array of nodes and ids not effecting internal map', () => {
        const event = buildMockEvent();
        log.createNode(event);
        const logNodes = log.getNodes();
        expect(logNodes).toEqual(expect.any(Array));
        logNodes.push('Test');
        expect(logNodes.length).not.toEqual(log.getNodes().length);
    });

    it('clears the log', () => {
        const event = buildMockEvent();
        log.createNode(event);
        const logNodes = log.getNodes();

        expect(logNodes.length).toBeGreaterThan(0);
        log.clearNodes();
        expect(log.getNodes().length).toEqual(0);
    });

    beforeEach(() => log.clearNodes());

    it('get filtered events as an array', () => {
        const genEvent = buildMockEvent();
        const uniqueEvent = buildUniqueMockEvent();
        log.createNode(genEvent);
        log.createNode(genEvent);
        log.createNode(uniqueEvent);
        expect(log.filterNodes('family', 'test').length).toEqual(3);
        expect(log.filterNodes('type', 'generic').length).toEqual(2);
        expect(() => log.filterNodes()).toThrow()
    })
});
