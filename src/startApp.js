import eventHub from "./eventHub";
import launchPageHTML from './ui/pages/launchPage/launchPageString';
import setUpPageHTML from './ui/pages/setUpPage/setUpPageString';
import placeShipsHTML from './ui/pages/gameBoard/placeShipsHTMLString';
import screenManager from './ui/managers/screenManager';
import uiManager from "./ui/managers/uiManager";
import stateManager from "./core/managers/stateManager";

const startApp = (DEV_MODE=false, PAGE='launch') => {
    const emitStart = (uiPayload) => {
        eventHub.emit({ name: 'App Started', type: 'core', src:'Index' }, {});
        eventHub.emit({ name: 'Page Changed', type: 'ui', src: 'Index' }, uiPayload);
    }

    let UI_PAYLOAD = { page: launchPageHTML, loaded: 'Launch Page Loaded' };

    if (DEV_MODE) {
        console.log('Dev Mode');
        const ROUTER = {
            'launch': { page: launchPageHTML, loaded: 'Launch Page Loaded' },
            'setup': { page: setUpPageHTML, loaded: 'Set Up Page Loaded' },
            'place ships': { page: placeShipsHTML, loaded: 'Ship Placement Loaded' },
        };

        UI_PAYLOAD = ROUTER[PAGE] || ROUTER['launch'];

        emitStart(UI_PAYLOAD);
        return;
      }

      emitStart(UI_PAYLOAD);
}

export default startApp;
