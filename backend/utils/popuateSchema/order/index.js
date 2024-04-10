const { bookSchema } = require("../book");

const orderSchema = () => [
    {
        path: "orders.products.product",
        model: "Book",
        populate: bookSchema()
    }
]

module.exports = {orderSchema}