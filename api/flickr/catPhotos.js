const CatPhotos = require('flickr-sdk');
require('dotenv').config();
const flickr = new CatPhotos(process.env.FLICKR_API_KEY);

async function getCatPhotos(count) {
    const catPhotos = [];

    // add error handling here
    const catPhotosMeta = (await flickr.photos.search({
        tags:['cat'],
        per_page: count, // 100 would be the default
        page: 1
    })).body.photos.photo;

    for (let i = 0; i < catPhotosMeta.length; i++) {
        // add error handling here
        const catPhotoInfo = (await flickr.photos.getInfo({
            photo_id: catPhotosMeta[i].id
        })).body.photo;
        catPhotos.push({
            published: catPhotoInfo.dates.posted,
            url: catPhotoInfo.urls.url[0]._content,
            tags: catPhotoInfo.tags.tag.map(tag => tag.raw)
        })
    }

    return catPhotos;
}

module.exports = getCatPhotos;

