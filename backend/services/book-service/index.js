const { isValidObjectId } = require("mongoose");
const bookModel = require("../../models/book-model");
const ApiError = require("../../utils/apiError");
const FileService = require("../file-service");
const deepmerge = require("../../utils/deepmerge")
class BookService {
    static async createBook(body, file) {
        const bookData = await bookModel.findOne({ title: body.title });

        if (bookData) {
            throw ApiError.BadRequest("A book like this already exists");
        }

        const coverLink = FileService.generateLink(file);

        const book = (
            await bookModel.create({
                ...body,
                img: coverLink,
                genre: body.genre.split(","),
            })
        ).populate();

        return book;
    }

    static async getOneBook(id) {
        if (!isValidObjectId(id)) {
            throw ApiError.BadRequest("Incorrect id");
        }
        const bookData = bookModel.findById(id);

        const populatedData = await BookService._populateBooks(bookData);

        if (!populatedData) {
            throw ApiError.NotFound("Book with this id was not found");
        }

        return populatedData;
    }

    static async getBooks(params) {
        const query = BookService._generateQueryFilter(params);

        const booksQuery = bookModel.find(query);

        const booksData = await BookService._populateBooks(booksQuery)

        return booksData;
    }

    static _generateQueryFilter(params) {
        const filterRules = {
            author: {
                key: "author",
                condition: (value) => ({ author: value }),
            },
            title: {
                key: "title",
                condition: (value) => ({title: { $regex: value, $options: "i" }}),
            },
            minPrice: {
                key: "price",
                condition: (value) => ({ price: { $gte: value } }),
            },
            maxPrice: {
                key: "price",
                condition: (value) => ({ price: { $lte: value } }),
            },
            genre: {
                key: "genre",
                condition: (value) => ( typeof value === 'string' ? {genre: { $in: [value] }} : {genre: { $all: value }}),
            },
        };

        const query = {};

        for (let key in filterRules) {
            const filter = filterRules[key];
    
            if (params[key]) {
                if (query.hasOwnProperty(filter.key)) {
                  deepmerge(query, filter.condition(params[key]))
                } else {
                  Object.assign(query, filter.condition(params[key]))
                }
            }
        }
        return query
    }

    static async  _populateBooks(MongoQuery) {
        const populatedData = await MongoQuery.populate('genre').populate({path: 'author', select: ['fullName', '_id']}).exec()

        return populatedData
    }
}

module.exports = BookService;
