import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Login from './components/Login'
import Users from './components/Users'
import Notification from './components/Notification'
import './App.css'
import { setUser } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import blogServices from './services/blogs'
import { getAllUsers } from './reducers/usersReducer'
import User from './components/User'
import {
  Container,
  AppBar,
  Toolbar,
  Button

} from '@material-ui/core'


const App = () => {
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)

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

  const handleLogout = async () => {
    window.localStorage.removeItem('user-username')
    window.localStorage.removeItem('user-name')
    window.localStorage.removeItem('user-token')
    dispatch(setUser(null))
  }

  if (user === null) {

    return (
      <Container>
        <div>
          <h1>Blog app</h1>
          <Notification />
          < Login />
        </div>
      </Container>
    )
  }
  return (
    <Container>
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Button color='inherit' component={Link} to="/">
              blogs
            </Button>
            <Button color='inherit' component={Link} to="/users">
              users
            </Button>
            {user.name} logged in
            <Button variant='outlined' color='secondary' onClick={() => handleLogout()}>
              logout
            </Button>
          </Toolbar>
        </AppBar>
        <div>
          <h1>Blog app</h1>
        </div>
        <Notification />
        <Switch>
          <Route path='/blogs/:id'>
            <Blog blogs={blogs} user={user} users={users} />
          </Route>
          <Route path='/users/:id'>
            <User users={users} />
          </Route>
          <Route path='/users'>
            < Users />
          </Route>
          <Route path='/'>
            < Blogs />
          </Route>
        </Switch>
      </Router>
    </Container >
  )
}

export default App