const express = require('express'); // Import express
const cors = require('cors'); // Import the cors package
const artistRoutes = require('./routes/artistRoutes'); // Import artist routes
const songRoutes = require('./routes/songRoutes'); // Import song routes
const albumRoutes = require('./routes/albumRoutes'); // Import album routes
const db = require('./db'); // Import the database connection

const app = express(); // Create an express app
const port = 5000; // Set the port for consistency

app.use(cors()); // Use the cors middleware to allow for cross-origin requests
app.use(express.json()); // Use the express.json() middleware to parse the body of the request message as json data 

app.use('/api/artists', artistRoutes); // When user tries to access /api/artists, use the artistRoutes - relevant for frontend
app.use('/api/songs', songRoutes);
app.use('/api/albums', albumRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});