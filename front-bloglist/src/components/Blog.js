import React from 'react'
import { useDispatch } from 'react-redux'
import { notification } from '../reducers/notificationReducer'
import { initializeBlogs, likeBlog, removeBlog } from '../reducers/blogReducer'
import { useParams } from "react-router-dom"


const Blog = ({ blogs, users, user }) => {

  const dispatch = useDispatch()

  const id = useParams().id
  const blog = blogs.find(i => i.id === id)
  if (!blog) {
    return null
  }

  const blogUser = blog.user[0]

  const updateLikes = (blog) => {
    try {
      dispatch(likeBlog(blog))
      dispatch(notification(`updated likes of blog ${blog.title} by ${blog.author}`, 5))
      dispatch(initializeBlogs())
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

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>{blog.likes} likes <button onClick={() => updateLikes(blog)}>like</button> </div>
      <div>added by {blogUser.name}</div>
      {blogUser.username === user.username ?
        <div><button onClick={() => deleteBlog(blog)}>remove</button> </div>
        : null
      }
    </div>
  )
}

export default Blog
