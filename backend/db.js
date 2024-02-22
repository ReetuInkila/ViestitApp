var mysql = require('mysql')
require('dotenv').config()

var con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PSWD,
    database: process.env.DB_NAME
})

con.connect(function(err) {
    if (err) {
        console.error('Error connecting to database:', err)
        return
    }
    console.log('Connected to database')
})

module.exports = con
