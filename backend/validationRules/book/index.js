const { body, check } = require("express-validator");
const { isValidObjectId } = require("mongoose");
const AuthorService = require("../../services/author-service");


class ValidationBookRules {
    static createBook() {
        return [
            body('title', "Invalid 'Title' field").isString().withMessage('Should be a string').notEmpty().withMessage('Should be not empty'),
            body('description', 'Invalid Description').isString().withMessage('Should be a string').notEmpty().withMessage('Should be not empty'),
            body('img', 'Invalid Image').isString().withMessage('Should be a string').notEmpty().withMessage('Should be not empty'),
            body('price', 'Invalid price').isInt().withMessage('Should be a number'),  
            body('price', 'Invalid price').isInt().withMessage('Should be a number'),
            check('author', 'Invalid Author').custom(async (value) => {
                if(!isValidObjectId) {  
                    throw new Error('Invalid ID format');
                }
                
                const author = await AuthorService.getOneAuthor(value);

                if(!author) {
                    throw new Error('The author with this id does not exist');
                }

                return true
            }),
            body('genre', 'Invalid list of gener').isArray({min: 1, max: 15}).withMessage('Invalid type or length'),
        ]
    }
}

module.exports = ValidationBookRules