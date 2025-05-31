import shipFactory from '../../factories/shipFactory';

const fleetMetaData = Object.freeze({
    carrier: Object.freeze({ name: 'Carrier', length: 5 }),
    battleship: Object.freeze({ name: 'Battleship', length: 4 }),
    destroyer: Object.freeze({ name: 'Destroyer', length: 3 }),
    submarine: Object.freeze({ name: 'Submarine', length: 3 }),
    patrol: Object.freeze({ name: 'Patrol Boat', length: 2 }),
});

const createFleet = (id) => {
    const fleet = [];
    Object.values(fleetMetaData).forEach(({ name, length }) => {
        fleet.push(shipFactory({ name, length, id }));
    });
    return fleet;
};

export default createFleet;
