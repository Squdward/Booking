const { cartSchema } = require("../cart");

const orderSchema = () => {
    return [
        {
            path: "orders.products",
            model: "Cart",
            populate: [
                {
                    
                }
            ]
            // populate: cartSchema()
        }
    ];
}

module.exports = {orderSchema}