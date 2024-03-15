const { body } = require("express-validator");
const { isValidObjectId } = require("mongoose");

class ValidationCartRules {
    static AddToCart() {
        return [
            body('id').custom( (value) => {
                if(!isValidObjectId(value)) {
                    throw new Error('Invalid ObjectId value')
                }
                
                return true
            }),
            body("quantity").isFloat().withMessage('Should be a Number')
        ]
    }
}

module.exports = ValidationCartRules