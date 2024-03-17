const BookService = require("../../services/book-service")

// И зачем я его создал?)
class SearchController {
    static async search(req, res, next) {
        try {
            const params = req.query;

            const {books} = await BookService.getBooks(params);
            
            res.json(books)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = SearchController