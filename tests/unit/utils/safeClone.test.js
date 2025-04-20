import safeClone from "../../../src/core/utils/general/safeClone"

describe('Safe Clone', () => {
    it('clones an object', () => {
        expect(safeClone({ n: 1, setUp: true })).toEqual(expect.objectContaining({
            n: 1, setUp: true
        }));
    });

    it('prevents mutation of original', () => {
        const obj = { n: 1, setUp: true };
        const obj2 = safeClone(obj);
        obj2.n = 2;
        expect(obj.n).toBe(1);
        expect(obj2.n).toBe(2);
    });

    it('throws on invalid object', () => {
        expect(() => safeClone('abc')).toThrow();
    });

    it('clones deeply nested objects', () => {
        const original = { a: { b: { c: 1 } } };
        const clone = safeClone(original);
        clone.a.b.c = 2;
        expect(original.a.b.c).toBe(1);
        expect(clone.a.b.c).toBe(2);
    });
});
