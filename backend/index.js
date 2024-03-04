/**
 * ViestitApp REST API
 * This file defines endpoints for user authentication, user registration, messaging, group management, and message retrieval.
 * It utilizes Express.js for routing, MySQL for database interaction, and CryptoJS for encryption and decryption.
 */
// Import necessary modules
const express = require('express')
const cors = require('cors')
const db = require('./db') // Import the database connection
const CryptoJS = require("crypto-js");
require('dotenv').config()

const app = express()

app.use(express.static('build'))
// Middleware to parse JSON bodies
app.use(express.json())

// CORS configuration to allow requests from specified origins
app.use(cors({
    origin: ['http://localhost:3000', 'https://viestit-frontend-rx347ght6q-lz.a.run.app', 'https://viestitapp.inkilareetu.fi']
}))

// Root endpoint to verify server availability
app.get('/api', (request, response) => {
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


// Endpoint to login
app.post('/api/login', (request, response) => {
    const { username, password } = request.body
    if (!username || !password ) {
        response.status(400).json({ error: 'Fill all fileds' })
        return
    }

    const encryptedUsername = CryptoJS.HmacSHA512(username, process.env.ENCRYPTION_KEY).toString()
    const encryptedPassword = CryptoJS.HmacSHA512(password, process.env.ENCRYPTION_KEY).toString()

    const params = [encryptedUsername]
    db.query("SELECT * FROM users WHERE username = ?", params, function (err, result) {
        if (err) {
            response.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        if (result.length === 0) {
            response.status(401).json({ error: 'Invalid username or password' });
            return;
        }
        const user = result[0];
        if (user.password === encryptedPassword) {
            response.status(200).json({ message: 'Logged in successfully', userId:user.id });
        } else {
            response.status(401).json({ error: 'Invalid username or password' });
        }
    })
})

// Endpoint to register user
app.post('/api/register', (request, response) => {
    const { username, password } = request.body;
    if (!username || !password) {
        response.status(400).json({ error: 'Fill all fields' });
        return;
    }

    const id = generateUUID()
    const encryptedUsername = CryptoJS.HmacSHA512(username, process.env.ENCRYPTION_KEY).toString()
    const encryptedPassword = CryptoJS.HmacSHA512(password, process.env.ENCRYPTION_KEY).toString()

    // Check if username is taken
    db.query("SELECT username FROM users WHERE username = ?", [encryptedUsername], function (err, result) {
        if (err) {
            console.error('Error registering user:', err);
            response.status(500).json({ error: 'Failed to register user' });
            return;
        }
        if(result.length>0){
            response.status(409).json({ message: 'Username already exists' });
        }else{
            // Insert the new user into the database
            const insertQuery = "INSERT INTO users (id, username, password) VALUES ( ?, ?, ?)";
            db.query(insertQuery, [id, encryptedUsername, encryptedPassword], function (err, result) {
                if (err) {
                    // Handle other errors
                    console.error('Error registering user:', err);
                    response.status(500).json({ error: 'Failed to register user' });
                    return;
                }
                response.status(201).json({ message: 'User registered successfully' });
            });   
        }
    });
});

// Endpoint to add a message to a group
app.post('/api/sendmessage', (request, response) => {
    const { groupId, sender, text } = request.body // Extract groupId, sender, and content from request body
    if (!groupId || !sender || !text) {
        response.status(400).json({ error: 'groupId, sender, and text are required fields' })
        return
    }

    const encryptedText = CryptoJS.AES.encrypt(text, process.env.ENCRYPTION_KEY).toString()
    const encryptedSender= CryptoJS.AES.encrypt(sender, process.env.ENCRYPTION_KEY).toString()

    const message = { groupId, sender:encryptedSender, timestamp:new Date(), text:encryptedText } // Create message object to insert into database
    db.query("INSERT INTO messages SET ?", message, function (err, result) {
        if (err) {
            console.error('Error adding message to the database:', err)
            response.status(500).json({ error: 'Failed to add message to the database' })
            return
        }
        // If successful, retrieve the timestamp of added message
        db.query("SELECT timestamp FROM messages WHERE id = ?", result.insertId, function(err, rows) {
            if (err) {
                console.error('Error retrieving timestamp from the database:', err)
                response.status(500).json({ error: 'Failed to retrieve timestamp from the database' })
                return
            }
            // Extract the timestamp from the query result
            const timestamp = rows[0].timestamp
            response.status(201).json({ message: 'Message added successfully', timestamp: timestamp })
        })
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

    const encryptedName = CryptoJS.HmacSHA512(name, process.env.ENCRYPTION_KEY).toString()

    // Create group object to insert into database
    const group = { id:id, name:encryptedName }

    // Insert group into database
    db.query("INSERT INTO \`groups\` SET ?", group, function (err, result) {
        if (err) {
            // If there's an error, log it and return an error response
            console.error('Error adding group to the database:', err)
            response.status(500).json({ error: 'Failed to add group to the database' })
            return
        }

        // If successful, return success response with the ID of the newly added group
        response.status(201).json({ message: 'Group added successfully', id: id })
    })
})


// Endpoint to get group ID by name
app.get('/api/groupid/:name', (request, response) => {
    const groupName = request.params.name // Extract group name from request parameters

    const encryptedName = CryptoJS.HmacSHA512(groupName, process.env.ENCRYPTION_KEY).toString()

    // Query the database to find the group ID by name
    db.query("SELECT id FROM \`groups\` WHERE name = ?;", encryptedName, function (err, result) {
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

        // Decrypt the text before sending it in the response
        const decryptedMessages = result.map(message => {
            return {
                groupId: message.groupId,
                sender: CryptoJS.AES.decrypt(message.sender, process.env.ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8),
                text: CryptoJS.AES.decrypt(message.text, process.env.ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8),
                timestamp: message.timestamp
            };
        });

        // Send the decrypted messages in the response
        response.json(decryptedMessages);
    })
})

// Set the server to listen on a specified port
const PORT = 8080
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

// Function to generate UUID (Universally Unique Identifier)
function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime()//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0
            d = Math.floor(d/16)
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0
            d2 = Math.floor(d2/16)
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
    })
}