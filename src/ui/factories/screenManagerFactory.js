import clearScreen from "../utils/screenManager/clearScreen";
import getTemplateClone from "../utils/screenManager/getTemplateClone";
import eventReducerFactory from "../../core/factories/eventReducerFactory";
import eventHub from "../../core/events/eventHub";
import onLaunchPageLoaded from "../pages/launchPage/scripts/onLaunchPageLoaded";

const screenManagerFactory = () => {
    const root = document.getElementById('app');
    let currentScreen = null;

    const renderScreen = (dataObject) => {
        clearScreen(root);
        const htmlString = dataObject?.page;
        const msg = dataObject?.loaded;
        if (!htmlString) throw new Error("Invalid payload received", htmlString, dataObject);
        const page = getTemplateClone(htmlString);
        root.append(page);
        currentScreen = page;
        eventHub.emit(msg, {});
    };

    const eventStructure = [
        [ 'Page Changed', [ renderScreen ] ],
        [ 'Launch Page Loaded', [ onLaunchPageLoaded ] ]
    ]

    const reducer = eventReducerFactory(eventStructure);

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
