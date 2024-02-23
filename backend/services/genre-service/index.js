const authorModel = require("../../models/author-model");
const bookModel = require("../../models/book-model");
const genreModel = require("../../models/genre-model");
const ApiError = require("../../utils/apiError");

class GenreService {
    static async createGenre(body) {
        const genre  = await genreModel.create({title: body.title})
    
        return genre
    } 

    static async getOneGenre(id) {
        const genre = await genreModel.findById(id);
        
        return genre
    } 

    static async getAllAGenres(body) {
        const genre = await genreModel.find();

        return genre
    }
    
    // Todo: Rename
    static async findAllGenre(ids) {
        const genre = await genreModel.find({_id: {$in: ids}});

        return genre
    }
}

module.exports = GenreService