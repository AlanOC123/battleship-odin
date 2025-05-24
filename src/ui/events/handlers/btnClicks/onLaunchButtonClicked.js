import eventHub from "../../../../eventHub";
import setUpPageHTML from "../../../pages/setUpPage/setUpPageString";

const onLaunchButtonClicked = () => {
    eventHub.emit({ name: 'Page Changed', type: 'ui', src: 'LaunchBtn' }, { page: setUpPageHTML, loaded: 'Set Up Page Loaded' });
    eventHub.emit({ name: 'Set Up Started', type: 'core', src: 'LaunchBtn' }, { isSetUpStarted: true })
};

export default onLaunchButtonClicked;
