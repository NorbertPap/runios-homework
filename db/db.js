const mongoose = require('mongoose');
const getCatPhotos = require('../api/flickr/catPhotos');

const photoSchema = new mongoose.Schema({
    imageUrl: String,
    publishedDate: Date,
    tags: [String]
});
const Photo = mongoose.model('Photo', photoSchema);


mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

db.once('open', async () => {
    if(await Photo.countDocuments().exec() > 0) return;

    const catPhotos = await getCatPhotos(500);
    for (let i = 0; i < 500; i++) {
        await Photo.create(catPhotos[i]);
    }
});

module.exports = db;
