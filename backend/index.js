const express = require('express')
var cors = require('cors')
const app = express()


                      
app.use(cors({
    origin: ['http://localhost:3000', 'https://viestit-frontend-rx347ght6q-lz.a.run.app', 'https://viestitapp.inkilareetu.fi']
}));

let messages = [
    {group:1, usr:'user1', msg:'Hello World!'},
    {group:2, usr:'user2', msg:'Hello World!'},
    {group:3, usr:'user3', msg:'Hello World!'}
]

let groups = [
    { id: 1, name: 'group1' },
    { id: 2, name: 'group2' },
    { id: 3, name: 'group3' }
]

app.get('/', (request, response) => {
    response.send('ViestitApp REST API')
})

  
app.get('/api/groups', (request, response) => {
    response.json(groups)
})

app.get('/api/messages', (request, response) => {
    response.json(messages)
})
  
const PORT = 8080
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})