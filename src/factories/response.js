const createResponse = (
    success = false,
    result = {},
    message = null,
    kind = 'info',
    exception = null
) => ({
    success,
    result: { ...result },
    error: !success,
    message,
    kind,
    exception
});

const successResponse = (result = {}, message = null, kind = 'info') =>
    createResponse(true, result, message, kind);

const errorResponse = (result = {}, message = 'Error', kind = "error", exception = null) =>
    createResponse(false, result, message, kind, exception);

export default {
    createResponse,
    successResponse,
    errorResponse
}
