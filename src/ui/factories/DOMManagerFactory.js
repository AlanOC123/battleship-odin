const DOMControllerFactory = () => {
    const root = document.getElementById('app');

    const getLaunchPageElements = () => {
        const launchGameBtn = document.getElementById('launch-game');

        return {
            launchGameBtn
        };
    };

    const getSetupPageElements = () => {
        const playerName = document.getElementById('player-name');
        const aiName = document.getElementById('ai-name');
        const difficultyBtns = [...document.querySelectorAll('.difficulty-btn')];
        const gameTypeBtns = [ ...document.querySelectorAll('.game-type-btn') ];
        const startBtn = document.getElementById('start-game');
        const cancelBtn = document.getElementById('return-to-launch');

        return {
            inputs: {
                playerName,
                aiName
            },
            difficultyOptions: {
                easy: difficultyBtns.find(btn => btn.textContent === 'Easy'),
                medium: difficultyBtns.find(btn => btn.textContent === 'Medium'),
                hard: difficultyBtns.find(btn => btn.textContent === 'Hard'),
                all: difficultyBtns,
            },
            gameTypeBtns: {
                PVE: difficultyBtns.find(btn => btn.textContent === '')
            }
            playerNameInput,
            aiNameInput,
            difficultyBtns,
            gameTypeBtns,
            startBtn,
            cancelBtn,
        };
    }

    return {
        getLaunchPageElements,
        getSetupPageElements,
    }
}
