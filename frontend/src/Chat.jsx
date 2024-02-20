import Message from './Message';
import './chat.css'
import { useState } from 'react'

const Chat = ({ userName, selectedGroup }) => {
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([
        {group:1, usr:'user1', msg:'Hello World!'},
        {group:2, usr:'user2', msg:'Hello World!'},
        {group:3, usr:'user3', msg:'Hello World!'}
    ])

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
