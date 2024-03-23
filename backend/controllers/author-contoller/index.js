const AuthorService = require("../../services/author-service");
const BookService = require("../../services/book-service");

class AuthorController {
    static async createAuthor(req, res, next) {
        try {
            const authorData = await AuthorService.createAuthor(req.body);

            return res.json(authorData);
        } catch (error) {
            next(error);
        }
    }

    static async getOneAuthor(req, res, next) {
        try {
            const {id} = req.params;
            const userId = req?.user?.userId

            const authorData = await AuthorService.getOneAuthor(id);
            const {books} = await BookService.getBooks({author: id}, userId)

            return res.json({...authorData.toObject(), books});
        } catch (error) {
            next(error);

        }
    }

    static async getAuthors(req, res, next) {
        try {
            const authorsData = await AuthorService.getAllAuthors();

            return res.json(authorsData);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = AuthorController;
