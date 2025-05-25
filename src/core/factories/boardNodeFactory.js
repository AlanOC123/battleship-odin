import hashCell from '../utils/gameBoard/hashCell';

const boardNodeFactory = (x, y) => {
    const coordinates = [x, y];
    let containsShipPart = false;
    let isHit = false;
    let element = null;
    const edges = new Set();
    const id = hashCell(x, y);

    const hasShip = () => containsShipPart;
    const setNodeContainsShipPart = (value = true) => (containsShipPart = value);
    const addEdge = (node) => {
        if (!node) throw new Error("No node given");
        edges.add(node);
    };

    const receiveAttack = () => {
        isHit = true;
        return containsShipPart ? "hit" : "miss";
    }

    return {
        hasShip,
        setNodeContainsShipPart,
        receiveAttack,
        addEdge,
        getCoordinates: () => coordinates,
        getElement: () => element,
        getHitState: () => isHit,
        getID: () => id,
        getEdges: () => Array.from(edges),
    }
};

export default boardNodeFactory;
