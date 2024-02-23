import Login from './Login/Login'
import Home from './Home'
import { useEffect, useState } from 'react'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState('')

  return (
    <div className="App">
        {loggedIn ? <Home user={user}/> : <Login setUser={setUser} setLoggedIn={setLoggedIn}/>}
    </div>
  )
}

export default App