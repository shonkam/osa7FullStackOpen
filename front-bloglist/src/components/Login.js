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

  const handleLogin = async (event) => {
    event.preventDefault()

    const credentials = {
      username: username.value,
      password: password.value
    }

    try {
      await dispatch(login(credentials))

    } catch (exception) {
      dispatch(notification('wrong credentials', 5))
      console.log(exception)
    }
  }

  const usernameTemp = {
    username: username.value,
    onChange: username.onChange
  }

  const passwordTemp = {
    password: password.value,
    onChange: password.onChange
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <TextField inputProps={usernameTemp} label='username' />
        </div>
        <div>
          <TextField inputProps={passwordTemp} label='password' type='password' />
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