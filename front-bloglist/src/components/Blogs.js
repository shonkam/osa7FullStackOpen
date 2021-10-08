import React, { useRef } from 'react'
import { notification } from '../reducers/notificationReducer'
import { createBlog, likeBlog, removeBlog } from '../reducers/blogReducer'
import { setUser } from '../reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './Blog'
import CreateBlog from './CreateBlog'
import Togglable from './Togglable'

const Blogs = () => {

  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blog)
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  const updateLikes = (blog) => {
    try {
      dispatch(likeBlog(blog))
      dispatch(notification(`updated likes of blog ${blog.title} by ${blog.author}`, 5))
    } catch (exception) {
      dispatch(notification('something went wrong, please refresh the page'))
      console.log(exception)
    }
  }

  const deleteBlog = async (blog) => {
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
        await dispatch(removeBlog(blog.id))
        await dispatch(notification(`Removed blog ${blog.title} by ${blog.author}`, 5))
      }
    } catch (exception) {
      await dispatch(notification('something went wrong, please refresh the page'))
    }
  }

  const addNewBlog = (blogObject) => {

    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blogObject))
    dispatch(notification(`a new blog "${blogObject.title}" by ${blogObject.author} added`, 5))
  }

  let sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
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

export default Blogs