const hashBoardNode = (x, y) => {
    if (isNaN(x) || isNaN(y)) throw new Error(`Invalid coordinates given. Expect (x, y), Received ${x}, ${y}`);
    if (x < 0 || y < 0) throw new Error(`Coordinates must be positive. Received ${x}, ${y}`);
    return x * 10 + y;
};

export default hashBoardNode;
