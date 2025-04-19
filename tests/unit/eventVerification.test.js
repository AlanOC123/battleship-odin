import { isCoreEvent, isGameEvent, isKnownEvent } from "../../src/helpers/eventVerification";

describe('Event Verification', () => {
    it('Verifies a core event', () => {
        expect(isCoreEvent('Game Started')).toBeTruthy();
        expect(isCoreEvent('Turn Changed')).toBeFalsy();
    });

    it('Verifies a game event', () => {
        expect(isGameEvent('Ship Sunk')).toBeTruthy();
        expect(isGameEvent('Set Up Complete')).toBeFalsy();
    });

    it('Verifies a core event', () => {
        expect(isKnownEvent('Game Started')).toBeTruthy();
        expect(isKnownEvent('Ship Sunk')).toBeTruthy();
        expect(isKnownEvent('dsfsdfsdf')).toBeFalsy();
    });
});
