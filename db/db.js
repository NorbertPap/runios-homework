const mongoose = require('mongoose');
const Photo = require('./model/photo');
const getCatPhotos = require('../api/flickr/catPhotos');

mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', async () => {
    console.log("MongoDB successfully connected");
    console.log('Current photo count: ' + await Photo.countDocuments().exec());
    if(await Photo.countDocuments().exec() > 0) return;
    console.log('Filling up database...');
    const catPhotos = await getCatPhotos(500);
    console.log('Database filled with photos');
    for (let i = 0; i < 500; i++) {
        await Photo.create(catPhotos[i]);
    }
});

module.exports = db;
