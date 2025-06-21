import GLOBAL_NAMES from '../../data/shared/names';
import createFleet from './ship/fleet';
import createBoard from '../factories/board/createBoard';

const FACTORY_NAME = GLOBAL_NAMES.FACTORY_NAMES.PLAYER;

const createPlayer = (nameInput, idInput, isAIPlayer = false) => {
    const _PLAYER_DATA = {
        init: false,
        name: nameInput,
        id: idInput,
        isAI: isAIPlayer,
        board: null,
        fleet: null,
    }

    const _initPlayer = () => {

    }

    return {
        getIsInit: () => _PLAYER_DATA.init,
        getName: () => _PLAYER_DATA.name,
        getID: () => _PLAYER_DATA.id,
        getIsAI: () => _PLAYER_DATA.isAI,
    }
};

export default createPlayer;
