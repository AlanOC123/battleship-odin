export default () => {
    const gameBoardElement = document.querySelector('#gameboard');

    const gridElement = (x, y) => {
        const el = document.createElement('div');
        el.className = "w-full h-full bg-blue-400 hover:bg-blue-500 border border-blue-800 rounded-sm transition transform hover:-translate-y-0.5";
        el.dataset.x = x;
        el.dataset.y = y;
        return el;
    }

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            gameBoardElement.appendChild(gridElement(i, j));
        }
    }
};
