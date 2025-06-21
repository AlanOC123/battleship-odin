const STATUS_RULES = [
    {
        rule: ({ isInHarbour }) => isInHarbour,
        resolve: { label: 'In Harbour', stage: 0 },
    },
    {
        rule: ({ isPlaced }) => isPlaced,
        resolve: { label: 'Ship Placed', stage: 1 },
    },
    {
        rule: ({ isBattleReady }) => isBattleReady,
        resolve: { label: 'Battle Ready', stage: 2 },
    },
    {
        rule: ({ isSunk }) => isSunk,
        resolve: { label: 'Is Sunk', stage: 3 },
    },
    {
        rule: ({ condition }) => condition >= 79 && condition < 100,
        resolve: { label: 'Light Damage', stage: 4 }
    },
    {
        rule: ({ condition }) => condition >= 49,
        resolve: { label: 'Moderate Damage', stage: 5 }
    },
    {
        rule: ({ condition }) => condition >= 19,
        resolve: { label: 'Heavy Damage', stage: 6 }
    },
    {
        rule: ({ condition }) => condition >= 1,
        resolve: { label: 'Critical Damage', stage: 7 }
    },
]

const ORIENTATION_RULES = {
    'X': 10,
    'Y': 1,
}

export default {
    STATUS_RULES,
    ORIENTATION_RULES
}
