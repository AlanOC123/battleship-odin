import hashElement from "../../../src/ui/utils/domManager/hashElement";

describe('Hash Element', () => {
    it('correctly hashes an element', () => {
        expect(hashElement('.test', false)).toBe('single-test');
        expect(hashElement('.test', true)).toBe('all-test');
        expect(hashElement('#test', true)).toBe('all-test');
        expect(hashElement('test', false)).toBe('single-test');
        expect(hashElement('test')).toBe('single-test');
    });

    it('correctly throws on missing selector or invalid multiple arg', () => {
        expect(() => hashElement()).toThrow();
        expect(() => hashElement('test', 'test')).toThrow()
    });
});
