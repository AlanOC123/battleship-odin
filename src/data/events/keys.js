import REGISTRY from "../../events/registry";
import EVENT_NAMES from "./names";

export default {
    START_APP: REGISTRY.createEvent(
        EVENT_NAMES.START_APP,
        { isLaunched: 'boolean' },
        'unique',
        'core'
    ),
    STATE_UPDATED: REGISTRY.createEvent(
        EVENT_NAMES.STATE_UPDATED,
        { stateUpdated: 'boolean' },
        'generic',
        'core'
    ),
    STATE_RESET: REGISTRY.createEvent(
        EVENT_NAMES.STATE_RESET,
        { props: 'object' },
        'generic',
        'core'
    ),
    UPDATE_PLAYER_TURN: REGISTRY.createEvent(
        EVENT_NAMES.UPDATE_PLAYER_TURN,
        { moveCount: 'number' },
        'generic',
        'core',
    ),
    CLEAR_PLAYER_REGISTRY: REGISTRY.createEvent(
        EVENT_NAMES.CLEAR_PLAYER_REGISTRY,
        {},
        'generic',
        'core'
    ),
}
