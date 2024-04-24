const { body } = require("express-validator")
const { isValidObjectId } = require("mongoose")

class ValidationUserRules {
    static patch() {
        return [
           body('email').optional().isEmail(),
           body('name').optional().trim().isString().isLength({min: '2', max: '16'}),
           body('secondName').optional().trim().isString().isLength({min: '2', max: '16'}),
           body('adres').optional().trim().isString().isLength({min: '6', max: '40'}),
           body('phone').optional().trim().isString().isLength({min: '8', max: '16'}),
        ]
    }
}

module.exports = ValidationUserRules