const authorModel = require("../../models/author-model");
const bookModel = require("../../models/book-model");
const ApiError = require("../../utils/apiError");

class AuthorService {
    static async createAuthor(body) {
        const author = await authorModel.create(body);

        return author 
    } 

    static async getOneAuthor(id) {
        const author = await authorModel.findById(id);

        if(!author) {
            throw ApiError.NotFound('Author with this ID was not found ')
        }

        return author
    } 

    static async getAllAuthors(body) {

    } 
        }

module.exports = AuthorService