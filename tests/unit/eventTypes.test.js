import { onStart, onShipSunk } from '../../src/eventTypes';

describe('Event Types', () => {

    it('Correctly copies the event data without changing it', () => {
        const gameStarted = onStart('PvE');
        expect(gameStarted?.baseEvent).toBeUndefined();
        expect(() => gameStarted.gameType = 'Bad Type').toThrow();
        expect(gameStarted.gameType).not.toBe('Bad Type');
        expect(gameStarted.timeStamp).toEqual(expect.any(String));
        expect(Object.isFrozen(gameStarted)).toBeTruthy();
    });

    it('Correctly sends a ship sunk event', () => {
        const event = onShipSunk('Player', 'AI', 5, 'Destroyer');
        expect(event.attackingPlayer).toBe('Player');
        expect(event.defendingPlayer).toBe('AI');
        expect(event.moveCount).toEqual(5);
        expect(event.shipType).toEqual('Destroyer');
    });
});
