import GLOBAL_NAMES from '../../../data/shared/names';
import rules from '../../data/ship/rules';
import helpers from '../../utils/shipHelpers';
import responseFactory from '../../../factories/response';
import withSafeResponse from '../../../factories/withSafeResponse';

const FACTORY_NAME = GLOBAL_NAMES.FACTORY_NAMES.SHIP;

const createShip = (config) => {
    const _BASE_DATA = {
        id: null,
        name: null,
        health: null,
        sprite: null,
        parts: null,
        isPlaced: false,
        isSunk: false,
        coords: null,
        orientation: null,
        condition: 100,
        hits: 0,
    }

    let _SHIP_DATA = {
        ..._BASE_DATA,
        init: false,
        config: null,
    };

    const _initShip = (config) => {
        if (!config) {
            return responseFactory.errorResponse(
                { isInit: _SHIP_DATA.init, id: null },
                `${FACTORY_NAME} invalid config`,
                'critical'
            )
        }

        _SHIP_DATA.id = config.id;
        _SHIP_DATA.name = config.name;
        _SHIP_DATA.health = config.health;
        _SHIP_DATA.sprite = config.sprite;
        _SHIP_DATA.parts = config.parts;

        if (!(_SHIP_DATA.id && _SHIP_DATA.name && _SHIP_DATA.health && _SHIP_DATA.sprite && _SHIP_DATA.parts )) {
            return responseFactory.errorResponse(
                { isInit: _SHIP_DATA.init, id: null },
                `${FACTORY_NAME} invalid config`,
                'critical'
            )
        }

        _SHIP_DATA.init = true;
        _SHIP_DATA.coords = new Set();
        _SHIP_DATA.orientation = helpers.resolveOrientation();
        _SHIP_DATA.config = config;


        return responseFactory.successResponse(
            { isInit: _SHIP_DATA.init, id: _SHIP_DATA.id },
            `${_SHIP_DATA.name} built`,
            'info'
        )
    }

    const _placeShip = (coords) => {
        const tempSet = new Set();
        let isPlaced = _SHIP_DATA.isPlaced;
        const overridePlacement = _SHIP_DATA.isPlaced;
        let prevCoords = [];

        if (overridePlacement) {
            prevCoords = Array.from(_SHIP_DATA.coords.values());
        }

        if (!coords) {
            return responseFactory.errorResponse(
                { id: _SHIP_DATA.id, attemptedPlacements: coords },
                `${FACTORY_NAME} no coordinates given`,
                'error'
            )
        }


        if (!helpers.allCoordsPlaced(coords.length, _SHIP_DATA.health)) {
            return responseFactory.errorResponse(
                {
                    id: _SHIP_DATA.id,
                    attemptedPlacements: coords,
                    coordCount: coords.length,
                    required: _SHIP_DATA.health
                },
                'not enough coordinates',
                'error'
            )
        }

        if (coords.some(coord => typeof coord !== 'number')) {
           return responseFactory.errorResponse(
                {
                    id: _SHIP_DATA.id,
                    attemptedPlacements: coords,
                    invalidCoords: coords.filter(coord => typeof coord !== 'number'),
                },
                `${FACTORY_NAME} invalid coordinates`,
                'error'
            )
        }

        if (overridePlacement) {
            _SHIP_DATA.coords = new Set();
        }

        coords.forEach(coord => tempSet.add(coord));

        if (!helpers.allCoordsPlaced(tempSet.size, _SHIP_DATA.health)) {
            return responseFactory.errorResponse(
                { id: _SHIP_DATA.id, placedCoords: null, isPlaced, attemptedPlacements: coords, overridePlacement },
                `${FACTORY_NAME} invalid coordinates`,
                'error'
            )
        }

        isPlaced = true;

        _SHIP_DATA.coords = tempSet;
        _SHIP_DATA.isPlaced = isPlaced;

        return responseFactory.successResponse(
            {
                id: _SHIP_DATA.id,
                placedCoords: Array.from(tempSet.values()),
                attemptedPlacements: coords,
                overridePlacement,
                prevCoords,
            },
            'successfully placed ship',
            'info'
        )
    }

    const _receiveHit = (coord) => {
        let hits = _SHIP_DATA.hits;
        let condition = _SHIP_DATA.condition;
        const health = _SHIP_DATA.health;
        let isSunk = _SHIP_DATA.isSunk;

        if (isSunk) {
            return responseFactory.errorResponse(
                { id: _SHIP_DATA.id, coord, hits, condition, isSunk },
                `${FACTORY_NAME} ship sunk already`,
                'warn'
            )
        }

        if (!helpers.checkIfHit(coord, _SHIP_DATA.coords)) {
            return responseFactory.errorResponse(
                { id: _SHIP_DATA.id, coord, hits, condition },
                `${FACTORY_NAME} coord not part of ship set`,
                'error'
            )
        }

        hits++;
        condition = helpers.calculateCondition(hits, health)

        if (hits < 0 || condition < 0) {
            return responseFactory.errorResponse(
                {
                    id: _SHIP_DATA.id,
                    coord,
                    hits,
                    condition,
                    prevHits: _SHIP_DATA.hits,
                    prevCondition: _SHIP_DATA.condition,
                    isSunk,
                    health,
                },
                `${FACTORY_NAME} received negative value for condition`,
                'error'
            )
        }

        isSunk = helpers.checkIfSunk(hits, health, condition);

        _SHIP_DATA.hits = hits;
        _SHIP_DATA.condition = condition;
        _SHIP_DATA.isSunk = isSunk;

        return responseFactory.successResponse(
            { id: _SHIP_DATA.id, hits: _SHIP_DATA.hits, condition: _SHIP_DATA.condition, isSunk: _SHIP_DATA.isSunk  },
            'landed successful hit on ship',
            'info'
        )
    }

    const _setOrientation = (key) => {
        if (!key || !Object.hasOwn(rules.ORIENTATION_RULES, key)) {
            return responseFactory.errorResponse(
                { key, options: Object.keys(rules.ORIENTATION_RULES) },
                `${FACTORY_NAME} invalid orientation key`,
                'error'
            )
        }

        const value = helpers.resolveOrientation(key);

        if (!value || (value !== 1 && value !== 10)) {
            return responseFactory.errorResponse(
                { key, options: Object.keys(rules.ORIENTATION_RULES), value, },
                `${FACTORY_NAME} invalid orientation value`,
                'error'
            )
        }

        _SHIP_DATA.orientation = value;

        return responseFactory.successResponse(
            { key, value: _SHIP_DATA.orientation },
            `orientation set`,
            'info'
        )
    }

    const _resetShip = () => {
        const config = _SHIP_DATA.config;

        _SHIP_DATA = {
            ..._BASE_DATA,
            init: false,
            config: null,
        }

        const resetResponse = _initShip(config);

        if (resetResponse.error) {
            return responseFactory.errorResponse(
                { ...resetResponse.result },
                resetResponse.message,
                resetResponse.kind,
            )
        }

        return responseFactory.successResponse(
            { ...resetResponse.result },
            resetResponse.message,
            resetResponse.kind,
        );
    }

    const initResponse = withSafeResponse(_initShip, config);

    if (initResponse.error) {
        return responseFactory.errorResponse(
            { ...initResponse.result },
            initResponse.message,
            initResponse.kind,
        )
    }

    return {
        getIsInit: () => _SHIP_DATA.init,
        getID: () => _SHIP_DATA.id,
        getName: () => _SHIP_DATA.name,
        getParts: () => _SHIP_DATA.parts,
        getOrientation: () => _SHIP_DATA.orientation,
        getCondition: () => _SHIP_DATA.condition,
        getPlacement: () => Array.from(_SHIP_DATA.coords.values()),
        getIsPlaced: () => _SHIP_DATA.isPlaced,
        getIsSunk: () => _SHIP_DATA.isSunk,
        placeShip: (coords) => withSafeResponse(_placeShip, coords),
        receiveHit: (coord) => withSafeResponse(_receiveHit, coord),
        setOrientation: (key) => withSafeResponse(_setOrientation, key),
        resetShip: () => withSafeResponse(_resetShip),
    }
}

export default {
    createShip,
    ...helpers
}
