import React from 'react'
import { useDispatch } from 'react-redux'
import { notification } from '../reducers/notificationReducer'
import { initializeBlogs, likeBlog, removeBlog } from '../reducers/blogReducer'
import { useParams } from "react-router-dom"
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Link,
  Button
} from '@material-ui/core'

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
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                {blog.title}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Link href={blog.url}>
                  {blog.url}
                </Link>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                {blog.likes} likes
                <Button variant='outlined' onClick={() => updateLikes(blog)}>
                  like
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                added by {blogUser.name}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                {blogUser.username === user.username ?
                  <Button variant='outlined' onClick={() => deleteBlog(blog)}>
                    remove
                  </Button>
                  : null
                }
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Blog
