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
        } catch (error) {
            console.error(error);
            next(error)
        }
    }

    static async removeFromCart(req, res, next) {
        try {
            const { cartId } = req.params;

            const cartData = await CartService.removFromCart(req.user.userId, cartId);

            return res.json(cartData)
        } catch (error) {
            console.error(error);
            next(error)
        }
    }

    static async patchCart(req, res, next) {
        try {
            const cartData = await CartService.editCart(req.user.userId, req.body);

            return res.json(cartData)
        } catch (error) {
            console.error(error);
            next(error)
        }
    }
}

module.exports = CartController