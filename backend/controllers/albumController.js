const db = require('../db'); // Import the connection to the database

// Retrieve
exports.retrieveAlbums = (req, res) => { 
    db.query('SELECT * FROM Album', (err, results) => {
        if (err) throw err;
        res.json(results); // Return the JSON of the results
    });
};

// Create
exports.createAlbum = (req, res) => { 
    const { name, artistId, releaseYear, numberOfListens, songs } = req.body; // Get the data from the request
    db.query('INSERT INTO Album (AlbumName, ArtistID, ReleaseYear, NumberOfListens, Songs) VALUES (?, ?, ?, ?, ?)', 
    [name, artistId, releaseYear, numberOfListens, songs], (err, results) => { // Perform an SQL query
        if (err) throw err;
        res.status(201).json({ id: results.insertId }); // Return the ID of the inserted album
    });
};

// Update
exports.updateAlbum = (req, res) => {
    const { id } = req.params; // Get the ID of the album from the URL
    const { name, artistId, releaseYear, numberOfListens, songs } = req.body; // Get the data from the request
    db.query('UPDATE Album SET AlbumName = ?, ArtistID = ?, ReleaseYear = ?, NumberOfListens = ?, Songs = ? WHERE AlbumID = ?', 
    [name, artistId, releaseYear, numberOfListens, songs, id], (err, results) => {
        if (err) throw err;
        res.json(results); // Return the updated album
    });
};

// Delete
exports.deleteAlbum = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM Album WHERE AlbumID = ?', [id], (err, results) => {
        if (err) throw err;
        res.status(204).send();
    });
};