const Photo = require('./model/photo');

async function getPhotos(count, page, tag) {
    try {
        return await Photo.find(tag && {tags: { $all: [tag] }}).limit(count).skip((page-1)*count).exec()
    } catch (e) {
        console.error("Something went wrong while trying to access the photos: " + e);
    }
}

async function deletePhotoById(id) {
    try {
        console.log(await Photo.findById(id).exec());

        return await Photo.deleteOne({
            _id: id
        }).exec()
    } catch (e) {
        console.error(`Something went wrong while trying to delete the photo by id: ${id}\n` + e)
    }
}

module.exports = {
    getPhotos: getPhotos,
    deletePhotoById: deletePhotoById
};
