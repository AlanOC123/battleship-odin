const boardNode = (x, y) => {
    const coordinates = [x, y];
    let containsShipPart = false;
    let isHit = false;


    const render = () => {
        const el = document.createElement('div');
        el.className = "w-full h-full bg-blue-400 hover:bg-blue-500 border border-blue-800 rounded-sm transition transform hover:-translate-y-0.5";
        return el;
    };

    const hasShip = () => containsShipPart;

    const setNodeContainsShipPart = () => containsShipPart = !containsShipPart;

    const updateState = () => {

    };

    return {
        hasShip,
        setNodeContainsShipPart,
        render
    }
};

export default boardNode;
