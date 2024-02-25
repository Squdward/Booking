const { isValidObjectId } = require("mongoose");
const favoriteModel = require("../../models/favourite-model");
const favouriteModel = require("../../models/favourite-model");
const ApiError = require("../../utils/apiError");

class FavouriteService {
    static async createFavourite(userId) {
        const favourite = favouriteModel.create({ userId });

        if (!favourite) {
            throw ApiError.ServerError("An error occurred during the request");
        }

        return favourite;
    }

    static async addToFavourite(userId, productId) {
        if (!isValidObjectId(productId)) {
            throw ApiError.NotFound("Product id invalid");
        }

        const existingFavourite = await favouriteModel.findOne({
            userId,
            "products.product": productId,
        });

        if (existingFavourite) {
            throw ApiError.BadRequest("Product is already in favourites");
        }

        // Если записи с productId нет, вносим ее в БД
        const favourite = await favouriteModel.findOneAndUpdate(
            { userId },
            { $addToSet: { products: { product: productId } } },
            { new: true, upsert: true }
        );

        return favourite;
    }

    static async getFavourite(userId) {
        const favourite = await favouriteModel.find({ userId }).populate({
            path: "products.product",
            model: "Book",
            populate: [
                {
                    path: "author",
                    select: "fullName",
                },
                {
                    path: "genre",
                },
            ],
        });

        if (!favourite) {
            throw ApiError.NotFound("Favourite with this id was not found");
        }

        return favourite;
    }

    static async removFromFauvorite(userId, favouriteId) {
        if (!isValidObjectId(favouriteId)) {
            throw ApiError.NotFound("Product id invalid");
        }

        const removedFauvorite = await favoriteModel.findOneAndUpdate(
            { userId },
            { $pull: { products: { _id: favouriteId } } },
            { new: true }
        );

        if (!removedFauvorite) {
            throw ApiError.NotFound("Product with this id was not found ");
        }

        return removedFauvorite;
    }
}

module.exports = FavouriteService;
