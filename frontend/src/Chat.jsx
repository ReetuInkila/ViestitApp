import { useEffect } from 'react'
import axios from 'axios'
import './chat.css'

const Chat = ({ selectedGroup, messages, setMessages }) => {

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
    
    return (
        <div className="chat">
            {messages.map((message, i)=>(
                <li key={i}>{message.sender}: {message.text}</li>
            ))}
        </div>
    );
};

export default Chat;
