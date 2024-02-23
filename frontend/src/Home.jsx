import { useState } from 'react'
import './home.css'
import Groups from './Group/Group'
import Chat from './Chat/Chat'
import Message from './MessageField/Message'
import axios from 'axios'

const Home = ({ user, onLogout }) => {
    const [selectedGroup, setSelectedGroup] = useState(null)
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])


    const sendMessage = (event) => {
        event.preventDefault() // Prevent the default form submission behavior
        if ( selectedGroup && message.trim() !== '') {
            const newMessage = {
                groupId: selectedGroup,
                sender: user,
                text: message
            };
            // Send the new message to the backend
            axios
                .post(`${process.env.REACT_APP_API_URL}/sendmessage`, newMessage)
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
            <Groups setSelectedGroup={setSelectedGroup} onLogout={onLogout}/>
            <Chat selectedGroup={selectedGroup} messages={messages} setMessages={setMessages}/>
            <Message message={message} setMessage={setMessage} sendMessage={sendMessage}/>
        </div>
    )
}
export default Home
