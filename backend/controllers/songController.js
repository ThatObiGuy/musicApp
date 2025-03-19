// filepath: backend/controllers/songController.js
const db = require('../db');

exports.getAllSongs = (req, res) => {
    db.query('SELECT * FROM Song', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

exports.createSong = (req, res) => {
    const { name, releaseYear, albumId } = req.body;
    db.query('INSERT INTO Song (SongName, ReleaseYear, AlbumID) VALUES (?, ?, ?)', 
    [name, releaseYear, albumId], (err, results) => {
        if (err) throw err;
        res.status(201).json({ id: results.insertId });
    });
};

exports.updateSong = (req, res) => {
    const { id } = req.params;
    const { name, releaseYear, albumId } = req.body;
    db.query('UPDATE Song SET SongName = ?, ReleaseYear = ?, AlbumID = ? WHERE SongID = ?', 
    [name, releaseYear, albumId, id], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

exports.deleteSong = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM Song WHERE SongID = ?', [id], (err, results) => {
        if (err) throw err;
        res.status(204).send();
    });
};