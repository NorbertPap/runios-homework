const mongoose = require('mongoose');
const Photo = require('./db/schema/photos');

mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

db.once('open', async () => {
    // fill up database with initial data
});

module.exports = db;
