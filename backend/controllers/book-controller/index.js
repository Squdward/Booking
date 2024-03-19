const BookService = require("../../services/book-service");

class BookController {
    static async createBook(req, res, next) {
        try {
            const book = await BookService.createBook(req.body, req.file);

            return res.json(book);
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    static async getBooks(req, res, next) {
        try {
            const params = req.query;

            const books = await BookService.getBooks(params);
            
            return res.json(books)
        } catch (error) {
            console.error(error);
            next(error)
        }
    }

    static async getBook(req, res, next) {
        try {
            const {id} = req.params;
            const userId = req?.user?.userId

            const book = await BookService.getOneBook(id, userId);

            return res.json(book)
        } catch (error) {
            console.error(error);
            next(error)
        }
    }
}

module.exports = BookController;
