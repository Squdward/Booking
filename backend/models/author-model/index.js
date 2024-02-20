const {Schema, model} = require('mongoose');

const AuthorSchema = new Schema({
    fullName: {type: String, required: true},
    dateOfBirth: {type: Date, required: true},
})

module.exports = model('Author', AuthorSchema)