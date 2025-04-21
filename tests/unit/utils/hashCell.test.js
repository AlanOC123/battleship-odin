import hashCell from "../../../src/core/utils/gameBoard/hashCell";

describe('Hash Cell', () => {
    it('correctly hashes a cell', () => {
        expect(hashCell(1, 2)).toBe(`1, 2`);
    });

    it('throws on string input', () => {
        expect(() => hashCell('a', 'b')).toThrow();
    });

    it('throws on a missing coordinate', () => {
        expect(() => hashCell(1)).toThrow();
    });

    it('Throws on a negative number', () => {
        expect(() => hashCell(-1, -2)).toThrow();
    });
});
