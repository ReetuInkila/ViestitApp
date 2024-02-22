const express = require('express')
var cors = require('cors')
var mysql = require('mysql')
require('dotenv').config()
const app = express()
                    
app.use(cors({
    origin: ['http://localhost:3000', 'https://viestit-frontend-rx347ght6q-lz.a.run.app', 'https://viestitapp.inkilareetu.fi']
}))


var con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PSWD,
    database: process.env.DB_NAME
})


app.get('/', (request, response) => {
    response.send('ViestitApp REST API')
})

  
app.get('/api/groups', (request, response) => {
    con.query("SELECT * FROM groups;", function (err, result, fields) {
        if (err) {
            console.error('Error fetching groups from the database:', err)
            response.status(500).json({ error: 'Failed to fetch groups from the database' })
            return
        }
        response.json(result)
    })
})

app.get('/api/messages', (request, response) => {
    con.query("SELECT * FROM messages;", function (err, result, fields) {
        if (err) {
            console.error('Error fetching messages from the database:', err)
            response.status(500).json({ error: 'Failed to fetch messages from the database' })
            return
        }
        response.json(result)
    })
})
  
const PORT = 8080
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})