import { clearScreen } from "../../src/helpers/screenManagerHelpers";

describe('Clear Screen Helpers', () => {
    const root = document.body;
    const app = document.createElement('div');
    app.id = 'app';

    beforeEach(() => {
        root.append(app);
    });

    afterEach(() => {
        if (root.firstChild) {
            root.removeChild(root.firstChild);
        };
    });

    it('Correctly clears the screen', () => {
        expect(() => clearScreen()).toThrow();
        expect(() => clearScreen('abd')).toThrow();

        app.append(document.createElement('div'));
        expect(app.children.length).toEqual(1);
        clearScreen(app);
        expect(app.children.length).toEqual(0);
    });
})
