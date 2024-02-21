const GenreService = require("../../services/genre-service")

class GenreController {
    static async createGenre(req, res, next) {
        try {
            const genreData = await GenreService.createGenre(req.body);

            return res.json(genreData)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = GenreController