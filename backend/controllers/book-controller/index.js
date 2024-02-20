const BookService = require("../../services/book-service");

class BookController {
    static async createBook(req, res, next) {
        try {
            const book = BookService.createBook();

            return res.json(book)
        } catch (error) {
            console.error(error)
            next(error)
        }
    }
}

module.exports = BookController