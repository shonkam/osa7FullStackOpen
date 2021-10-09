import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"
import Blogs from './components/Blogs'
import Login from './components/Login'
import Users from './components/Users'
import Notification from './components/Notification'

import './App.css'
import { setUser } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import blogServices from './services/blogs'
import { getAllUsers } from './reducers/usersReducer'

const App = () => {
  const user = useSelector(state => state.user)

  if (user) {
    window.localStorage.setItem('user-username', JSON.stringify(user.username))
    window.localStorage.setItem('user-name', JSON.stringify(user.name))
    window.localStorage.setItem('user-token', user.token)
    blogServices.setToken(user.token)
  }

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(getAllUsers())
  }, [dispatch])

  useEffect(() => {
    const username = window.localStorage.getItem('user-username')
    const name = window.localStorage.getItem('user-name')
    const token = window.localStorage.getItem('user-token')

    if (username && name && token) {
      const user = {
        username: JSON.parse(username),
        name: JSON.parse(name),
        token: token
      }
      dispatch(setUser(user))
    }
  }, [dispatch])

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('user-username')
    window.localStorage.removeItem('user-name')
    window.localStorage.removeItem('user-token')
    dispatch(setUser(null))
  }

  const padding = {
    padding: 5
  }
  if (user === null) {

    return (
      <div>
        <h1>Blog app</h1>
        <Notification />
        < Login />
      </div>

    )
  }
  return (
    <Router>
      <h4>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
        
      </h4>
      <div>
        <h1>Blog app</h1>
      </div>
      <Notification />
      <Switch>
        <Route path='/users'>
          < Users />
        </Route>
        <Route path='/'>
          < Blogs />
        </Route>
      </Switch>
    </Router>
  )
}

export default App