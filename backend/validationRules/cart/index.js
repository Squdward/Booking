const { body } = require("express-validator");
const { isValidObjectId } = require("mongoose");

class ValidationCartRules {
    static AddToCart() {
        return [
            body('id', 'Invalid Author name ').custom( (value) => {
                if(!isValidObjectId(value)) {
                    throw new Error('Invalid ObjectId value')
                }
                
                return true
            }),
            body("quantity", 'Invalida img').isFloat().withMessage('Should be a Number')
        ]
    }
}

module.exports = ValidationCartRules