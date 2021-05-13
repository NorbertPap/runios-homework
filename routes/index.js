const express = require('express');
const router = express.Router();
const getPhotos = require('../db/photos').getPhotos;

/* GET home page. */
router.get('/', async function(req, res, next) {
  const page = req.query.page;
  const tag = req.query.tag;
  const photos = await getPhotos(10, page, tag);
  res.render('index', { photos: photos });
});

module.exports = router;
