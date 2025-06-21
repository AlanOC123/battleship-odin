import GLOBAL_NAMES from '../../data/shared/names';
import helpers from '../utils/fleetHelpers';
import responseFactory from '../../factories/response';
import withSafeResponse from '../../factories/withSafeResponse';
import DATA from '../data/ship/data';

const FACTORY_NAME = GLOBAL_NAMES.FACTORY_NAMES.FLEET;

const createFleet = (ownerID) => {

    const _BASE_DATA = {
        fleet: null,
        size: null,
        allShipsPlaced: false,
        allShipsSunk: false,
        shipsPlaced: 0,
        shipsRemaining: 0,
        selectedShip: null,
        shipIDs: null,
    }

    let _FLEET_DATA = {
        ..._BASE_DATA,
        init: false,
        owner: null,
    }

    const _initFleet = (owner) => {
        if (!owner || typeof owner !== 'string') {
            return responseFactory.errorResponse(
                { init: _FLEET_DATA.init, owner: _FLEET_DATA.owner },
                `${FACTORY_NAME} invalid owner`,
                'error'
            )
        }

        const builtFleetRes = helpers.getFleet(DATA, 5);

        if (builtFleetRes.error) {
            return responseFactory.errorResponse(
                { ...builtFleetRes.result },
                `${FACTORY_NAME} ${builtFleetRes.message}`,
                builtFleetRes.kind,
                builtFleetRes?.exception,
            )
        }

        const fleetMap = builtFleetRes.result.fleetMap;
        const fleetSize = builtFleetRes.result.fleetSize;
        const successfulBuilds = builtFleetRes.result.successfulBuilds;
        const shipIDs = builtFleetRes.result.shipIDs;

        if (fleetSize !== successfulBuilds) {
            return responseFactory.errorResponse(
                { ...builtFleetRes.result },
                `${FACTORY_NAME} ${builtFleetRes.message}`,
                builtFleetRes.kind,
                builtFleetRes?.exception,
            )
        }

        _FLEET_DATA.owner = owner;
        _FLEET_DATA.fleet = fleetMap;
        _FLEET_DATA.size = fleetSize;
        _FLEET_DATA.shipIDs = shipIDs;
        _FLEET_DATA.shipsRemaining = successfulBuilds;
        _FLEET_DATA.init = true;

        return responseFactory.successResponse(
            { init: _FLEET_DATA.init, owner: _FLEET_DATA.owner },
            'successfully initalised fleet',
            'info'
        )
    }

    const _getShipFromFleet = (id) => {
        if (!id || typeof id !== 'string') {
            return responseFactory.errorResponse(
                { id, options: _FLEET_DATA.shipIDs },
                `${FACTORY_NAME} invalid id`,
                'warn'
            )
        }

        const ship = helpers.getShip(_FLEET_DATA.fleet, _FLEET_DATA.shipIDs, id);

        if (!ship) {
            return responseFactory.errorResponse(
                { id, options: _FLEET_DATA.shipIDs, found: ship },
                `${FACTORY_NAME} invalid id. Ship not found`,
                'warn'
            )
        }

        return responseFactory.successResponse(
            { id, ship },
            'found ship',
            'info'
        )
    }

    const _selectShip = (id) => {
        if (!id) {
            return responseFactory.errorResponse(
                { id: null, selectedShip: null },
                `${FACTORY_NAME} invalid ship id`,
                'error'
            )
        }

        const selectedShip = helpers.getShip(_FLEET_DATA.fleet, _FLEET_DATA.shipIDs, id);

        if (!selectedShip) {
            return responseFactory.errorResponse(
                { id, options: _FLEET_DATA.shipIDs, selectedShip: null },
                `${FACTORY_NAME} ship not found`,
                'warn'
            )
        }

        _FLEET_DATA.selectedShip = selectedShip.getID();
        const isPlaced = selectedShip.getIsPlaced();

        return responseFactory.successResponse(
            { selectedShip: _FLEET_DATA.selectedShip, isPlaced },
            'ship selected',
            'info'
        )
    }

    const _placeShip = (coords) => {
        const selectedShip = _FLEET_DATA.selectedShip;

        if (!selectedShip) {
            return responseFactory.errorResponse(
                { selectedShip, },
                `${FACTORY_NAME} no ship selected`,
                'warn'
            )
        }

        const ship = helpers.getShip(_FLEET_DATA.fleet, _FLEET_DATA.shipIDs, _FLEET_DATA.selectedShip);

        if (!ship) {
            return responseFactory.errorResponse(
                { ship, selectedShip },
                `${FACTORY_NAME} ship not found`,
                'error'
            )
        }

        const placedResponse = ship.placeShip(coords);

        if (placedResponse.error) {
            return responseFactory.errorResponse(
                { ship, ...placedResponse.result },
                `${FACTORY_NAME} error setting coord. ${placedResponse.message}`,
                placedResponse.kind,
            )
        }

        const placedShips = Array.from(_FLEET_DATA.fleet.values()).filter(ship => ship.getIsPlaced()).length;
        const allShipsPlaced = helpers.allShipsPlaced(placedShips, _FLEET_DATA.size);
        const placedCoords = placedResponse.result.placedCoords;

        _FLEET_DATA.shipsPlaced = placedShips;
        _FLEET_DATA.allShipsPlaced = allShipsPlaced;

        return responseFactory.successResponse(
            { placedCoords, placedShips: _FLEET_DATA.shipsPlaced, allShipsPlaced: _FLEET_DATA.allShipsPlaced },
            `successfully placed the ${ship.getID()}`,
            'info'
        )
    };

    const _attackShip = (id, coord) => {
        let isSunk = false;
        let allShipsSunk = false;
        let sunkShips = null;
        let remainingShips = null;

        if (!id || typeof coord !== 'number' || coord < 0) {
            return responseFactory.errorResponse(
                { id, coord, remainingShips: _FLEET_DATA.shipsRemaining },
                `${FACTORY_NAME} invalid id or coord`,
                'error'
            )
        }

        const ship = helpers.getShip(_FLEET_DATA.fleet, _FLEET_DATA.shipIDs, id);

        if (!ship) {
            return responseFactory.errorResponse(
                { id, options: _FLEET_DATA.shipIDs, found: ship },
                `${FACTORY_NAME} invalid id. Ship not found`,
                'error'
            )
        }

        const attackResponse = ship.receiveHit(coord);

        if (attackResponse.error) {
            return responseFactory.errorResponse(
                { ...attackResponse.result },
                `${FACTORY_NAME} ${attackResponse.message}`,
                attackResponse.kind
            )
        }

        isSunk = attackResponse.result.isSunk;

        if (isSunk) {
            const allShips = Array.from(_FLEET_DATA.fleet.values())
            sunkShips = allShips.filter(ship => ship.getIsSunk());
            remainingShips = _FLEET_DATA.size - sunkShips.length;
            _FLEET_DATA.shipsRemaining = remainingShips;
            allShipsSunk = helpers.allShipsSunk(_FLEET_DATA.shipsRemaining);
        }

        _FLEET_DATA.allShipsSunk = allShipsSunk;

        return responseFactory.successResponse(
            {
                id,
                coord,
                isSunk, allShipsSunk: _FLEET_DATA.allShipsSunk,
                remainingShips: _FLEET_DATA.shipsRemaining,
                sunkShips
            },
            'successful strike on ship',
            'info'
        )
    }

    const _resetFleet = () => {
        const owner = _FLEET_DATA.owner;

        _FLEET_DATA = {
            ..._BASE_DATA,
            init: false,
            owner: owner,
        }

        const resetResponse = _initFleet(owner);

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

    const initResponse = withSafeResponse(_initFleet, ownerID);

    if (initResponse.error) {
        return responseFactory.errorResponse(
            { ...initResponse.result },
            initResponse.message,
            initResponse.kind,
        )
    }

    return {
        getInit: () => _FLEET_DATA.init,
        getOwner: () => _FLEET_DATA.owner,
        getAllShipsPlaced: () => _FLEET_DATA.allShipsPlaced,
        getAllShipsSunk: () => _FLEET_DATA.allShipsSunk,
        selectShip: (id) => withSafeResponse(_selectShip, id),
        placeShip: (coords) => withSafeResponse(_placeShip, coords),
        attackShip: (id, coord) => withSafeResponse(_attackShip, id, coord),
        getShipFromFleet: (id) => withSafeResponse(_getShipFromFleet, id),
        resetFleet: () => withSafeResponse(_resetFleet),
    }
};

export default {
    ...helpers,
    createFleet,
}
