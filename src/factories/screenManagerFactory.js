import { clearScreen } from "../helpers/screenManagerHelpers";

const screenManagerFactory = () => {
    const _root = document.getElementById('app');
    let _currentScreen = null;

    const renderScreen = (screenComponent) => {
        clearScreen(_root);
        _root.append(screenComponent);
        _currentScreen = screenComponent;
    };

    return {
        renderScreen,
        getCurrentScreen: () => _currentScreen,
    };
};

export { screenManagerFactory };

const screenController = screenManagerFactory();

export default screenController;
