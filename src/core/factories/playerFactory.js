import createFleet from "../utils/general/createFleet";
import gameBoardFactory from "./gameBoardFactory";
import hashPlayerID from "../logic/hashPlayerID";

const playerFactory = (playerName, isAIPlayer = false) => {
    const name = playerName;
    const isAI = isAIPlayer;
    const id = hashPlayerID(name);
    const createdAt = new Date();
    let fleet = createFleet();
    let fleetSize = fleet.length;
    const shipsSunk = [];

    const getShipLostMetaData = (ship) => {
        const timeSunk = Date.now();
        const timeActive = Math.floor((timeSunk - createdAt.getTime()) / 1000);
        const name = ship.getName();
        const isFirst = !shipsSunk.length;
        return {
            name,
            timeActive,
            isFirst
        };
    };

    const shipLost = ({ owner }) => {
        if (id !== owner) return 'Not my ship';
        const lastShipLost = fleet.find(ship => ship.getIsSunk());
        if (!lastShipLost) return 'Nothing lost';

        fleet = fleet.filter(ship => !ship.getIsSunk());
        fleetSize = fleet.length;

        const metaData = getShipLostMetaData(lastShipLost);
        shipsSunk.push(metaData)
    };

    return {
        getName: () => name,
        getIsAI: () => isAI,
        getID: () => id,
        getCreatedAt: () => createdAt.toISOString(),
        getFleet: () => Array.from(fleet),
        getShipsLeft: () => fleetSize,
        getShipsLost: () => Array.from(shipsSunk),
        shipLost,
    }
};

export default playerFactory;
