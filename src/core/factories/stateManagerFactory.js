import safeClone from "../utils/general/safeClone";

const stateManagerFactory = (eventHub, reducerFactory) => {
    let state = {};

    const initialiseState = (keepData = {}) => ({
        isGameLaunched: false,
        isSetUpStarted: false,
        players: [],
        playerCount: null,
        currentPlayerIndex: 0,
        gameType: null,
        gameDifficulty: null,
        isSetUpComplete: false,
        isPlacingShips: false,
        shipCount: null,
        allShipsPlaced: false,
        gameStartedAt: null,
        gameEndedAt: null,
        canStartGame: false,
        isGameInProgress: false,
        moveCount: null,
        gameWinner: null,
        isGameEnded: false,
        ...keepData
    });

    const onAppStart = () => {
        state = initialiseState();
        state.isGameLaunched = true;
    };

    const hasLaunchedGame = () => state.isGameLaunched;
    const hasLaunchedSetUp = () => state.isSetUpStarted;

    const setUpStarted = ({ isSetUpStarted }) => {
        if (!hasLaunchedGame()) throw new Error("Invalid game state, triggered before launch flow");
        if (typeof isSetUpStarted !== 'boolean' || isSetUpStarted === undefined) throw new Error("Invalid data received");
        const val = isSetUpStarted;
        state.isSetUpStarted = val;
    };

    const difficultySelected = ({ value }) => {
        if (!hasLaunchedSetUp()) throw new Error("Invalid game state, set up not triggered");
        if (typeof value !== 'string' || ! value) throw new Error("Invalid value given");
        if (!['Easy', 'Medium', 'Hard'].includes(value)) throw new Error("Invalid difficulty selected");
        const val = value;
        state.gameDifficulty = val;
    };

    const gameTypeSelected = ({ value }) => {
        if (!hasLaunchedSetUp()) throw new Error("Invalid game state, set up not triggered");
        if (typeof value !== 'string' || ! value) throw new Error("Invalid value given");
        if (!['PvE'].includes(value)) throw new Error("Invalid Game Type selected");
        const val = value;
        state.gameType = val;
    };

    const onAppRestart = () => {
        const {
            isGameLaunched,
            players,
            playerCount,
            gameType,
            gameDifficulty,
            isSetUpComplete,
            shipCount,
        } = state;

        state = initialiseState({
            isGameLaunched,
            players,
            playerCount,
            gameType,
            gameDifficulty,
            isSetUpComplete,
            shipCount,
        });
        eventHub.emit({ name: 'State Changed', type: 'core', src: 'StateMnger' });
    };

    const eventStructure = [
        [ 'App Started', [ onAppStart ] ],
        [ 'App Restarted', [ onAppRestart ] ],
        [ 'Set Up Started', [ setUpStarted ] ],
        [ 'Difficulty Selected', [ difficultySelected ] ],
        [ 'Game Type Selected', [ gameTypeSelected ] ],
    ];

    const reducer = reducerFactory(eventStructure);

    const handleEvent = (evName, payload) => {
        const newState = reducer.dispatchHandler(evName, payload);
        state = {  ...state, ...newState };
        eventHub.emit({ name: 'State Changed', type: 'core', src: 'StateMnger' }, { updatedState: safeClone(state) });
    };

    const initEvents = () => {
        const addEventsToHub = (eventName) => {
            if (!eventName || typeof eventName !== 'string') throw new Error("Invalid event name", eventName);
            eventHub.on(eventName, (payload) => handleEvent(eventName, payload));
        };

        eventStructure.forEach(([e, _]) => addEventsToHub(e));
    }

    initEvents();
};

export default stateManagerFactory;
