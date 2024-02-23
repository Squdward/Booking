const AuthorService = require("../../services/author-service");

class AuthorController {
    static async createAuthor(req, res, next) {
        try {
            const authorData = await AuthorService.createAuthor(req.body);

            return res.json(authorData)
        } catch (error) {
            next(error)
        }
    }

    static async getOneAuthor() {
        try {

        } catch (error) {

        }
    }

    static async getAuthors(req, res, next) {
        try {
            const authorsData = await AuthorService.getAllAuthors();

            return res.json(authorsData)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = AuthorController