const FavouriteService = require("../../services/favorite-service");

class FavouriteController { 
    static async addToFavourite(req, res, next) { 
        try {
            const favouriteData = await FavouriteService.addToFavourite(req.user.userId, req.body.productId)

            return res.json(favouriteData)
        } catch (error) {
            console.error(error);
            next(error)
        }
    }

    static async getFavourite(req, res, next) {
        try {
            const favouriteData = await FavouriteService.getFavourite(req.user.userId);

            return res.json(favouriteData)
        } catch(error) {
            console.error(error);
            next(error)
        }
    }

    static async removeFromFavourite(req, res, next) {
        try {
            const {favouriteId} = req.params;

            const removeFauvorite = await FavouriteService.removFromFauvorite(req.user.userId, favouriteId);

            return res.json(removeFauvorite)
        } catch(error) {
            console.error(error);
            next(error)
        }
    }
}

module.exports = FavouriteController