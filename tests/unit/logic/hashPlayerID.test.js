import hashPlayerID from "../../../src/core/logic/hashPlayerID"

describe('Player ID Hash Funtion', () => {
    it('Correctly return the right type', () => {
        expect(hashPlayerID('Test')).toEqual(expect.any(Number));
    });

    it('Throws when given an invalid name', () => {
        expect(() => hashPlayerID()).toThrow();
        expect(() => hashPlayerID(1234)).toThrow();
    });

    it('Returns a unique value', () => {
        const valOne = hashPlayerID('Test');
        const valTwo = hashPlayerID('Test');
        expect(valOne).not.toEqual(valTwo);
    });
})
