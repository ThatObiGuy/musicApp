const express = require('express'); // Import express
const router = express.Router(); // Make a router
const artistController = require('../controllers/artistController'); // Import artist controller

router.get('/', artistController.retrieveArtists);
router.post('/', artistController.createArtist);
router.put('/:id', artistController.updateArtist);
router.delete('/:id', artistController.deleteArtist);

module.exports = router; // Export router