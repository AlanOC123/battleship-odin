import createUUID from "../../../src/factories/createUUID";

describe('[Unit] Create UUID', () => {
    it('generates a UUID string', () => {
        expect(createUUID()).toEqual(expect.any(String));
        expect(createUUID().length).toEqual(5);
    });

    it('throws on an invalid base size outside 2 to 36 range', () => {
        expect(() => createUUID(10, 1)).toThrow();
        expect(() => createUUID(10, 37)).toThrow();
    });

    it('throws on an invalid length outside 5 to 20 range', () => {
        expect(() => createUUID(4, 16)).toThrow();
        expect(() => createUUID(21, 16)).toThrow();
    });
});
