import React, { useState } from 'react'
import { login } from '../reducers/userReducer'
import { notification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const Login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const dispatch = useDispatch()

  const handleLogin = (event) => {
    event.preventDefault()

    try {
      dispatch(login({ username, password }))
      setUsername('')
      setPassword('')

    } catch (exception) {
      dispatch(notification('wrong credentials', 5))
      console.log(exception)
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            id="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            id="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" id="submit">login</button>
      </form>
    </div>
  )

}

export default Login