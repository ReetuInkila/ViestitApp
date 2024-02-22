import Message from './Message';
import './chat.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Chat = ({ userName, selectedGroup }) => {
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])

    useEffect(() => {
        if (selectedGroup) {
            axios
                .get(`https://viestit-backend-rx347ght6q-lz.a.run.app/api/messages/${selectedGroup}`)
                .then(response => {
                    setMessages(response.data)
                })
                .catch(error => {
                    console.error('Error fetching messages:', error)
                })
        }
    }, [selectedGroup])
    

    const handleMsgChange = (event) => {
        setMessage(event.target.value)  
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
                .catch(error => {
                    console.error('Error sending message:', error)
                })
            
            setMessages([...messages, newMessage])
            setMessage('')
        }
    }

    return (
        <div className="chat">
            {messages.filter(msg=>msg.groupId===selectedGroup).map((message, i)=>(
                <li key={i}>{message.sender}: {message.text}</li>
            ))}
            <Message msg={message} handleMsgChange={handleMsgChange} sendMessage={sendMessage}/>
        </div>
    );
};

export default Chat;
