import './message.css'

/**
 * Message Component
 * @param {string} message - The message content
 * @param {function} setMessage - Function to set the message content
 * @param {function} sendMessage - Function to send the message
 */
const Message = ({ message, setMessage, sendMessage }) => {
  return (
    <div className="message">
      <input
        id="usr"
        value={message}
        placeholder="Message"
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>send</button>
    </div>
  )
}

export default Message