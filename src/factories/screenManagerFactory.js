import { clearScreen, injectTemplate } from "../helpers/screenManagerHelpers";
import launchPageHTML from '../pages/launchPage/launchPageString';
import gameEventManager from "../gameEventManager";

const screenManagerFactory = () => {
    const _root = document.getElementById('app');
    let _currentScreen = null;

    const renderScreen = (screenComponent) => {
        clearScreen(_root);
        _root.append(screenComponent);
        _currentScreen = screenComponent;
    };

    const initScreen = () => {
        injectTemplate(_root, launchPageHTML);
        const launchScreenPage = document.getElementById('launch-screen');
        if (!launchScreenPage) throw new Error("Initialisation failed", launchScreenPage);

        _currentScreen = document.body;
        gameEventManager.emit('Launch Screen Loaded')
    };

    return {
        renderScreen,
        initScreen,
        getCurrentScreen: () => _currentScreen,
    };
};

export { screenManagerFactory };

const screenController = screenManagerFactory();

export default screenController;
