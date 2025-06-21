import GLOBAL_NAMES from '../../src/data/shared/names.js';
import EVENT_KEYS from '../../src/data/events/keys.js';
import eventHub from '../../src/events/hub';
import state from '../../src/core/singletons/state';
import playerRegistry from '../../src/core/singletons/playerRegistry';
import { mockNames } from '../__mocks__/mock.playerRegistry.js';

const MODULE_NAME = GLOBAL_NAMES.MODULE_NAMES.TEST_SUITE;

jest.mock('../../src/core/singletons/state', () => {
  const store = {};
  return {
    setState: jest.fn((key, val) => { store[key] = val }),
    getState: jest.fn((key) => store[key]),
    __store: store,
  };
});

describe('[Integration] Player Registry - startApp', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('responds to start-app event and sets initial player state', () => {
    const message = eventHub.createMessage(
      EVENT_KEYS.START_APP,
      MODULE_NAME,
      { isLaunched: true }
    );

    eventHub.emitMessage(message);

    expect(state.setState).toHaveBeenCalledWith(
      'playerData',
      expect.objectContaining({
        players: [],
        numPlayers: 0,
        activePlayerID: null,
      })
    );
  });
});

describe('[Integration] Player Registry - updatePlayerTurn', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    playerRegistry.clearRegistry();
    playerRegistry.addPlayer(mockNames.alpha);
    playerRegistry.addPlayer(mockNames.beta);
  });

  it('sets activePlayerID via update-player-turn event', () => {
    const msg = eventHub.createMessage(
      EVENT_KEYS.UPDATE_PLAYER_TURN,
      MODULE_NAME,
      { moveCount: 1 }
    );

    eventHub.emitMessage(msg);

    const players = playerRegistry.getAllPlayers();
    const expectedID = players[1].id;

    const active = playerRegistry.getActivePlayer();

    expect(active?.getID()).toBe(expectedID);
    expect(active?.getName()).toBe(mockNames.beta);
  });
});

describe('[Integration] Player Registry - resetState', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    playerRegistry.clearRegistry();
    playerRegistry.addPlayer(mockNames.alpha);
    playerRegistry.addPlayer(mockNames.beta);
  });

  it('clears the registry and resets state via reset-state event', () => {
    const playersBefore = playerRegistry.getAllPlayers();
    expect(playersBefore).toHaveLength(2);

    const msg = eventHub.createMessage(
      EVENT_KEYS.STATE_RESET,
      MODULE_NAME,
      { props: {} }
    );
    eventHub.emitMessage(msg);

    const playersAfter = playerRegistry.getAllPlayers();
    const activePlayer = playerRegistry.getActivePlayer();

    expect(playersAfter).toHaveLength(0);
    expect(activePlayer).toBe(null);
  });
});
