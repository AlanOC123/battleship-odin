import "./ui/styles/main.css";
import eventHub from "./eventHub";
import startApp from './ui/pages/onAppStart';
import screenManager from './ui/managers/screenManager';
import uiManager from "./ui/managers/UIManager";
import launchPageHTML from './ui/pages/launchPage/launchPageString';
import setUpPageHTML from './ui/pages/setUpPage/setUpPageString';

const DEV_MODE = true;
const PAGE = 'setup';

startApp();
document.addEventListener('DOMContentLoaded', () => {
  if (DEV_MODE) {
    const ROUTER = {
        'launch': { page: launchPageHTML, loaded: 'Launch Page Loaded' },
        'setup': { page: setUpPageHTML, loaded: 'Set Up Page Loaded' },
    };

    if (!PAGE || !ROUTER[PAGE]) {
        eventHub.emit({ name: 'App Started', type: 'Core' }, {});
        return;
    }

    screenManager.renderScreen(ROUTER[PAGE]);

    return;
  }

  // Otherwise bootstrap the actual app flow
  eventHub.emit({ name: 'App Started', type: 'Core' }, {});
});
