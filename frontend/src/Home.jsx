import { useState } from 'react'
import './home.css'
import Groups from './Group/Group'
import Chat from './Chat/Chat'
import Message from './MessageField/Message'
import axios from 'axios'

/**
 * Home Component
 * @param {string} user - The username of the logged-in user
 * @param {function} onLogout - Function to handle user logout
 */
const Home = ({ user, onLogout }) => {
  const [selectedGroup, setSelectedGroup] = useState(null)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  /**
   * Function to send a message to the selected group.
   * @param {Object} event - The event object
   */
  const sendMessage = (event) => {
    event.preventDefault() // Prevent the default form submission behavior
    if (selectedGroup && message.trim() !== '') {
      const newMessage = {
        groupId: selectedGroup,
        sender: user,
        text: message
      }
      axios
        .post(`api/sendmessage`, newMessage)
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
      <Groups setSelectedGroup={setSelectedGroup} onLogout={onLogout} />
      <Chat selectedGroup={selectedGroup} messages={messages} setMessages={setMessages} user={user} />
      <Message message={message} setMessage={setMessage} sendMessage={sendMessage} />
    </div>
  )
}

export default Home
