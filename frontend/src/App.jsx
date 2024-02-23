import { useState } from 'react'
import './app.css'
import User from './User'
import Groups from './Groups'
import Chat from './Chat'
import Message from './Message'
import axios from 'axios'

const App = () => {
    const [userName, setUserName] = useState('')
    const [selectedGroup, setSelectedGroup] = useState(null)
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])

    const handleNameChange = (event) => {
        setUserName(event.target.value)  
    }

    const sendMessage = (event) => {
        event.preventDefault() // Prevent the default form submission behavior
        if (userName.trim() !== '' && selectedGroup && message.trim() !== '') {
            const newMessage = {
                groupId: selectedGroup,
                sender: userName,
                text: message
            };
            // Send the new message to the backend
            axios
                .post('https://viestit-backend-rx347ght6q-lz.a.run.app/api/sendmessage', newMessage)
                .then(response => {
                    const newTimestamp = response.data.timestamp
                    newMessage.timestamp = newTimestamp
                    setMessages([...messages, newMessage])
                    setMessage('')
                })
                .catch(error => {
                    console.error('Error sending message:', error)
                })
        }
    }

    return (
        <div className='content'>
            <div className='header'>
                <Groups setSelectedGroup={setSelectedGroup}/>
                <User userName={userName} handleNameChange={handleNameChange}/>
            </div>
            <Chat selectedGroup={selectedGroup} messages={messages} setMessages={setMessages}/>
            <Message message={message} setMessage={setMessage} sendMessage={sendMessage}/>
        </div>
    )
}
export default App
