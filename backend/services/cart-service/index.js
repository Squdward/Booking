const { isValidObjectId } = require("mongoose");
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

        return cart.products.find( ({product}) => product.toString() === body.id )
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

    static async removFromCart(userId, cartId) {
        if (!isValidObjectId(cartId)) {
            throw ApiError.NotFound("cartId id invalid");
        }

        const removedCart = await cartModel.findOneAndUpdate(
            { userId },
            { $pull: { products: { _id: cartId } } },
            { new: true }
        );

        if (!removedCart) {
            throw ApiError.NotFound("Product with this id was not found ");
        }

        return removedCart;
    }

    static async includes(userId, productId) {
        const product = cartModel.find({
            userId,
            'products.product': productId,
        });

        return product
    }
}

module.exports = CartService