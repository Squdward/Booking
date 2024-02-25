const { body } = require("express-validator");
const { isValidObjectId } = require("mongoose");

class ValidationFavouriteRules {
    static addToFavourite() {
        return [
            body('productId', 'Invalid productId').custom( (value) => {
                if(!isValidObjectId(value)) {
                    throw new Error('Invalid productId value')
                }
                
                return true
            }),
      ]
    }
}

module.exports = ValidationFavouriteRules