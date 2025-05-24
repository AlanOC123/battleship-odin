const setUpStarted = ({ isSetUpStarted }) => {
    if (typeof isSetUpStarted !== 'boolean' || isSetUpStarted === undefined) throw new Error("Invalid data received");
    const val = isSetUpStarted;
    return val;
};

export default setUpStarted;
