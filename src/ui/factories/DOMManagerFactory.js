import findBtnWithTextContent from '../utils/general/findBtnWithTextContent';
import hashElement from '../utils/domManager/hashElement';

const DOMControllerFactory = () => {
    const root = document.getElementById('app');

    const cache = new Map();

    const getElement = (selector, multiple = false, parent = document) => {
        if (!selector) throw new Error("Invalid selector provided", selector);

        const key = hashElement(selector, multiple);

        if (cache.has(key)) {
            let el = cache.get(key);
            el = multiple ? [ ...el ] : el;
            const isInDOM = multiple ? el.every(node => node.isConnected) : el.isConnected;
            if (isInDOM) return el;
            cache.delete(key);
        };

        const el = multiple ? parent.querySelectorAll(selector) : parent.querySelector(selector);

        if (!el || (multiple && !el.length)) throw new Error(`Element not found ${selector}, el`);

        cache.set(key, el);
        return multiple ? [ ...el ] : el;
    };

    const getLaunchPageElements = () => {
        const launchGameBtn = getElement('#launch-game');

        return {
            start: launchGameBtn
        };
    };

    const getSetupPageElements = () => {
        const playerName = getElement('#player-name');
        const aiName = getElement('#ai-name');
        const difficultyBtns = getElement('.difficulty-btn', true);
        const gameTypeBtns = getElement('.game-type-btn', true);
        const start = getElement('#start-game');
        const cancel = getElement('#return-to-launch');

        return {
            inputs: {
                playerName,
                aiName,
            },
            difficultyOptions: {
                easy: findBtnWithTextContent('Easy', difficultyBtns),
                medium: findBtnWithTextContent('Medium', difficultyBtns),
                hard: findBtnWithTextContent('Hard', difficultyBtns),
            },
            gameTypeOptions: {
                pve: findBtnWithTextContent('PvE', gameTypeBtns),
                pvp: findBtnWithTextContent('PvP (Coming Soon)', gameTypeBtns) || findBtnWithTextContent('PvP', gameTypeBtns),
            },
            gameControls: {
                start,
                cancel,
            },
        };
    }

    return {
        getLaunchPageElements,
        getSetupPageElements,
    }
};

export default DOMControllerFactory;
