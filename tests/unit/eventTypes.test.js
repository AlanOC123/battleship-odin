import { onStart, onEnd } from '../../src/eventTypes';

describe('Event Types', () => {
    let gameStarted = null;
    let gameEnded = null;

    beforeEach(() => {
        gameStarted = onStart('PvE');
        gameEnded = onEnd('Player');
    });

    it ('Correctly copies the events', () => {
        expect(gameStarted).toBeDefined();
        console.log(gameStarted);
    })
})
