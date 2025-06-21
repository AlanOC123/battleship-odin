import RULES from '../data/ship/rules';
import responseFactory from '../../factories/response';
import DATA from '../data/ship/data';
import helpers from './fleetHelpers';

const allCoordsPlaced = (numPlaced, health) => numPlaced === health;
const checkIfSunk = (hits, health, condition) => hits === health && condition === 0;
const calculateCondition = (hits, health) => Math.floor(100 - ((hits / health) * 100));
const getConfigurationData = () => helpers.buildShipConfigData(DATA);
const checkIfHit = (coord, placements) => placements.has(coord);

const resolveShipStatus = (currState) => {
    for (const { rule, resolve } of RULES.STATUS_RULES) {
        if (rule(currState)) {
            return resolve.label;
        };
    }

    return false;
}

const resolveOrientation = (key = 'X') => RULES.ORIENTATION_RULES[key];

const buildShipPart = (part) => {
    if (!part || typeof part !== 'object') {
        return responseFactory.errorResponse(
            { builtPart: null },
            'invalid part',
            'error'
        )
    }

    const { name, description, index, bounds } = part;

    if (!name || !description || Number.isNaN(index) || typeof bounds !== 'object') {
        return responseFactory.errorResponse(
            { builtPart: null },
            'invalid part',
            'error'
        )
    }

    const builtPart = { name, description, index, bounds }

    return responseFactory.successResponse(
        { builtPart },
        'ship part created',
        'info'
    )
}

const buildShipConfig = (configData) => {
    if (!configData || typeof configData !== 'object') {
        return responseFactory.errorResponse(
            { builtConfig: null },
            'invalid configuration',
            'error'
        )
    }

    const { id, name, health, sprite, parts } = configData;

    if (!id || !name || Number.isNaN(health) || !sprite || !Array.isArray(parts)) {
        return responseFactory.errorResponse(
            { builtConfig: null },
            'invalid configuration',
            'error'
        )
    }

    const builtConfig = { id, name, health, sprite, parts };

    return responseFactory.successResponse(
        { builtConfig },
        'ship part created',
        'info'
    )
};


export default {
    getConfigurationData,
    checkIfHit,
    buildShipPart,
    buildShipConfig,
    allCoordsPlaced,
    checkIfSunk,
    calculateCondition,
    resolveShipStatus,
    resolveOrientation,
}
