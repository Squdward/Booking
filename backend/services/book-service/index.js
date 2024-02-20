const bookModel = require("../../models/book-model");
const ApiError = require("../../utils/apiError");

class BookService {
    static async createBook(body) {
        const bookData = await bookModel.findOne({title: body.title});

        if(!bookData) {
            throw ApiError.BadRequest('A book like this already exists')
        }

        const book = await bookModel.create(body);

        return book
    } 
}

module.exports = BookService