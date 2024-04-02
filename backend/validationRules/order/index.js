const { body } = require("express-validator")
const { isValidObjectId } = require("mongoose")

class ValidationOrderRules {
    static createOrder() {
        return [
            body('products').custom( array => {
                if(!Array.isArray(array) || array.length === 0 ) {
                    throw new Error('products should be the array of objectId')
                }
                
                if(!array.every( id => typeof id === 'string' && isValidObjectId(id))) {
                    throw new Error('Invalid objectId')
                }
                
                return true
            })
        ]
    }
}

module.exports = ValidationOrderRules