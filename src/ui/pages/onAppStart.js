import eventHub from "../../core/events/eventHub";
import launchPageHTML from './launchPage/launchPageString';

const onAppStart = () => {
    eventHub.emit('Page Changed', { page: launchPageHTML, loaded: 'Launch Page Loaded' });
};

const startApp = () => {
    eventHub.on('App Started', onAppStart);
};

export default startApp;
