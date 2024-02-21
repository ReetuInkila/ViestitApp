import Message from './Message';
import './chat.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Chat = ({ userName, selectedGroup }) => {
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])

    useEffect(() => {
        axios
        .get('https://viestit-backend-rx347ght6q-lz.a.run.app/api/messages')
        .then(response => {
            setMessages(response.data)
        })  
    }, [])

    const handleMsgChange = (event) => {
        setMessage(event.target.value)  
    }

    const sendMessage = (event) => {
        if(userName.trim() !== '' && selectedGroup){
            const copy= [...messages];
            copy.push({group:selectedGroup, usr:userName, msg:message})
            setMessages(copy)
            setMessage('')
        }
    }

    return (
        <div className="chat">
            {messages.filter(msg=>msg.group===selectedGroup).map((message, i)=>(
                <li key={i}>{message.usr}: {message.msg}</li>
            ))}
            <Message msg={message} handleMsgChange={handleMsgChange} sendMessage={sendMessage}/>
        </div>
    );
};

export default Chat;
