const express = require('express'); // Import express
const router = express.Router(); // Make a router
const songController = require('../controllers/songController'); // Import song controller

router.get('/', songController.retrieveSongs); // when user tries to get songs, call retrieveSongs function from songController
router.post('/', songController.createSong);
router.put('/:id', songController.updateSong);
router.delete('/:id', songController.deleteSong);

module.exports = router; // Export router