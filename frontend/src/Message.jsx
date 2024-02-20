import './message.css'

const Message = ({msg, handleMsgChange, sendMessage}) => {

    return (
        <div className="message">
            <input 
                id="usr"
                value={msg}
                onChange={handleMsgChange}
            />
            <button onClick={sendMessage}>send</button>
        </div>
    )
}

export default Message
