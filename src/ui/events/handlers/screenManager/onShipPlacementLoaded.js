import shipFactory from "../../../../core/factories/shipFactory";

const onShipPlacementLoaded = () => {
    const GAME_BOARD = document.getElementById('gameboard');
    if (!GAME_BOARD) throw new Error("Game Board not rendered");

    const cellNode = (x, y) => {
        const element = document.createElement('div');
        element.className = `
            cell
            bg-slate-300
            border border-slate-400
            rounded-sm
            hover:bg-blue-200
            transition-all duration-150
        `.trim();

        element.dataset['x'] = x;
        element.dataset['y'] = y;

        element.setAttribute('droppable', 'true');

        element.addEventListener('dragover', e => e.preventDefault());

        element.addEventListener('drop', (e) => {
            e.preventDefault();

            const name = e.dataTransfer.getData('name');
            const length = e.dataTransfer.getData('length');
            const sprite = e.dataTransfer.getData('sprite');
            console.log(sprite);
            const orientation = 'horizontal';

            const dropX = Number(element.dataset.x);
            const dropY = Number(element.dataset.y);

            for (let i = 0; i < length; i++) {
                const dx = orientation === 'horizontal' ? dropX + i : dropX;
                const dy = orientation === 'horizontal' ? dropY : dropY + i;

                const cellSelector = `.cell[data-x="${dx}"][data-y="${dy}"]`;
                const targetCell = document.querySelector(cellSelector);
                if (!targetCell) continue;

                targetCell.style.backgroundImage = `url(${sprite})`;
                targetCell.style.backgroundSize = 'cover';
                targetCell.style.backgroundRepeat = 'no-repeat';
                targetCell.classList.add('has-ship');
            }
        })

        return element;
    };

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            GAME_BOARD.append(cellNode(j, i));
        };
    };

    const shipList = [
        { name: 'Battleship', length: 3 },
        { name: 'Carrier', length: 4 },
        { name: 'Destroyer', length: 3 },
        { name: 'Patrol Boat', length: 2 },
        { name: 'Submarine', length: 2 },
    ]

    const shipYard = shipList.map(def => shipFactory(def));

    const createShipElement = (sprite, name, length) => {
        const shipEl = document.createElement('div');
        shipEl.className = 'draggable-ship w-40 h-10 bg-contain bg-no-repeat cursor-grab';
        shipEl.setAttribute('draggable', 'true');
        shipEl.style.backgroundImage = `url(${sprite})`;

        shipEl.addEventListener('dragstart', e => {
            e.dataTransfer.setData('name', name);
            e.dataTransfer.setData('length', length);
            e.dataTransfer.setData('sprite', sprite);
        });

        return shipEl;
    };

    shipYard.forEach(ship => {
        const name = ship.getShipName();
        const length = ship.getShipLength();
        const sprite = ship.getShipSprite();
        const shipElement = createShipElement(sprite, name, length);
        GAME_BOARD.append(shipElement);
    })

};

export default onShipPlacementLoaded;
