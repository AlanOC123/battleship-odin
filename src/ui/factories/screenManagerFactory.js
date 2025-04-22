import clearScreen from "../utils/screenManager/clearScreen";
import getTemplateClone from "../utils/screenManager/getTemplateClone";
import onLaunchPageLoaded from '../events/handlers/screenManager/onLaunchPageLoaded';
import onSetUpPageLoaded from '../events/handlers/screenManager/onSetUpPageLoaded';

const screenManagerFactory = (eventHub, reducerFactory) => {
    const root = document.getElementById('app');
    let currentScreen = null;

    const renderScreen = (dataObject) => {
        clearScreen(root);
        const htmlString = dataObject?.page;
        const msg = { name: dataObject?.loaded, type: 'ui', src: 'ScreenMnger' };
        if (!htmlString) throw new Error("Invalid payload received", htmlString, dataObject);
        const page = getTemplateClone(htmlString);
        root.append(page);
        currentScreen = page;
        eventHub.emit(msg, {});
    };

    const eventStructure = [
        [ 'Page Changed', [ renderScreen ] ],
        [ 'Launch Page Loaded', [ onLaunchPageLoaded ] ],
        [ 'Set Up Page Loaded', [ onSetUpPageLoaded ] ],
    ];

    const reducer = reducerFactory(eventStructure);

    const addEventsToHub = (eventName) => {
        if (!eventName || typeof eventName !== 'string') throw new Error("Invalid event name", eventName);
        eventHub.on(eventName, (payload) => reducer.dispatchHandler(eventName, payload));
    };

    eventStructure.forEach(([e, _]) => addEventsToHub(e));

    return {
        renderScreen,
        getCurrentScreen: () => currentScreen,
    };
};

export default screenManagerFactory;
