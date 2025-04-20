import { clearScreen, injectTemplate } from "../../src/helpers/screenManagerHelpers";

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

    it('Correctly appends the html of a template to using injection', () => {
        clearScreen(app);
        const testElement = document.createElement('div');
        const testMessage = document.createElement('p');
        testElement.textContent = 'Test Message';
        testElement.appendChild(testMessage);
        const testString = testElement.innerHTML;
        expect(app.innerHTML).toBe('');
        expect(() => injectTemplate()).toThrow();
        expect(() => injectTemplate(app, 123)).toThrow();
        expect(() => injectTemplate(123, testString)).toThrow();
        injectTemplate(app, testString);
        expect(app.innerHTML).toBe(testString);
    });
})
