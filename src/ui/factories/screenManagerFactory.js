import clearScreen from "../utils/screenManager/clearScreen";
import getTemplateClone from "../utils/screenManager/getTemplateClone";

const screenManagerFactory = () => {
    const root = document.getElementById('app');
    let currentScreen = null;

    const renderScreen = (htmlString) => {
        clearScreen(root);
        const page = getTemplateClone(htmlString);
        root.append(page);
        currentScreen = page;
    };

    return {
        renderScreen,
        getCurrentScreen: () => currentScreen,
    };
};

export default screenManagerFactory;
