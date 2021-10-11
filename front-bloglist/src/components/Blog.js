import React from 'react'
import { useDispatch } from 'react-redux'
import { notification } from '../reducers/notificationReducer'
import { initializeBlogs, likeBlog, removeBlog } from '../reducers/blogReducer'
import { useParams, useHistory } from "react-router-dom"
import { getAllUsers } from '../reducers/usersReducer'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Link,
  Button
} from '@material-ui/core'

const Blog = ({ blogs, user }) => {
  const history = useHistory()
  const dispatch = useDispatch()

  const id = useParams().id
  const blog = blogs.find(i => i.id === id)
  if (!blog) {
    return null
  }

  const blogUser = blog.user[0]

  const updateLikes = async (blog) => {
    try {
      await dispatch(likeBlog(blog))
      await dispatch(initializeBlogs())
      await dispatch(notification(`updated likes of blog ${blog.title} by ${blog.author}`, 5)) 
    } catch (exception) {
      await dispatch(notification('something went wrong, please refresh the page'))
      console.log(exception)
    }
  }

  const deleteBlog = async (blog) => {
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
        await dispatch(removeBlog(blog.id))
        await dispatch(notification(`Removed blog ${blog.title} by ${blog.author}`, 5))
        await dispatch(getAllUsers())
        history.push('/')

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
                <h3>
                  {blog.title}
                </h3>
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
                <Button variant='outlined' color='primary' onClick={() => updateLikes(blog)}>
                  like
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                added by {blogUser.name}
              </TableCell>
            </TableRow>
            {blogUser.username === user.username ?
              <TableRow>
                <TableCell>
                  <Button variant='outlined' color='secondary' onClick={() => deleteBlog(blog)}>
                    remove
                  </Button>
                </TableCell>
              </TableRow>
              : null
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Blog
