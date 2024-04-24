const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    name: {type: String },
    secondName: {type: String },
    adres: {type: String },
    phone: {type: String },
}, {versionKey: false})

module.exports = model('User', UserSchema)