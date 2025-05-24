import DOMControllerFactory from "../../../src/ui/factories/domManagerFactory";
import setUpPageMock from "../../__mocks__/setUpPageMock";
import launchPageMock from "../../__mocks__/launchPageMock";

describe('DOM Controller Factory', () => {
    let domManager;

    beforeEach(() => {
        domManager = DOMControllerFactory();
    });

    afterEach(() => {
        domManager = null;
        document.body.innerHTML = '';
    });

    describe('Get Launch Page Elements', () => {
        it('retreives the launch button from the launch page', () => {
            launchPageMock();

            const btn = domManager.getLaunchPageElements().start
            expect(btn).toBeInstanceOf(HTMLButtonElement);
        });

        it('throws when the button isnt found', () => {
            expect(() => domManager.getLaunchPageElements()).toThrow();
        })
    })

    describe('Get Set Up Page Elements', () => {
        it('retreives a single element from the set up page', () => {
            setUpPageMock();

            const playerName = domManager.getSetupPageElements().inputs.playerName;
            expect(playerName).toBeInstanceOf(HTMLInputElement);
        });

        it('Retreives multiple elements from the set up page', () => {
            setUpPageMock();

            const btns = domManager.getSetupPageElements().difficultyOptions;
            expect(Object.keys(btns)).toEqual([ 'easy', 'medium', 'hard' ]);
        });

        it('throws when called incorrectly', () => {
            expect(() => domManager.getSetupPageElements()).toThrow();
        });
    });
});
