import shipFactory from "../factories/ship/ship";
import RAW_DATA from "../data/ship/data";
import shipHelpers from "./shipHelpers";
import responseFactory from '../../factories/response';

const getShip = (fleet, ids, id) => ids.includes(id) ? fleet.get(id) : null;

const allShipsPlaced = (shipsPlaced, fleetSize) => shipsPlaced === fleetSize;
const allShipsSunk = (shipsRemaining) => shipsRemaining === 0;

const buildShipConfigData = (rawData) => {
    const processedData = [];

    for (const v of Object.values(rawData)) {
        const parts = v.PARTS;
        const builtPartResponses = parts.map(part => shipHelpers.buildShipPart(part));

        if (builtPartResponses.some(res => res.error)) {
            return responseFactory.errorResponse(
                { shipConfigurations: null, fleetSize: 0 },
                `error building parts. ${builtPartResponses.map(res => res.message)}`,
                'error',
            )
        }

        const builtParts = builtPartResponses.map(res => res.result.builtPart);

        processedData.push({ id: v.ID, name: v.NAME, health: v.HEALTH, sprite: v.SPRITE, parts: builtParts });
    }

    return responseFactory.successResponse(
        { shipConfigurations: processedData, fleetSize: processedData.length },
        'successful build of ship configuration data',
        'info'
    )
}

const getFleet = (rawData, fleetSize) => {
    const fleet = new Map();
    const configResponse = buildShipConfigData(rawData);

    if (configResponse.error) {
        return responseFactory.errorResponse(
            {
                ...configResponse.result,
                fleetMap: fleet,
                fleetSize: fleet.size,
                successfulBuilds: 0,
                unsuccessfulBuilds: fleetSize - successfulBuilds,
            },
            configResponse.message,
            configResponse.kind,
        )
    }

    const processedConfig = configResponse.result.shipConfigurations;

    const shipResponses = processedConfig.map(config => shipFactory.createShip(config));

    if (shipResponses.some(res => res.error)) {
        const errorResponses = shipResponses.result.filter(res => res.error);
        return responseFactory.errorResponse(
            {
                errorResponses,
                fleetMap: fleet,
                fleetSize: fleet.size,
                successfulBuilds: fleetSize - errorResponses.length,
                unsuccessfulBuilds:
                errorResponses.length
            },
            'some ships failed to build',
            'critical'
        )
    }

    shipResponses.forEach(ship => fleet.set(ship.getID(), ship));
    const shipIDs = shipResponses.map(ship => ship.getID());

    return responseFactory.successResponse(
        {
            fleetMap: fleet,
            fleetSize: fleet.size,
            successfulBuilds: fleet.size,
            shipIDs,
        },
        'successfully built fleet from ship configurations',
        'info'
    )
}

export default {
    getShip,
    allShipsPlaced,
    allShipsSunk,
    buildShipConfigData,
    getFleet,
}
