import eventHub from "../../../../core/events/eventHub";
import setUpPageHTML from "../../setUpPage/setUpPageString";

const onLaunchButtonClicked = () => {
    console.log(1);
    eventHub.emit('Page Changed', { page: setUpPageHTML, loaded: 'Set Up Page Loaded' });
};

export default onLaunchButtonClicked;
