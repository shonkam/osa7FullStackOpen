import React, { useRef } from 'react'
import { notification } from '../reducers/notificationReducer'
import { createBlog, initializeBlogs } from '../reducers/blogReducer'
import { getAllUsers } from '../reducers/usersReducer'
import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router, Switch, Route, Link
} from "react-router-dom"
import CreateBlog from './CreateBlog'
import Togglable from './Togglable'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@material-ui/core'

const Blogs = () => {

  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  const addNewBlog = async (blogObject) => {

    try {
      blogFormRef.current.toggleVisibility()
      await dispatch(createBlog(blogObject))
      await dispatch(initializeBlogs())
      await dispatch(getAllUsers())
      await dispatch(notification(`a new blog "${blogObject.title}" by ${blogObject.author} added`, 5))
    } catch (err) {
      await dispatch(notification('failed to create a new blog', 5))
      await dispatch(initializeBlogs())
      console.log(err)
    }
  }

  const cancel = () => {
    blogFormRef.current.toggleVisibility()
  }
  let sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  return (
    <TableContainer component={Paper}>
      <h2>Blogs</h2>
      <Togglable buttonLabel='createNewBlog' ref={blogFormRef} id="newBlog">
        <CreateBlog
          newBlog={addNewBlog} cancel = {cancel}
        />
      </Togglable>

      <Table>
        <TableBody>
          <TableRow>
            <TableCell align='center'> </TableCell>
            <TableCell align='center'> </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='left'>
              <h3>
                blog name
              </h3>
            </TableCell>
            <TableCell align='left'>
              <h3>
                blog author
              </h3>
            </TableCell>
          </TableRow>
          {sortedBlogs.map(blog =>
            <TableRow key={blog.id} >
              <TableCell>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title}
                </Link>
              </TableCell>
              <TableCell>
                {blog.author}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Blogs