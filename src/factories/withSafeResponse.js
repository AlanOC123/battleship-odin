import errorModule from '../error';
import responseFactory from './response';

const withSafeResponse = (callback, ...values) => {
    try {
        const response = callback(...values);

        if (response.error) {
            return errorModule.handleResponse(response)
        }

        return response;
    } catch (err) {
        return responseFactory.errorResponse(
            {},
            `Unhandled exception: ${err.message}`,
            'critical',
            err,
        );
    };
}

export default withSafeResponse;
