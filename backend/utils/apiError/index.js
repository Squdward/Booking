module.exports = class ApiError extends Error {
    status;
    errors;

    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError(message) {
        return new ApiError(401, message)
    }

    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors);
    }
    
    static NotFound(message) {
        return new ApiError(404, message)
    }

    static ServerError(message) {
        return new ApiError(500, message)
    }
}