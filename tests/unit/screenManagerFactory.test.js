import { screenManagerFactory } from "../../src/factories/screenManagerFactory";

describe('Screen Manager', () => {
    let screenController = null;
    const body = document.body;
    const app = document.createElement('div');
    app.id = 'app';

    beforeEach(() => {
        body.append(app);
        screenController = screenManagerFactory();
    });

    afterEach(() => {
        const testApp = document.getElementById('app');
        if (testApp) {
            body.removeChild(testApp);
        };
        screenController = null;
    });

    it('Denies access to private variables', () => {
        expect(screenController?._root).toBeUndefined();
        expect(screenController?._currentScreen).toBeUndefined();
    });

    it('Correctly renders a new screen component', () => {
        const newScreen = document.createElement('div');
        newScreen.id = 'new-screen';
        expect(screenController.getCurrentScreen()).toBeNull();

        screenController.renderScreen(newScreen);
        const testScreen = document.getElementById('new-screen');
        expect(testScreen).toBeDefined();
        expect(screenController.getCurrentScreen()).not.toBeNull();
        expect(screenController.getCurrentScreen()).toBe(testScreen);
    });
})
