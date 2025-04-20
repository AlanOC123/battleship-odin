import clearScreen from "../utils/screenManager/clearScreen";
import getTemplateClone from "../utils/screenManager/getTemplateClone";

const screenManagerFactory = () => {
    const _root = document.getElementById('app');
    let _currentScreen = null;

    const renderScreen = (htmlString) => {
        clearScreen(_root);
        const page = getTemplateClone(htmlString);
        _root.append(page);
        _currentScreen = page;
    };

    return {
        renderScreen,
        getCurrentScreen: () => _currentScreen,
    };
};

export default screenManagerFactory;
