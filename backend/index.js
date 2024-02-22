const express = require('express')
const cors = require('cors')
const db = require('./db') // Import the database connection
require('dotenv').config()

const app = express()

// Middleware to parse JSON bodies
app.use(express.json())

app.use(cors({
    origin: ['http://localhost:3000', 'https://viestit-frontend-rx347ght6q-lz.a.run.app', 'https://viestitapp.inkilareetu.fi']
}))

app.get('/', (request, response) => {
    response.send('ViestitApp REST API')
})

app.get('/api/groups', (request, response) => {
    db.query("SELECT * FROM groups", function (err, result, fields) {
        if (err) {
            console.error('Error fetching groups from the database:', err)
            response.status(500).json({ error: 'Failed to fetch groups from the database' })
            return
        }
        response.json(result)
    })
})

app.get('/api/messages', (request, response) => {
    db.query("SELECT * FROM messages", function (err, result, fields) {
        if (err) {
            console.error('Error fetching messages from the database:', err)
            response.status(500).json({ error: 'Failed to fetch messages from the database' })
            return
        }
        response.json(result)
    })
})

// Endpoint to add a message to a group
app.post('/api/sendmessage', (request, response) => {
    const { groupId, sender, text } = request.body // Extract groupId, sender, and content from request body
    if (!groupId || !sender || !text) {
        response.status(400).json({ error: 'groupId, sender, and text are required fields' })
        return
    }

    const message = { groupId, sender, text } // Create message object to insert into database
    db.query("INSERT INTO messages SET ?", message, function (err, result) {
        if (err) {
            console.error('Error adding message to the database:', err)
            response.status(500).json({ error: 'Failed to add message to the database' })
            return
        }
        response.status(201).json({ message: 'Message added successfully' })
    })
})

const PORT = 8080
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
