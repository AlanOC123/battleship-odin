import hashBoardNode from "../../../src/core/logic/hashBoardNode";

describe('Hash Board Node', () => {
    it('correctly hashes a cell', () => {
        expect(hashBoardNode(1, 2)).toBe(12);
    });

    it('throws on string input', () => {
        expect(() => hashBoardNode('a', 'b')).toThrow();
    });

    it('throws on a missing coordinate', () => {
        expect(() => hashBoardNode(1)).toThrow();
    });

    it('Throws on a negative number', () => {
        expect(() => hashBoardNode(-1, -2)).toThrow();
    });
});
