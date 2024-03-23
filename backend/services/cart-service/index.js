const mongoose = require("mongoose");
const { isValidObjectId } = mongoose;
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
        const cart = await cartModel.findOne({userId}).populate({
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
        const foundProducts = await cartModel.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(userId),
                    'products.product': {$in: productId}
                }
            },
            {
                $unwind: '$products'
            },
            {
                $match: {
                    'products.product': { $in: productId.map(id => new mongoose.Types.ObjectId(id)) } // Дополнительный $match для фильтрации продуктов по productId
                }
            },
            {
                $group: {
                    _id: '$userId',
                    products: { $push: '$products' } // Группируем продукты по userId
                }
            },
            {
                $project: {
                    userId: '$_id',
                    'products': 1 // Оставляем поле products в результате
                }
            }
        ]);
   

   
        return foundProducts.length > 0 ? foundProducts[0] : undefined
    }
}

module.exports = CartService