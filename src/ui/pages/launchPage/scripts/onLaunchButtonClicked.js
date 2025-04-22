import eventHub from "../../../../eventHub";
import setUpPageHTML from "../../setUpPage/setUpPageString";

const onLaunchButtonClicked = () => {
    eventHub.emit({ name: 'Page Changed', type: 'ui', src: 'LaunchBtn' }, { page: setUpPageHTML, loaded: 'Set Up Page Loaded' });
};

export default onLaunchButtonClicked;
