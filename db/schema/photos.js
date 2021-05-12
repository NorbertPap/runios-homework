const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    imageUrl: String,
    publishedDate: Date,
    tags: [String]
});

module.exports = mongoose.model('Photo', photoSchema);
