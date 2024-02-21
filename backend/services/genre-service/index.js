const authorModel = require("../../models/author-model");
const bookModel = require("../../models/book-model");
const genreModel = require("../../models/genre-model");
const ApiError = require("../../utils/apiError");

class GenreService {
    static async createGenre(body) {
        const genre  = genreModel.create({title: body.title})
    
        return genre
    } 

    static async getOneGenre(id) {
 
    } 

    static async getAllAGenres(body) {

    } 
}

module.exports = GenreService