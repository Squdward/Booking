const { isValidObjectId } = require("mongoose");
const bookModel = require("../../models/book-model");
const ApiError = require("../../utils/apiError");
const FileService = require("../file-service");
const deepmerge = require("../../utils/deepmerge");
const cartModel = require("../../models/cart-model");
const CartService = require("../cart-service");
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

    static async getOneBook(id, userId) {
        if (!isValidObjectId(id)) {
            throw ApiError.BadRequest("Incorrect id");
        }
        const bookData = bookModel.findById(id);

        const populatedData = await BookService._populateQuery(bookData);

        if (!populatedData) {
            throw ApiError.NotFound("Book with this id was not found");
        }

        if(userId) {
            const bookId = populatedData._id;

            const inCart = await CartService.includes(userId, bookId);
            
            return populatedData
        }

        return populatedData;
    }

    static async getBooks(params) {
        const query = BookService._generateQueryFilter(params);

        const booksQuery = bookModel.find(query);

        const { paginatedQuery, currentPage, totalPages } =
            await this._paginatBooks(params, booksQuery);

        const books = await this._populateQuery(paginatedQuery);

        return { books, currentPage, totalPages };
    }

    /**
     * Пагинирует результаты запроса книг и возвращает информацию о страницах.
     * @param {Object} params - Параметры пагинации и фильтрации.
     * @param {number} [params.limit=12] - Максимальное количество книг на странице.
     * @param {number} [params.page=1] - Номер страницы.
     * @param {Query} booksQuery - Объект запроса Mongoose для книг.
     * @returns {Object} Объект, содержащий пагинированный запрос, общее количество страниц и текущую страницу.
     * @throws {Error} Бросает ошибку, если не удалось выполнить запрос на подсчет документов.
     */
    static async _paginatBooks(params, booksQuery) {
        const { limit = 12, page = 1 } = params;

        // Генерируем объект запроса для фильтрации
        const query = BookService._generateQueryFilter(params);

        // Выполняем запрос на подсчет общего количества документов
        const countOfDocuments = await bookModel.find(query).countDocuments();

        // Вычисляем общее количество страниц
        const totalPages = Math.ceil(countOfDocuments / limit);

        // Пагинируем запрос на книги
        const paginatedQuery = booksQuery.skip((page - 1) * limit).limit(limit);

        // Возвращаем информацию о пагинации
        return { paginatedQuery, totalPages, currentPage: page };
    }

    /**
     * Генерирует объект запроса для фильтрации на основе переданных параметров.
     * @param {Object} params - Параметры фильтрации.
     * @param {string} [params.author] - Фильтр по автору книги.
     * @param {string} [params.title] - Фильтр по названию книги.
     * @param {number} [params.minPrice] - Минимальная цена книги.
     * @param {number} [params.maxPrice] - Максимальная цена книги.
     * @param {string|string[]} [params.genre] - Фильтр по жанру или массиву жанров книги.
     * @returns {Object} Объект запроса для фильтрации.
     */
    static _generateQueryFilter(params) {
        const filterRules = {
            author: {
                key: "author",
                condition: (value) => ({ author: value }),
            },
            title: {
                key: "title",
                condition: (value) => ({
                    title: { $regex: value, $options: "i" },
                }),
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
                condition: (value) =>
                    typeof value === "string"
                        ? { genre: { $in: [value] } }
                        : { genre: { $all: value } },
            },
        };

        const query = {};

        for (let key in filterRules) {
            const filter = filterRules[key];

            if (params[key]) {
                if (query.hasOwnProperty(filter.key)) {
                    deepmerge(query, filter.condition(params[key]));
                } else {
                    Object.assign(query, filter.condition(params[key]));
                }
            }
        }
        return query;
    }

    /**
     * Заполняет данные, полученные из запроса книг, данными из связанных коллекций.
     * @param {Query} MongoQuery - Объект запроса Mongoose.
     * @returns {Promise<Object[]>} Промис, который разрешается массивом объектов, содержащих данные книг с заполненными данными из связанных коллекций.
     */
    static async _populateQuery(MongoQuery) {
        const populatedData = await MongoQuery.populate("genre")
            .populate({ path: "author", select: ["fullName", "_id"] })
            .exec();

        return populatedData;
    }
}

module.exports = BookService;
