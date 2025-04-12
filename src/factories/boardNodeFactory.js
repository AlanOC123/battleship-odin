const boardNodeFactory = (x, y) => {
    const coordinates = [x, y];
    let containsShipPart = false;
    let isHit = false;
    let element = null;

    const renderNode = () => {
        const el = document.createElement('div');
        el.className = "w-full h-full bg-blue-400 hover:bg-blue-500 border border-blue-800 rounded-sm transition transform hover:-translate-y-0.5";
        element = el;
    };

    const hasShip = () => containsShipPart;
    const setNodeContainsShipPart = (value = true) => (containsShipPart = value);

    const recieveAttack = () => {
        isHit = true;
        if (element) {
            element.className = containsShipPart ? "bg-red-500" : "bg-gray-400"
        };

        return containsShipPart ? "hit" : "miss";
    }

    return {
        hasShip,
        setNodeContainsShipPart,
        recieveAttack,
        renderNode,
        getCoordinates: () => coordinates,
        getElement: () => element,
        getHitState: () => isHit,
    }
};

export default boardNodeFactory;
