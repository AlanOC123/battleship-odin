import screenManagerFactory from "../../src/factories/screenManagerFactory";

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
        body.removeChild(app);
        screenController = null;
    });

    it('Denies access to private variables', () => {
        expect(screenController._root).toBeUndefined();
    })
})
