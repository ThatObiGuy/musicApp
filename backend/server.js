// filepath: backend/server.js
const express = require('express');
const cors = require('cors'); // Import the cors package
const artistRoutes = require('./routes/artistRoutes');
const songRoutes = require('./routes/songRoutes');
const albumRoutes = require('./routes/albumRoutes');
const db = require('./db');

const app = express();
const port = 5000;

app.use(cors()); // Use the cors middleware
app.use(express.json());

app.get('/api/check-db', (req, res) => {
    db.query('SELECT 1', (err, results) => {
      if (err) {
        return res.status(500).json({ status: 'error', message: 'Database connection failed' });
      }
      res.json({ status: 'success', message: 'Database connection is working' });
      // the response will be { status: 'success', message: 'Database connection is working' }

      // now we will also add a get for doja cat the artist.
        app.get('/api/doja-cat', (req, res) => {
            db.query('SELECT * FROM Artist WHERE ArtistName = "Doja Cat"', (err, results) => {
            if (err) {
                return res.status(500).json({ status: 'error', message: 'Database query failed' });
            }
            res.json(results);
            // the response will be an array of objects with the artist information
            // it works
            });
        });
    });
  });

app.use('/api/artists', artistRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/albums', albumRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});