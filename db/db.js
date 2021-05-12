const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    imageUrl: String,
    publishedDate: Date,
    tags: [String]
});
const photoModel = mongoose.model('Photo', photoSchema);


mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

db.once('open', async () => {
    // fill up database with initial data
});

module.exports = db;
