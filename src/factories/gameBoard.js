import boardNode from "./boardNode";

export default () => {
    const gameBoardElement = document.querySelector('#gameboard');

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const cell = boardNode(i, j);
            gameBoardElement.appendChild(cell.render());
        }
    };
};
