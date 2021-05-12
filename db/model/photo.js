const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    url: String,
    published: Date,
    tags: [String]
});
const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;
