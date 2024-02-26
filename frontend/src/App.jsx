/**
 * App Component
 * This component serves as the main entry point for the application.
 * It manages user authentication status and renders either the Home or Login component based on the user's authentication status.
 */
import React, { useEffect, useState } from 'react'
import Login from './Login/Login'
import Home from './Home'

function App() {
  const [loggedIn, setLoggedIn] = useState(false) // State variable to track user authentication status
  const [user, setUser] = useState('') // State variable to store user data

  // useEffect hook to check if user data is stored in local storage and set authentication status accordingly
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(storedUser)
      setLoggedIn(true)
    }
  }, [])

  // Function to handle user login
  const handleLogin = (username) => {
    setUser(username) // Set user data
    setLoggedIn(true) // Set authentication status to true
    localStorage.setItem('user', username) // Store user data in local storage
  }

  // Function to handle user logout
  const handleLogout = () => {
    setUser('') // Clear user data
    setLoggedIn(false) // Set authentication status to false
    localStorage.removeItem('user') // Remove user data from local storage
  }

  // Render the Home component if user is logged in, otherwise render the Login component
  return (
    <div className="App">
      {loggedIn ? (
        <Home user={user} onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  )
}

export default App
