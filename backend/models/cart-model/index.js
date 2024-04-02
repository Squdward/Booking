const {Schema, model} = require('mongoose');

const CartSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: "User", required: true},
    products: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: "Book",
            },
            quantity: { type: Number }
        }
    ]
}, {versionKey: false})

module.exports = model('Cart', CartSchema)