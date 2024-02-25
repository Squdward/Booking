const {Schema, model} = require('mongoose');

const FavouriteSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: "User", required: true},
    products: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: "Book",
            },
        }
    ]
}, {versionKey: false})

module.exports = model('Favourite', FavouriteSchema)