import './message.css'

const Message = ({message, setMessage, sendMessage}) => {

    return (
        <div className="message">
            <input 
                id="usr"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>send</button>
        </div>
    )
}

export default Message
