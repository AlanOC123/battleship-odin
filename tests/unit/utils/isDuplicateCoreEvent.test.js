import isDuplicateCoreEvent from "../../../src/core/utils/eventLog/isDuplicateCoreEvent";

describe('Duplicate Core Event check', () => {
    it('returns true for a repeated core event', () => {
        expect(isDuplicateCoreEvent('Game Started', 'Game Started')).toBe(true);
    });

    it('returns false for a repeated non-core event', () => {
        expect(isDuplicateCoreEvent('Shot Fired', 'Shot Fired')).toBe(false);
    });

    it('returns false when event names differ', () => {
        expect(isDuplicateCoreEvent('Game Started', 'Game Ended')).toBe(false);
    });

    it('returns false when last event is null', () => {
        expect(isDuplicateCoreEvent('Game Started', null)).toBe(false);
    });

    it('throws if inputs are not strings', () => {
        expect(() => isDuplicateCoreEvent(123, 123)).toThrow();
    });
});
