const cartModel = require("../../models/cart-model");
const ApiError = require("../../utils/apiError");

class CartService {
    static async createCart(userId) {
        const cart = cartModel.create({userId});

        if(!cart) {
            throw ApiError.ServerError('An error occurred during the request')
        }
        
        return cart
    }

    static async addToCart(userId, body) {
        let cart = await cartModel.findOneAndUpdate(
            { userId, 'products.product':  body.id },
            {
                $set: { 'products.$.quantity': body.quantity } // Обновляем количество товара, если он найден
            },
            { new: true } // Получаем обновленный документ
        );
        
        if (!cart) {
            // Если товар не найден в корзине, добавляем новую запись
            cart = await cartModel.findOneAndUpdate(
                { userId },
                { $push: { products: { product: body.id, quantity: body.quantity } } },
                { new: true }
            );
        }
        
        if(!cart) {
            throw ApiError.ServerError('An error occurred during the request')
        }

        return cart
    }

    static async getCart(userId) {
        const cart = await cartModel.find({userId}).populate({
            path: "products.product",
            model: "Book",
            populate: [
                {
                    path: "author",
                    select: "fullName",
                },
                {
                    path: "genre"
                },
            ]

        })

        if(!cart) {
            throw ApiError.NotFound("Cart with this userId was not foud")
        }

        return cart 
    }
}

module.exports = CartService