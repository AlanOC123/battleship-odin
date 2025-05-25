import hashCell from '../utils/gameBoard/hashCell';
import battleShipImage from '../../../public/assets/Sea Warfare Set/Battleship/ShipBattleShipHull.png';
import carrierImage from '../../../public/assets/Sea Warfare Set/Carrier/ShipCarrierHull.png';
import destroyerImage from '../../../public/assets/Sea Warfare Set/Destroyer/ShipDestroyerHull.png';
import patrolBoatImage from '../../../public/assets/Sea Warfare Set/PatrolBoat/ShipPatrolHull.png';
import submarineImage from '../../../public/assets/Sea Warfare Set/Submarine/ShipSubMarineHull.png';

const shipFactory = ({ name, length }) => {

    let shipName = name;
    let shipParts = new Set();
    let shipLength = length;
    let isSunk = false;
    let shipSprite = {
        'Battleship': battleShipImage,
        'Carrier': carrierImage,
        'Destroyer': destroyerImage,
        'Patrol Boat': patrolBoatImage,
        'Submarine': submarineImage,
    }[name];

    const setShipCoordinate = (x, y) => {
        if (!x || !y) throw new Error(`Missing x or y coordinate. Received: x:${x}, y:${y}`);
        if (isNaN(x) || isNaN(y)) throw new Error(`Invalid x or y coordinate. Received: x:${x}, y:${y}`);
        if (shipParts.size >= shipLength) throw new Error(`Too many parts given for ship to be valid.`);
        shipParts.add(hashCell(x, y));
    };

    const sinkShip = () => isSunk = true;

    const checkShipStatus = () => {
        if (!shipParts.size) sinkShip();
    };

    const receivedHit = ({ coordinates }) => {
        const { x, y } = coordinates;
        const hashVal = hashCell(x, y);
        if (!shipParts.has(hashVal)) return null;
        shipParts.delete(hashVal);
        checkShipStatus();
    };

    return {
        setShipCoordinate,
        receivedHit,
        getShipName: () => shipName,
        getShipParts: () => Array.from(shipParts.values(), key => [ Number(key.split(',')[0]), Number(key.split(', ')[1]) ]),
        getShipLength: () => shipLength,
        getIsShipSunk: () => isSunk,
        getShipSprite: () => shipSprite,
    }
};

export default shipFactory;
