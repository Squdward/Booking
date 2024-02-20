const { body } = require("express-validator");


class ValidationAuthorRules {
    static createAuthor() {
        return [
            body('fullName', 'Invalid Author name ').isString().withMessage('Should be a string').notEmpty().withMessage('Should be not empty'),
            body('description', 'Invalid Author description ').isString().withMessage('Should be a string').notEmpty().withMessage('Should be not empty'),
            body('dateOfBirth', 'Invalid Date').isDate().withMessage('`Should be a date '),
            body('dateOfDeath', 'Invalid Date').optional().isDate().withMessage('`Should be a date '),
            body("img", 'Invalida img').isString().withMessage('Should be a string')
        ]
    }
}

module.exports = ValidationAuthorRules