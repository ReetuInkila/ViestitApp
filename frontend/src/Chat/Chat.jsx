import { useEffect } from 'react'
import axios from 'axios'
import './chat.css'

const Chat = ({ selectedGroup, messages, setMessages, user }) => {

    useEffect(() => {
        if (selectedGroup) {
            axios
                .get(`${process.env.REACT_APP_API_URL || 'https://viestit-backend-rx347ght6q-lz.a.run.app/api'}/messages/${selectedGroup}`)
                .then(response => {
                    setMessages(response.data)
                })
                .catch(error => {
                    console.error('Error fetching messages:', error)
                })
        }else{
            setMessages([])
        }
    }, [selectedGroup, setMessages])

    // Function to format timestamp
    function formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        const day = ('0' + date.getDate()).slice(-2);
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const year = date.getFullYear();
        const hours = ('0' + date.getHours()).slice(-2);
        const minutes = ('0' + date.getMinutes()).slice(-2);
        return `${day}.${month}.${year} ${hours}:${minutes}`;
    }
    
    return (
        <div className="chat">
            {messages.map((message, i)=>(
                <li key={i} className={message.sender === user ? 'own' :'unknown'}>
                    {message.sender}: {message.text}
                <p className='timestamp'>{formatTimestamp(message.timestamp)}</p>
                </li>
            ))}
        </div>
    );
};

export default Chat;
