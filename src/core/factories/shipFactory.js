const shipFactory = ({ name, length, id }) => {
    const shipName = name;
    const shipLength = length;
    const owner = id;

    let timesHit = 0;
    let isSunk = false;
    let isFound = false;
    let orientation = 'X';
    let coordinates = new Map();

    const setIsFound = (state = true) => isFound = state;
    const sinkShip = () => isSunk = true;

    const addCoordinate = ({ nodeID, position }) => {
        if (!nodeID) throw new Error("Invalid node provided");
        if (coordinates.has(nodeID)) throw new Error("Node already present");

        const metaData = {
            isHit: false,
            segment: (position === 1 ? 'Head' : position === shipLength ? 'Tail' : 'Body'),
        }
        coordinates.set(nodeID, metaData);
    };

    const receiveHit = ({ nodeID }) => {
        if (!nodeID) throw new Error("No Node ID Provided");
        const node = coordinates.get(nodeID);
        if (!node) return 'Invalid target';
        if (node.isHit) return 'Already destroyed';

        const isFirstHit = timesHit === 0;
        timesHit += 1;

        if (isFirstHit) setIsFound(true);
        node.isHit = true;

        if (timesHit === shipLength - 1) sinkShip();

        return `${shipName} Hit`;
    };

    const removeCoordinate = (nodeID) => {
        if (coordinates.has(nodeID)) coordinates.delete(nodeID);
    };

    const switchAxis = () => orientation = orientation === 'X' ? 'Y' : 'X';

    const resetShip = () => {
        timesHit = 0;
        isSunk = false;
        isFound = false;
        orientation = 'X';
        coordinates = new Map();
    }

    return {
        getName: () => shipName,
        getLength: () => shipLength,
        getOwner: () => owner,
        getTimesHit: () => timesHit,
        getIsSunk: () => isSunk,
        getIsFound: () => isFound,
        getAxis: () => orientation,
        getCoordinates: () => Array.from(coordinates.keys()),
        getSegments: () => Array.from(coordinates.entries()),
        addCoordinate,
        removeCoordinate,
        switchAxis,
        receiveHit,
        resetShip,
    }
};

export default shipFactory;
