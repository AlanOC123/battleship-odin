const hashCell = (x, y) => {
    if (isNaN(x) || isNaN(y)) throw new Error(`Invalid coordinates given. Expect (x, y), Received ${x}, ${y}`);
    if (x < 0 || y < 0) throw new Error(`Invalid coordinates given. Must be positive. Received ${x}, ${y}`);


    return `${x}, ${y}`;
};

export default hashCell;
