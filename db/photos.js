const Photo = require('./model/photo');

async function getPhotos(count, page) {
    try {
        return await Photo.find().limit(count).skip((page-1)*count).exec()
    } catch (e) {
        console.error("Something went wrong while trying to access the photos: " + e);
    }
}

module.exports = getPhotos;
