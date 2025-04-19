import {
    getCurrentPlayer, getNewPlayerIndex, isValidSetUp,
    isShipsPlaced, canGameStart, isGameInProgress,
    safeClone, getLastTimeStamp, isDuplicateCoreEvent,
    addTimeStamp
} from "../../src/helpers/stateHelpers";
import timeStampFactory from "../../src/factories/timeStampFactory";

describe('State Helpers', () => {

    it('Validates the game is in progress', () => {
        expect(isGameInProgress(true, true, true, false)).toBeTruthy();
        expect(isGameInProgress(false, false, false, true)).toBeFalsy();
        expect(isGameInProgress(true, false, false, true)).toBeFalsy();
        expect(() => isGameInProgress()).toThrow();
    });

    it('Verifies the game can start', () => {
        expect(canGameStart(true, true)).toBeTruthy();
        expect(canGameStart(false, false)).toBeFalsy();
        expect(canGameStart(true, false)).toBeFalsy();
        expect(() => canGameStart()).toThrow();

    });

    it('Validates the game is set up', () => {
        expect(isValidSetUp('PvE', ['Player One', 'AI'], 2)).toBeTruthy();
        expect(isValidSetUp('pvp', ['Player One', 'AI'], 2)).toBeFalsy();
        expect(isValidSetUp('PvE', ['Player One'], 1)).toBeFalsy();
        expect(() => isValidSetUp()).toThrow();
        expect(() => isValidSetUp(2, ['Player One', 'AI'], 'PvE')).toThrow();
    });

    it('Verifies ships have been place', () => {
        expect(isShipsPlaced(10)).toBeTruthy();
        expect(isShipsPlaced()).toBeFalsy();
        expect(isShipsPlaced(20)).toBeFalsy();
        expect(isShipsPlaced(5)).toBeFalsy();
    });

    it('Correctly returns a safe clone of a state without throwing an error', () => {
        const stateObject = {
            isShipsPlaced: true,
            isSetUp: true,
            playerCount: 2,
            allPlayers: ['Player One', 'AI'],
            gameType: 'PvE'
        };

        expect(() => safeClone(stateObject)).not.toThrow();
        expect(safeClone(stateObject)).toEqual(expect.objectContaining({
            isShipsPlaced: expect.any(Boolean),
            isSetUp: expect.any(Boolean),
            playerCount: expect.any(Number),
            allPlayers: expect.any(Array),
            gameType: expect.any(String),
        }));
        expect(() => safeClone()).toThrow();
    });

    it('Correctly validates the next player index', () => {
        expect(getNewPlayerIndex(2, 3)).toBe(1);
        expect(getNewPlayerIndex(2, 2)).toBe(0);
        expect(() => getNewPlayerIndex('Player', 'AI')).toThrow();
        expect(() => getNewPlayerIndex()).toThrow();
    });

    it('Correctly return the next player from a players array', () => {
        const players = ['Player One', 'AI'];
        expect(getCurrentPlayer(players, 0)).toBe('Player One');
        expect(getCurrentPlayer(players, 1)).toBe('AI');
        expect(() => getCurrentPlayer('Player One')).toThrow();
        expect(() => getCurrentPlayer(players, 5)).toThrow();
        expect(() => getCurrentPlayer(players, 'one')).toThrow();
    });

    it('Gets the last time stamp in the timeline', () => {
        const timeLine = [];
        expect(getLastTimeStamp(timeLine)).toBeNull();

        const newStamp = timeStampFactory('Game Started', { isSetUp: true });
        timeLine.push(newStamp);

        expect(getLastTimeStamp(timeLine)).not.toBeNull();
        expect(timeLine.length).toEqual(1);
    });

    it('Identifies a duplicate core event entry', () => {
        const stampOne = timeStampFactory('Game Started', { isSetUp: true });
        const timeLine = [ stampOne ];

        expect(isDuplicateCoreEvent('Game Started', timeLine)).toBeTruthy();
        expect(isDuplicateCoreEvent('Game Ended', timeLine)).toBeFalsy();
    });

    it('Return a new timeline with an added timestamp', () => {
        const stampOne = timeStampFactory('Game Started', { isSetUp: true });
        const timeline = [];

        const updated = addTimeStamp(timeline, stampOne);

        expect(timeline.length).toEqual(0);
        expect(updated.length).toEqual(1);

        expect(() => addTimeStamp('abc', 123)).toThrow();
        expect(() => addTimeStamp(timeline, stampOne)).not.toThrow();
        expect(() => addTimeStamp(updated, stampOne)).toThrow();
    });
});
