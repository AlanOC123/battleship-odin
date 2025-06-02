const EVENT_NAMES = {
    CORE: {
        START_APP: {
            KEY: 'start-app',
            SCHEMA: {
                key: 'string',
                action: 'string',
                data: 'object',
            },
            TYPE: 'unique',
            FAMILY: 'core',
        },
        APP_STARTED: {
            KEY: 'app-started',
            SCHEMA: {},
            TYPE: 'unique',
            FAMILY: 'core',
        },
        REQUEST_STATE_COPY: {
            KEY: 'request-state-copy',
            SCHEMA: {},
            TYPE: 'generic',
            FAMILY: 'core',
        },
        STATE_COPY_SENT: {
            KEY: 'state-copy-sent',
            SCHEMA: {},
            TYPE: 'generic',
            FAMILY: 'core',
        },
        CREATE_PLAYER: {
            KEY: 'create-player',
            SCHEMA: {
                name: 'string'
            },
            TYPE: 'generic',
            FAMILY: 'core',
        },
        REQUEST_DEBUG_STATE: {
            KEY: 'request-debug-state',
            SCHEMA: {
                key: 'string',
            },
            TYPE: 'generic',
            FAMILY: 'core',
        },
        DEBUG_STATE_SENT: {
            KEY: 'debug-state-sent',
            SCHEMA: {
                version: 'string',
                id: 'string',
            },
            TYPE: 'generic',
            FAMILY: 'core',
        }
    },
    UI: {
        PAGE_LOADED: {
            KEY: 'page-loaded',
            SCHEMA: {
                html: 'string'
            },
            TYPE: 'generic',
            FAMILY: 'ui',
        }
    },
    TEST: {
        MOCK_EVENT: {
            KEY: 'mock-event',
            SCHEMA: {
                foo: 'string',
                bar: 'number'
            },
            TYPE: 'generic',
            FAMILY: 'test'
        },
    },
};

export default EVENT_NAMES;
