const mysql = require('mysql2'); // Import mysql2

const connection = mysql.createConnection({ // Create a connection
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'mymusicdb'
});

connection.connect((err) => { // Connect to the database
    if (err) throw err;
    console.log('Connected to the database'); // Log a message
});

module.exports = connection; // Export connection to be used again in other files like controllers
// module comes from node.js