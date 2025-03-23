const db = require('../db'); // Import the database connection

// Retrieve
exports.retrieveArtists = (req, res) => {
    db.query('SELECT * FROM Artist', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

// Create
exports.createArtist = (req, res) => {
    const { name, monthlyListeners, genre, songs, albums } = req.body;
    db.query('INSERT INTO Artist (ArtistName, MonthlyListeners, Genre, Songs, Albums) VALUES (?, ?, ?, ?, ?)', 
    [name, monthlyListeners, genre, songs, albums], (err, results) => {
        if (err) throw err;
        res.status(201).json({ id: results.insertId });
    });
};

// Update
exports.updateArtist = (req, res) => {
    const { id } = req.params;
    const { name, monthlyListeners, genre, songs, albums } = req.body;
    db.query('UPDATE Artist SET ArtistName = ?, MonthlyListeners = ?, Genre = ?, Songs = ?, Albums = ? WHERE ArtistID = ?', 
    [name, monthlyListeners, genre, songs, albums, id], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

// Delete
exports.deleteArtist = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM Artist WHERE ArtistID = ?', [id], (err, results) => {
        if (err) throw err;
        res.status(204).send();
    });
};