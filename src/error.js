let _CALLER = console;

const setCaller = (customerCaller) => {
    _CALLER = customerCaller && typeof customerCaller.warn === 'function' && customerCaller.error === 'function' ? customerCaller : console;
}

const handleWarning = (response) => {
    _CALLER.warn(response.message);
    return { ...response }
}

const handleRuntimeError = (response) => {
    _CALLER.error(response.message);
    return { ...response };
}

const handleCriticalError = (response) => {
    throw new Error(response.message);
}

const handleResponse = (response) => {;
    if (!response || !response.error) return response;

    switch (response.kind) {
        case 'warn': return handleWarning(response);
        case 'error': return handleRuntimeError(response);
        case 'critical': return handleCriticalError(response);
        default: return handleRuntimeError({
            ...response,
            message: `[Unknown kind: ${response.kind}] ${response.message || ''}`,
        });
    }
}

export default {
    setCaller,
    handleWarning,
    handleRuntimeError,
    handleCriticalError,
    handleResponse,
}
