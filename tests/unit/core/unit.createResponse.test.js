import responseFactory from '../../../src/factories/createResponse';

describe('[Unit] Response Factory', () => {
    const result = {
        arr: [1, 2, 3],
        str: '123',
        int: 123
    }

    describe('Base response', () => {
        it('returns a basic response', () => {
            const res = responseFactory.createResponse(true, result, 'basic response', 'info');
            expect(res).toEqual(expect.objectContaining({
                success: true,
                result: result,
                error: false,
                message: 'basic response',
                kind: 'info',
            }));
        })
    })

    describe('Success response', () => {
        it('returns a successful response', () => {
            const res = responseFactory.successResponse(result, 'successful response', 'info');
            expect(res).toEqual(expect.objectContaining({
                success: true,
                result: result,
                error: false,
                message: 'successful response',
                kind: 'info',
            }));
        });
    });

    describe('Error response', () => {
        it('returns an unsuccessful response', () => {
            const res = responseFactory.errorResponse(null, 'error response', 'error');
            expect(res).toEqual(expect.objectContaining({
                success: false,
                result: {},
                error: true,
                message: 'error response',
                kind: 'error',
            }));
        })
    });
});
