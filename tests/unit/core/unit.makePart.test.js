import makePart from '../../../src/core/factories/ship/parts/makePart';

describe('[Unit] Mark Part', () => {
    const partOne = { name: 'Test', description: 'Test Part', index: 0};
    const partTwo = { name: 'Test', description: 'Test Part', index: 1};

    it('generates a ship part object', () => {
        expect(makePart(partOne.name, partOne.description, partOne.index, { head: true })).toEqual(expect.objectContaining({
            NAME: partOne.name,
            DESCRIPTION: partOne.description,
            INDEX: partOne.index,
            HEAD: true,
            TAIL: false
        }));

        expect(makePart(partTwo.name, partTwo.description, partTwo.index, { tail: true })).toEqual(expect.objectContaining({
            NAME: partTwo.name,
            DESCRIPTION: partTwo.description,
            INDEX: partTwo.index,
            HEAD: false,
            TAIL: true
        }));
    })
})
