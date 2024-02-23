const BookService = require("../../services/book-service");

class BookController {
    static async createBook(req, res, next) {
        try {
            const book = await BookService.createBook(req.body, req.file);

            return res.json(book)
        } catch (error) {
            console.error(error)
            next(error)
        }
    }
}

module.exports = BookController