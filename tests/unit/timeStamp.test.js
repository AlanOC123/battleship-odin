import timeStamp from "../../src/factories/timeStamp";

describe('Time Stamp', () => {
    it('Creates a valid time stamp', () => {
        expect(() => timeStamp('Game Started', { isSetUp: true })).not.toThrow();
        expect(() => timeStamp(123, { isSetUp: true })).toThrow();
        expect(() => {
            timeStamp('Game Started', { isSetUp: true }).toEqual(expect.objectContaining({
                event: expect.any(String),
                state: expect.any(Object),
                time: expect.any(String),
            }));
        })
    })
})
