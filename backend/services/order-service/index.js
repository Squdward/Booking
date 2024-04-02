const { STATUS } = require("../../../utils/status");
const orderModel = require("../../models/order-model");
const ApiError = require("../../utils/apiError");
const { orderSchema } = require("../../utils/popuateSchema/order");

class OrderService {
    static async initOrder(userId) {
        const model = await orderModel.create({ userId });

        if(!model) {
            throw ApiError.ServerError('An error occurred during the request')
        }

        return model;
    }

    static async createOrder(userId, body) {
        const order = await orderModel.findOneAndUpdate(
            { userId },
            {
                $push: {
                    orders: {
                        products: body.products,
                        status: STATUS.PROCESSING,
                        created: Date.now(),
                    },
                },
            },
        );

        if (!order) {
            throw ApiError.NotFound("order with this id was not found");
        }

        return await OrderService._populate(order)
    }

    static async getOrders(userId) {
        const orders = await orderModel.findOne({userId});

        if(!orders) {
            throw ApiError.NotFound('Order was not found')

        }

        // return await this._populate(orders)
        return await orders.populate({
            path: 'orders.products',
            populate: {
                path: 'products',
                populate: {
                    path: 'product',
                    model: 'Book'
                }
            }
        })
    }

    static async _populate(mongoQuery) { 
        // return await mongoQuery.populate()
        return await mongoQuery.populate(orderSchema())
    }
}

module.exports = OrderService;
