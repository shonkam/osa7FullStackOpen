import React, { useRef } from 'react'
import { notification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'

import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router, Switch, Route, Link
} from "react-router-dom"
import CreateBlog from './CreateBlog'
import Togglable from './Togglable'


const Blogs = () => {

  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  const addNewBlog = (blogObject) => {

    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blogObject))
    dispatch(notification(`a new blog "${blogObject.title}" by ${blogObject.author} added`, 5))
  }

  let sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2>Blogs</h2>
      <Togglable buttonLabel='createNewBlog' ref={blogFormRef} id="newBlog">
        <CreateBlog
          newBlog={addNewBlog}
        />
      </Togglable>
      <ul>
        {sortedBlogs.map(blog =>
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        )}
      </ul>
    </div>
  )

}
/*
<ul>
        name blogs created
        {users.map(user =>
          <li key={user.id} >
            
            <Link to={`/users/${user.id}`}> {user.name} </Link>
            {user.blogs.length}
          </li>
        )}
      </ul>
*/
export default Blogs