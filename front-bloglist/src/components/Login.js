import React from 'react'
import { login } from '../reducers/userReducer'
import { notification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import {
  TextField, Button
} from '@material-ui/core'
import { useFormField } from '../hooks'

const Login = () => {

  const username = useFormField('username')
  const password = useFormField('password')

  const dispatch = useDispatch()

  const handleLogin = (event) => {
    event.preventDefault()

    const credentials = {
      username: username.value,
      password: password.value
    }

    try {
      dispatch(login(credentials))

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
          <TextField inputProps={username} label='username' />
        </div>
        <div>
          <TextField inputProps={password} label='password' type='password' />
        </div>
        <div>
          <Button variant='text' color='primary' type='submit' >
            login
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Login