const OrderService = require("../../services/order-service");

class OrderController {
    static async createOrder(req, res, next) {
        try {
            const order = await OrderService.createOrder(req.user.userId, req.body);

            return res.json(order)
        } catch (error) {
            console.error(error);
            next(error)
        }
    }

module.exports = OrderController