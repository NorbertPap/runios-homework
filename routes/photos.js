const express = require('express');
const router = express.Router();
const getPhotos = require('../db/photos');

router.get('/', async function(req, res, next) {
  const photos = await getPhotos(10, 1);
  res.json(photos);
});

module.exports = router;
