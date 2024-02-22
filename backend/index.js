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

/* Used for debugging
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
*/

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
        // If successful, return success response with the timestamp of added message
        const timestamp = result.timestamp
        response.status(201).json({ message: 'Message added successfully', timestamp:timestamp})
    })
})

// Endpoint to add a new group
app.post('/api/addgroup', (request, response) => {
    const { name } = request.body // Extract name from request body

    // Check if name exists
    if (!name) {
        response.status(400).json({ error: 'Name is a required field' })
        return
    }

    // Generate UUID

    const id = generateUUID()


    // Create group object to insert into database
    const group = { id, name }

    // Insert group into database
    db.query("INSERT INTO groups SET ?", group, function (err, result) {
        if (err) {
            // If there's an error, log it and return an error response
            console.error('Error adding group to the database:', err)
            response.status(500).json({ error: 'Failed to add group to the database' })
            return
        }

        // If successful, return success response with the ID of the newly added group
        const newGroupId = result.id
        response.status(201).json({ message: 'Group added successfully', id: newGroupId })
    })
})


// Endpoint to get group ID by name
app.get('/api/groupid/:name', (request, response) => {
    const groupName = request.params.name // Extract group name from request parameters

    // Query the database to find the group ID by name
    db.query("SELECT id FROM groups WHERE name = ?", groupName, function (err, result) {
        if (err) {
            // If there's an error, log it and return an error response
            console.error('Error fetching group ID from the database:', err)
            response.status(500).json({ error: 'Failed to fetch group ID from the database' })
            return
        }

        // If the group is found, return its ID
        if (result.length > 0) {
            const groupId = result[0].id
            response.json({ groupId })
        } else {
            // If the group is not found, return a 404 Not Found response
            response.status(404).json({ error: 'Group not found' })
        }
    })
})

// Endpoint to fetch messages by group ID
app.get('/api/messages/:groupId', (request, response) => {
    const groupId = request.params.groupId // Extract group ID from request parameters

    // Query the database to fetch messages by group ID
    db.query("SELECT groupId, sender, text, timestamp FROM messages WHERE groupId = ?", groupId, function (err, result) {
        if (err) {
            // If there's an error, log it and return an error response
            console.error('Error fetching messages from the database:', err)
            response.status(500).json({ error: 'Failed to fetch messages from the database' })
            return
        }

        // If messages are found, return them in the response
        response.json(result)
    })
})


const PORT = 8080
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})



function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
}

console.log(generateUUID());