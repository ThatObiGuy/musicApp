// filepath: backend/controllers/albumController.js
const db = require('../db');

exports.getAllAlbums = (req, res) => {
    db.query('SELECT * FROM Album', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

exports.createAlbum = (req, res) => {
    const { name, artistId, releaseYear, numberOfListens, songs } = req.body;
    db.query('INSERT INTO Album (AlbumName, ArtistID, ReleaseYear, NumberOfListens, Songs) VALUES (?, ?, ?, ?, ?)', 
    [name, artistId, releaseYear, numberOfListens, songs], (err, results) => {
        if (err) throw err;
        res.status(201).json({ id: results.insertId });
    });
};

exports.updateAlbum = (req, res) => {
    const { id } = req.params;
    const { name, artistId, releaseYear, numberOfListens, songs } = req.body;
    db.query('UPDATE Album SET AlbumName = ?, ArtistID = ?, ReleaseYear = ?, NumberOfListens = ?, Songs = ? WHERE AlbumID = ?', 
    [name, artistId, releaseYear, numberOfListens, songs, id], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

exports.deleteAlbum = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM Album WHERE AlbumID = ?', [id], (err, results) => {
        if (err) throw err;
        res.status(204).send();
    });
};