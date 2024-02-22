const {Schema, model} = require('mongoose');

const GenreSchema = new Schema({
    title: {type: String, required: true},
}, {versionKey: false})

module.exports = model('Genre', GenreSchema)