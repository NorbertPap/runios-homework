const getCatPhotos = require('../api/flickr/catPhotos');
require('dotenv').config();

const knex = require('knex')({
    client: 'pg',
    connection: {
        host : process.env.DB_HOST,
        user : process.env.DB_USER,
        password : process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    },
    searchPath: ['knex', 'public'],
});

async function setupDatabase() {
    const hasPhotos = await knex.schema.hasTable('photos');
    const hasTags = await knex.schema.hasTable('tags');
    const hasPhotoTags = await knex.schema.hasTable('photo_tags');

    if(!hasPhotos) {
        await knex.schema.createTable('photos', function(table) {
            table.increments('id').primary();
            table.string('url', 255);
            table.dateTime('published');
        });
    }
    if(!hasTags) {
        await knex.schema.createTable('tags', function(table) {
            table.increments('id').primary();
            table.string('name', 255);
        });
    }
    if(!hasPhotoTags) {
        await knex.schema.createTable('photo_tags', function(table) {
            table.increments('id').primary();
            table
                .integer('photo_id')
                .references('id')
                .inTable('photos');
            table
                .integer('tag_id')
                .references('id')
                .inTable('tags')
        });
    }

    if(!hasPhotos && !hasTags && !hasPhotoTags) {
        await fillWithData();
    }
}

async function fillWithData() {
    const catPhotos = await getCatPhotos(500);
    console.log(catPhotos);

    const photosMap = await insertPhotosAndGetMap(catPhotos);
    const tagMap = await insertTagsAndGetMap(catPhotos);
    await insertPhotoTags(catPhotos, photosMap, tagMap);
}

async function insertPhotosAndGetMap(catPhotos) {
    const photoIds = await knex('photos')
        .insert(catPhotos.map(catPhoto => {
            return {
                url: catPhoto.url,
                published: new Date(catPhoto.published * 1000)
            }
        }))
        .returning('id');
    const photosMap = new Map();
    for (let i = 0; i < catPhotos.length; i++) {
        photosMap.set(catPhotos[i], photoIds[i])
    }
    console.log(photosMap);
    return photosMap;
}

async function insertTagsAndGetMap(catPhotos) {
    let tags = new Set();
    catPhotos.forEach(catPhoto => {
        catPhoto.tags.forEach(tag => {
            tags.add(tag)
        })
    });

    tags = Array.from(tags);
    const tagIds = await knex('tags')
        .insert(tags.map(tag => {
            return {
                name: tag
            }
        }))
        .returning('id');

    const tagMap = new Map();
    for (let i = 0; i < tags.length; i++) {
        tagMap.set(tags[i], tagIds[i])
    }
    return tagMap;
}

async function insertPhotoTags(catPhotos, photosMap, tagMap) {
    const photosAndTags = [];
    for (let i = 0; i < catPhotos.length; i++) {
        for (let j = 0; j < catPhotos[i].tags.length; j++) {
            const photo = catPhotos[i];
            const tag = photo.tags[j];

            photosAndTags.push({
                photo_id: photosMap.get(photo),
                tag_id: tagMap.get(tag)
            })
        }
    }

    await knex('photo_tags')
        .insert(photosAndTags);
}

setupDatabase()
    .then(() => {
        console.log(`Database connected`);
    })
    .catch(e => console.log(e));

module.exports = knex;
