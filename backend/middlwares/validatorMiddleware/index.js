const { validationResult } = require("express-validator");
const ApiError = require("../../utils/apiError");

const ValidatorMiddleware = (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            throw ApiError.BadRequest(
                "Body fields are invalid",
                errors
                    .formatWith((err) => ({
                        message: err.msg,
                        value: err.value || null,
                        path: err.path,
                    }))
                    .array({ onlyFirstError: true })
            );
        }

        next();
    } catch (error) {
        next(error);
    }
};

module.exports = ValidatorMiddleware;
