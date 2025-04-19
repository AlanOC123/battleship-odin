import timeStampFactory from "../../src/factories/timeStampFactory";

describe('Time Stamp', () => {
    it('Creates a valid time stamp', () => {
        expect(() => timeStampFactory('Game Started', { isSetUp: true })).not.toThrow();
        expect(() => timeStampFactory(123, { isSetUp: true })).toThrow();
        expect(() => {
            timeStampFactory('Game Started', { isSetUp: true }).toEqual(expect.objectContaining({
                event: expect.any(String),
                state: expect.any(Object),
                time: expect.any(String),
            }));
        })
    })
})
