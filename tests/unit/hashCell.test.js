import hashCell from "../../src/helpers/hashCell";

describe('Hash Cell', () => {
    it('Hashes coordinates to keys correctly', () => {
        expect(hashCell(1, 2)).toBe(`${1}, ${2}`);
        expect(hashCell(10, 10)).not.toBe(10, 10);
    });

    it('Throws error with invalid coordinates', () => {
        expect(() => hashCell(undefined, undefined)).toThrow();
        expect(() => hashCell(null, null)).toThrow();
        expect(() => hashCell(undefined, 1)).toThrow();
        expect(() => hashCell(null, 1)).toThrow();
    });

    it ('Treats x, y and y, x to be distinct', () => {
        expect(hashCell(3, 4)).not.toBe(`${4}, ${3}`);
    });
});
