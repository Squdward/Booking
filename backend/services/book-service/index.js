const { isValidObjectId } = require("mongoose");
const bookModel = require("../../models/book-model");
const ApiError = require("../../utils/apiError");
const FileService = require("../file-service");

class BookService {
    static async createBook(body, file) {
        const bookData = await bookModel.findOne({title: body.title});

        if(bookData) {
            throw ApiError.BadRequest('A book like this already exists')
        }

        const coverLink = FileService.generateLink(file);

        const book = (await bookModel.create({
            ...body,
            img: coverLink,
            genre: body.genre.split(",")
        })).populate();

        return book
    }

    static async getOneBook(id) {
        if(!isValidObjectId(id)) {
            throw ApiError.BadRequest('Incorrect id');

        }
        const bookData = await bookModel.findById(id);

        if(!bookData) {
            throw ApiError.NotFound('Book with this id was not found');
        }

        await bookData.populate('genre')
        await bookData.populate({path: 'author', select: ['fullName', '_id']})

        return bookData
    }
}

module.exports = BookService