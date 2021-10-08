import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import CreateBlog from './components/CreateBlog'
import Togglable from './components/Togglable'
import './App.css'
import { setUser, login } from './reducers/userReducer'
import { notification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, likeBlog, deleteBlog } from './reducers/blogReducer'
import { connect, useDispatch, useSelector } from 'react-redux'
import blogServices from './services/blogs'

const App = (store) => {
  const blogs = useSelector(state => state.blog)
  const user = useSelector(state => state.user)
  
  if (user) {
    window.localStorage.setItem('user-username', JSON.stringify(user.username))
    window.localStorage.setItem('user-name', JSON.stringify(user.name))
    window.localStorage.setItem('user-token', user.token)
    blogServices.setToken(user.token)
  }
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
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
      store.setUser(user)
    }
  }, [])

  const blogFormRef = useRef()


  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('user-username')
    window.localStorage.removeItem('user-name')
    window.localStorage.removeItem('user-token')
    store.setUser(null)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      await store.login({ username, password })
      setUsername('')
      setPassword('')

    } catch (exception) {
      console.log(exception)
      store.notification('wrong credentials', 5)
    }
  }

  const updateLikes = (blog) => {
    try {
      store.likeBlog(blog)
      store.notification(`updated likes of blog ${blog.title} by ${blog.author}`, 5)
    } catch (exception) {
      store.notification('something went wrong, please refresh the page')
      console.log(exception)
    }
  }

  const deleteBlog = async (blog) => {
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
        await store.deleteBlog(blog.id)
        await store.notification(`Removed blog ${blog.title} by ${blog.author}`, 5)
      }
    } catch (exception) {
      await store.notification('something went wrong, please refresh the page')
    }
  }

  const addNewBlog = (blogObject) => {

    blogFormRef.current.toggleVisibility()
    store.createBlog(blogObject)
    store.notification(`a new blog "${blogObject.title}" by ${blogObject.author} added`, 5)
  }

  const loginForm = () => (
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

  const blogForm = () => {
    let sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

    return (
      <div>
        <form onSubmit={handleLogout}>
          <h2>Logged in as {user.name}
            <button type='submit'>
              logout
            </button>
          </h2>
        </form>
        <Togglable buttonLabel='createNewBlog' ref={blogFormRef} id="newBlog">
          <CreateBlog
            newBlog={addNewBlog}
          />
        </Togglable>
        {sortedBlogs.map(blog =>
          <Blog key={blog.id} blog={blog} updateLikes={updateLikes} deleteBlog={deleteBlog} user={user} />
        )}
      </div>
    )
  }

  return (
    <div>
      <h1>Blog app</h1>
      <Notification />

      {user === null ?
        loginForm() :
        blogForm()
      }
    </div>
  )
}

const mapStateToStore = (state) => {
  return {
    blogs: state.blogs,
    notification: state.notification,
    user: state.user
  }
}

const mapDispatchTostore = {
  notification,
  createBlog,
  likeBlog,
  deleteBlog,
  setUser,
  login
}

const ConnectedApp = connect(mapStateToStore, mapDispatchTostore)(App)
export default ConnectedApp