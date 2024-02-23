const { body, check } = require("express-validator");
const { isValidObjectId } = require("mongoose");
const AuthorService = require("../../services/author-service");
const GenreService = require("../../services/genre-service");


class ValidationBookRules {
    static createBook() {
        return [
            body('title', "Invalid 'Title' field").isString().withMessage('Should be a string').notEmpty().withMessage('Should be not empty'),
            body('description', 'Invalid Description').isString().withMessage('Should be a string').notEmpty().withMessage('Should be not empty'),
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
            body('genre').custom( async (value) => {
                const array = value.split(",")
                if (!array.every( id => isValidObjectId(id))) {
                    throw new Error('Invalid ObjectId');
                  }

                  const genreData = await GenreService.findAllGenre(array);

                  if(!genreData || genreData.length !== array.length) {
                    throw new Error('The genre with this id(s) does not exist');
                  }

                return true
            }) 
        ]
    }
}

module.exports = ValidationBookRules