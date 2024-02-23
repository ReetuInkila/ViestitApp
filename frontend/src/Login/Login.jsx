import React, { useState } from 'react'
import axios from 'axios'

const Login = ({setUser, setLoggedIn}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')


  const onLogIn = () => {
    // Reset any previous error messages
    setError('');
    setError('');

    // Validate username and password
    if (!username) {
      setError('Username is required');
      return;
    }
    if (!password) {
      setError('Password is required');
      return;
    }

    const user = {
        username: username,
        password: password
    };
    axios
        .post('http://localhost:8080/api/login', user)
        .then(response => {
            setError(response.data.message)
            setLoggedIn(true)
            setUser({username:username, id:response.data.id})
            setUsername('')
            setPassword('')
        })
        .catch(error => {
            setError(error.response.data.message)
        })


  };

  const onSignUp = () => {
    // Reset any previous error messages
    setError('');
    setError('');

    // Validate username and password
    if (!username) {
      setError('Username is required');
      return;
    }
    if (!password) {
      setError('Password is required');
      return;
    }

    const newUser = {
        username: username,
        password: password
    };
    axios
        .post('http://localhost:8080/api/register', newUser)
        .then(response => {
            setError(response.data.message)
            setUsername('')
            setPassword('')
        })
        .catch(error => {
            setError(error.response.data.message)
        })
  }

  return (
    <div>
        <h2>Login</h2>
        <input
          value={username}
          placeholder="Enter your username here"
          onChange={(ev) => setUsername(ev.target.value)}
        />
        <input
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <br/>
        <label className="errorLabel">{error}</label>
        <br/>
        <input type="button" onClick={onLogIn} value={'Log in'} />
        <input type="button" onClick={onSignUp} value={'Sign up'} />
    </div>
  )
}

export default Login