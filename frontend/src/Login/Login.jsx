import React, { useState } from 'react'
import axios from 'axios'
import './login.css'

/**
 * Login Component
 * @param {function} onLogin - Function to handle successful login
 */
const Login = ({ onLogin }) => {
  const [usernameLogin, setUsernameLogin] = useState('')
  const [passwordLogin, setPasswordLogin] = useState('')
  const [errorLogin, setErrorLogin] = useState('')
  const [usernameReg, setUsernameReg] = useState('')
  const [passwordReg, setPasswordReg] = useState('')
  const [errorReg, setErrorReg] = useState('')
  const [fieldTypeLogin, setFieldTypeLogin] = useState('password')
  const [fieldTypeReg, setFieldTypeReg] = useState('password')

  // Function to handle login
  const onLogIn = () => {
    // Reset any previous error messages
    setErrorLogin('')
    setErrorLogin('')

    // Validate username and password
    if (!usernameLogin) {
      setErrorLogin('Username is required')
      return
    }
    if (!passwordLogin) {
      setErrorLogin('Password is required')
      return
    }

    const user = {
      username: usernameLogin,
      password: passwordLogin
    }
    axios
      .post(`api/login`, user)
      .then(response => {
        setErrorLogin(response.data.message)
        onLogin(usernameLogin)
        setUsernameLogin('')
        setPasswordLogin('')
      })
      .catch(error => {
        setErrorLogin(error.response.data.error)
      })
  }

  // Function to handle user registration
  const onSignUp = () => {
    // Reset any previous error messages
    setErrorReg('')
    setErrorReg('')

    // Validate username and password
    if (!usernameReg) {
      setErrorReg('Username is required')
      return
    }
    if (!passwordReg) {
      setErrorReg('Password is required')
      return
    }

    const newUser = {
      username: usernameReg,
      password: passwordReg
    }
    axios
      .post(`api/register`, newUser)
      .then(response => {
        setErrorReg(response.data.message)
        setUsernameReg('')
        setPasswordReg('')
      })
      .catch(error => {
        setErrorReg(error.response.data.message)
      })
  }

  return (
    <div>
      <h1>Login to ViestitApp</h1>
      <fieldset>
        <label>
          Username:
          <input
            value={usernameLogin}
            onChange={(ev) => {
              setUsernameLogin(ev.target.value)
              setErrorLogin('')
            }}
          />
        </label>
        <br/>
        <label>
          Password:
          <input
            type={fieldTypeLogin}
            value={passwordLogin}
            onChange={(ev) => {
              setPasswordLogin(ev.target.value)
              setErrorLogin('')
            }}
          />
        </label>
        <br/>
        <label>
          <input type="checkbox" onClick={() => {
            setFieldTypeLogin(fieldTypeLogin === 'password' ? 'text' : 'password')
          }} />
          Show Password
        </label>
        <br/>
        <label className="errorLabel">{errorLogin}</label>
        <br/>
        <button onClick={onLogIn}>Log in</button>
      </fieldset>

      <fieldset>
        <legend>Register</legend>
        <label>
          Username:
          <input
            value={usernameReg}
            onChange={(ev) => {
              setUsernameReg(ev.target.value)
              setErrorReg('')
            }}
          />
        </label>
        <br/>
        <label>
          Password:
          <input
            type={fieldTypeReg}
            value={passwordReg}
            onChange={(ev) => {
              setPasswordReg(ev.target.value)
              setErrorReg('')
            }}
          />
        </label>
        <br/>
        <label>
          <input type="checkbox" onClick={() => {
            setFieldTypeReg(fieldTypeReg === 'password' ? 'text' : 'password')
          }} />
          Show Password
        </label>
        <br/>
        <label className="errorLabel">{errorReg}</label>
        <br/>
        <button onClick={onSignUp}>Register</button>
      </fieldset>
    </div>
  )
}

export default Login