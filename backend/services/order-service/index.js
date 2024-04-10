const { STATUS } = require("../../../utils/status");
const orderModel = require("../../models/order-model");
const ApiError = require("../../utils/apiError");
const { orderSchema } = require("../../utils/popuateSchema/order");
const cartModel = require("../../models/cart-model");
const mongoose = require('mongoose');
const CartService = require("../cart-service");

class OrderService {
    static async initOrder(userId) {
        const model = await orderModel.create({ userId });

        if (!model) {
            throw ApiError.ServerError('An error occurred during the request')
        }

        return model;
    }

    static async createOrder(userId, body) {
        const cartIds = body.products.map(id => new mongoose.Types.ObjectId(id));

        const [cartItems] = await cartModel.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId) } }, // Находим по userId пользователя
            { $unwind: '$products' }, // Разворачиваем массив продуктов 
            { $match: { 'products._id': { $in: cartIds } } }, // фильтруем продукты которые по ids, что бы добавить их позже в заказ  
            { $group: { _id: null, products: { $push: "$products" } } }, // группируем данные в 1 поле 
            { $project: { 'products': 1, } } // отреаем ненужную часть
        ]);

        // Добавляем в продукты в заказ
        const order = await orderModel.findOneAndUpdate(
            { userId },
            {
                $push: {
                    orders: {
                        products: cartItems.products,
                        status: STATUS.PROCESSING,
                        created: Date.now(),
                    },
                },
            },
        );

        if (!order) {
            throw ApiError.NotFound("order with this id was not found");
        }

        // После успешного добавления необходимо убрать товары из корзины 
        body.products.forEach(element => CartService.removFromCart(userId, element));

        return await OrderService._populate(order)
    }

    static async getOrders(userId) {
        const orders = await orderModel.findOne({ userId });

        if (!orders) {
            throw ApiError.NotFound('Order was not found')
        }

        return this._populate(orders)
    }

    static async _populate(mongoQuery) {
        return await mongoQuery.populate(orderSchema())
    }
}

module.exports = OrderService;
