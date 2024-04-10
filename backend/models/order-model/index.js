const {Schema, model} = require('mongoose');
const { STATUS } = require('../../../utils/status');

const OrderSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: "User", required: true},
    orders: [
        {
            products: [
                {   
                    product: {
                        type: Schema.Types.ObjectId,
                        ref: "Book",
                    },
                    quantity: {
                        type: Schema.Types.Number
                    }
                }
            ],
            status: {
                type: Schema.Types.Number,
                enum: Object.values(STATUS)
            },
            created: {
                type: Schema.Types.Date,
            }
        }
    ]
}, {versionKey: false})

module.exports = model('Order', OrderSchema)