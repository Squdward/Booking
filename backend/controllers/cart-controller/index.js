const CartService = require("../../services/cart-service");

class CartController { 
    static async addToCart(req, res, next) { 
        try {
            const cartData = await CartService.addToCart(req.user.id, req.body);

            return res.json(cartData)
        } catch (error) {
            console.error(error);
            next(error)
        }
    }
}

module.exports = CartController