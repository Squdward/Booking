const { body } = require("express-validator");


class ValidationGenreRules {
    static createGenre() {
        return [
            body('title', 'Invalid title').isString().withMessage('Should be a string').notEmpty().withMessage('Should be not empty'),
        ]
    }
}

module.exports = ValidationGenreRules