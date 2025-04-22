import findBtnWithTextContent from "../../../src/ui/utils/general/findBtnWithTextContent";

describe('Find Button With Text Content', () => {
    const btnOne = document.createElement('button');
    const btnTwo = document.createElement('button');
    const btnThree = document.createElement('button');

    btnOne.textContent = 'One';
    btnTwo.textContent = 'Two';
    btnThree.textContent = 'Three';

    const btns = [ btnOne, btnTwo, btnThree ];

    it('gets a button based on its text', () => {
        expect(findBtnWithTextContent('One', btns)).toBe(btnOne);
        expect(findBtnWithTextContent('Two', btns)).toBe(btnTwo);
        expect(findBtnWithTextContent('Three', btns)).toBe(btnThree);
    });

    it('remains pure by not changing the array', () => {
        const btn = findBtnWithTextContent('One', btns);
        expect(btns.length).toEqual(3);
    });

    it('returns null when nothing is found', () => {
        expect(findBtnWithTextContent('Four', btns)).toBeNull();
    });

    it('throws on invalid arguement', () => {
        expect(() => findBtnWithTextContent()).toThrow();
        expect(() => findBtnWithTextContent(123, btns)).toThrow();
        expect(() => findBtnWithTextContent('One', {})).toThrow();
    });
})
