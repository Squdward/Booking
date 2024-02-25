const CartService = require("../../services/cart-service");

class CartController { 
    static async addToCart(req, res, next) { 
        try {
            const cartData = await CartService.addToCart(req.user.userId, req.body);

            return res.json(cartData)
        } catch (error) {
            console.error(error);
            next(error)
        }
    }

    static async getCart(req, res, next) {
        try {
            const cartData = await CartService.getCart(req.user.userId);

            return res.json(cartData)
        } catch(error) {
            console.error(error);
            next(error)
        }
    }
}

module.exports = CartController