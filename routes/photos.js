const express = require('express');
const router = express.Router();
const deletePhotoById = require('../db/photos').deletePhotoById;

router.delete('/:id', async (req, res) => {
    await deletePhotoById(req.params.id);
    res.send()
});

module.exports = router;
