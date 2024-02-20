const {Schema, model} = require('mongoose');

const GenreSchema = new Schema({
    title: {type: String, required: true},
})

module.exports = model('Genre', GenreSchema)