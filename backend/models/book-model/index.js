const {Schema, model} = require('mongoose');

const BookSchema = new Schema({
    title: {type: String, required: true, uniq: true},
    description: {type: String, required: true},
    img: {type: String, required: true},
    price: {type: Number, required: true},
    author: {type: Schema.Types.ObjectId, ref: 'Author', required: true},
    genre: [{type: Schema.Types.ObjectId, ref: 'Genre', required: true}],
}, {versionKey: false})

module.exports = model('Book', BookSchema)