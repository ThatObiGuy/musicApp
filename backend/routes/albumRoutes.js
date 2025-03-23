const express = require('express'); // Import express
const router = express.Router(); // Make a router
const albumController = require('../controllers/albumController'); // Import album controller

router.get('/', albumController.retrieveAlbums);
router.post('/', albumController.createAlbum);
router.put('/:id', albumController.updateAlbum);
router.delete('/:id', albumController.deleteAlbum);

module.exports = router; // Export router