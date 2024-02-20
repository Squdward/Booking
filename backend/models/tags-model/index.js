const {Schema, model} = require('mongoose');

const TagSchema = new Schema({
    title: {type: String, required: true},
})

module.exports = model('Tag', TagSchema)