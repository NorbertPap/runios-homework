const knex = require('./db');

async function getPhotos(count, page, tag) {
    try {
        if(!tag) {
            return await knex
                .select('*')
                .from('photos')
                .limit(count)
                .offset((page - 1) * count)
        } else {
            return await knex
                .select('*')
                .from('photos')
                .whereIn('id', function () {
                    this
                        .distinct('photo_id')
                        .from('photo_tags')
                        .where('tag_id', tag)
                })
                .limit(count)
                .offset((page - 1) * count)
        }
    } catch (e) {
        console.error(e)
    }
}

async function deletePhotoById(id) {
    try {
        await knex('photo_tags')
            .where({photo_id: id})
            .returning('tag_id')
            .del();
        await knex('photos')
            .where({id: id})
            .del();
        await knex('tags')
            .whereNotIn('id', function () {
                this.distinct('tag_id').from('photo_tags')
            })
            .del();
    } catch (e) {
        console.error(e)
    }
}

module.exports = {
    getPhotos: getPhotos,
    deletePhotoById: deletePhotoById
};
