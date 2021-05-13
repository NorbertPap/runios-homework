const express = require('express');
const router = express.Router();
const getPhotos = require('../db/photos').getPhotos;
const deletePhotoById = require('../db/photos').deletePhotoById;

router.get('/', async function(req, res, next) {
  const photos = await getPhotos(10, 1);
  res.json(photos);
});

router.delete('/:id', async (req, res) => {
    console.log(req.params);
    await deletePhotoById(req.params.id);
    res.send()
});

module.exports = router;
