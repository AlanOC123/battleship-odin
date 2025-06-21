import CARRIER_SPRITE from '../../../../public/assets/shipSprites/carrier.png';
import DESTROYER_SPRITE from '../../../../public/assets/shipSprites/destroyer.png';
import CRUISER_SPRITE from '../../../../public/assets/shipSprites/cruiser.png';
import SUBMARINE_SPRITE from '../../../../public/assets/shipSprites/submarine.png';
import PATROL_SPRITE from '../../../../public/assets/shipSprites/patrol.png';

const CARRIER = {
    ID: 'carrier',
    NAME: 'Carrier',
    HEALTH: 5,
    SPRITE: CARRIER_SPRITE,
    PARTS: [
        {
            name: 'Bridge',
            description: 'Command and Control Centre',
            index: 0,
            bounds: { head: true, next: 1, prev: null }
        },
        {
            name: 'Radar Bay',
            description: 'Communication Hub for the Fleet',
            index: 1,
            bounds: { next: 2, prev: 0 }
        },
        {
            name: 'Flight Deck',
            description: 'Central Deck for Aircraft Takeoff and Landing',
            index: 2,
            bounds: { next: 3, prev: 1 }
        },
        {
            name: 'Hanger',
            description: 'Internal Bay for Aircraft Maintenance',
            index: 3,
            bounds: { next: 4, prev: 2 }
        },
        {
            name: 'Engine Room',
            description: 'Core Propulsion System',
            index: 4,
            bounds: { next: null, prev: 3, tail: true }
        },
    ]
}

const DESTROYER = {
    ID: 'destroyer',
    NAME: 'Destroyer',
    HEALTH: 4,
    SPRITE: DESTROYER_SPRITE,
        PARTS: [
            {
                name: 'Bow Gun Deck',
                description: 'Forward Offensive Deck',
                index: 0,
                bounds: { head: true, next: 1, prev: null }
            },
            {
                name: 'Command Bridge',
                description: 'Control Centre for the Ship',
                index: 1,
                bounds: { next: 2, prev: 0 }
            },
            {
                name: 'Torpedo Bay',
                description: 'House for the Torpedo Tubes and Missle Silos',
                index: 2,
                bounds: { next: 3, prev: 1 }
            },
            {
                name: 'Engine Room',
                description: 'House for the Torpedo Tubes and Missle Silos',
                index: 3,
                bounds: { next: null, prev: 2, tail: true }
            },
    ]
}

const CRUISER = {
    ID: 'cruiser',
    NAME: 'Cruiser',
    HEALTH: 3,
    SPRITE: CRUISER_SPRITE,
    PARTS: [
        {
            name: 'Forward Battery',
            description: 'Main Gun Turret and Missle Launcher',
            index: 0,
            bounds: { head: true, next: 1, prev: null }
        },
        {
            name: 'Operations Deck',
            description: 'Central Command and Communications Room',
            index: 1,
            bounds: { next: 2, prev: 0 }
        },
        {
            name: 'Engine Compartment',
            description: 'Critical Propulsion System',
            index: 2,
            bounds: { next: null, prev: 1, tail: true }
        },
    ]
}

const SUBMARINE = {
    ID: 'submarine',
    NAME: 'Submarine',
    HEALTH: 3,
    SPRITE: SUBMARINE_SPRITE,
    PARTS: [
        {
            name: 'Sonar Array',
            description: 'Forward Detection and Targetting System',
            index: 0,
            bounds: { head: true, next: 1, prev: null }
        },
        {
            name: 'Command Centre',
            description: 'Central Command and Navigation Room',
            index: 1,
            bounds: { next: 2, prev: 0 }
        },
        {
            name: 'Reactor Core',
            description: 'Rear Propulsion and Power System',
            index: 2,
            bounds: { next: null, prev: 1, tail: true }
        },
    ]
}

const PATROL = {
    ID: 'patrol',
    NAME: 'Patrol Boat',
    HEALTH: 2,
    SPRITE: PATROL_SPRITE,
    PARTS: [
        {
            name: 'Bridge',
            description: 'Forward Navigation Room',
            index: 0,
            bounds: { head: true, next: 1, prev: null }
        },
        {
            name: 'Engine Compartment',
            description: 'Rear Propulsion System',
            index: 1,
            bounds: { next: null, prev: 0, tail: true }
        },
    ]
}

export default {
    CARRIER_DATA: CARRIER,
    DESTROYER_DATA: DESTROYER,
    CRUISER_DATA: CRUISER,
    SUBMARINE_DATA: SUBMARINE,
    PATROL_DATA: PATROL,
}
