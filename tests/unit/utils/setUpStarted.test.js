import setUpStarted from "../../../src/core/utils/state/setUpStarted";

describe('Set Up Started', () => {
    it('returns a copy of the value', () => {
        const event = { isSetUpStarted: false };
        let val = setUpStarted(event);
        expect(setUpStarted(event)).toBeFalsy();
        expect(val).toBeFalsy();
        val = true;
        expect(event.isSetUpStarted).toBeFalsy();
    });

    it('throws on missing event or invalid data', () => {
        expect(() => setUpStarted()).toThrow();
        expect(() => setUpStarted({ isSetUpStarted: '123' })).toThrow();
    });
})
