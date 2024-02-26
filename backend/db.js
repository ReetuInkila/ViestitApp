/**
 * Database Connection Configuration
 * This module establishes a connection pool to a MySQL database using the mysql2 library.
 * It retrieves database connection credentials from environment variables using dotenv.
 * The configured connection pool is exported for use in other modules.
 */

// Import required modules
const mysql = require('mysql2')
require('dotenv').config()

// Create a MySQL connection pool
const con = mysql.createPool({
    connectionLimit: 10,                    // Maximum number of connections in the pool
    host: process.env.MYSQL_HOST,           // MySQL server hostname
    user: process.env.MYSQL_USER,           // MySQL user
    password: process.env.MYSQL_PASSWORD,   // MySQL user password
    database: process.env.MYSQL_DATABASE,   // MySQL database name
});

// Export the connection pool for use in other modules
module.exports = con
