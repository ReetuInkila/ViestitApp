import React, { useEffect, useState } from 'react'
import Login from './Login/Login'
import Home from './Home'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState('')

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(storedUser)
      setLoggedIn(true)
    }
  }, [])

  const handleLogin = (username) => {
    setUser(username)
    setLoggedIn(true)
    localStorage.setItem('user', username)
  }

  const handleLogout = () => {
    setUser('')
    setLoggedIn(false)
    localStorage.removeItem('user')
  }

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
