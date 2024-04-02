const { bookSchema } = require("../book");

const cartSchema = () => {
    return [
        {
            path: "products.product",
            model: "Book",
            populate: bookSchema()
        }
    ];
}

module.exports = {cartSchema}