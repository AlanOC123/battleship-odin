import addDifficultySelectedClass from "../../src/ui/events/handlers/uiManager/addDifficultySelectedClass";
import DOMControllerFactory from "../../src/ui/factories/domManagerFactory";
import setUpPageMock from "../__mocks__/setUpPageMock";

describe('addDifficultySelectedClass', () => {
    let DOMManager = DOMControllerFactory();

    beforeEach(() => {
        setUpPageMock();
    });

    afterEach(() => document.body.innerHTML = '');

    it('adds selected class to target and removes from others', () => {
        const { difficultyOptions } = DOMManager.getSetupPageElements();
        const { easy, medium, hard } = difficultyOptions;

        expect(easy.classList.contains('selected')).toBe(false);
        expect(medium.classList.contains('selected')).toBe(false);
        expect(hard.classList.contains('selected')).toBe(false);

        addDifficultySelectedClass({ target: easy });
        expect(easy.classList.contains('selected')).toBe(true);
        expect(medium.classList.contains('selected')).toBe(false);
        expect(hard.classList.contains('selected')).toBe(false);

        addDifficultySelectedClass({ target: medium });
        expect(easy.classList.contains('selected')).toBe(false);
        expect(medium.classList.contains('selected')).toBe(true);
        expect(hard.classList.contains('selected')).toBe(false);
    });

    it('throws error if no target provided', () => {
        expect(() => addDifficultySelectedClass({})).toThrow();
    });
});
