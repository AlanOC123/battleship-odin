const hashCell = (x, y) => {
    if (x === undefined || y === undefined) throw new Error(`Invalid coordinates given. Expect (x, y), Received ${x}, ${y}`);

    if (x === null || y === null) throw new Error(`Invalid coordinates given. Expect (x, y), Received ${x}, ${y}`);

    return `${x}, ${y}`;
}

export { hashCell };
