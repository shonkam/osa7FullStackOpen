import React, { useRef } from 'react'
import { notification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'

import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router, Switch, Route, Link
} from "react-router-dom"
import CreateBlog from './CreateBlog'
import Togglable from './Togglable'
import {
  Container,
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

  const addNewBlog = (blogObject) => {

    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blogObject))
    dispatch(notification(`a new blog "${blogObject.title}" by ${blogObject.author} added`, 5))
  }

  let sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  return (
    <TableContainer component={Paper}>
      <h2>Blogs</h2>
      <Togglable buttonLabel='createNewBlog' ref={blogFormRef} id="newBlog">
        <CreateBlog
          newBlog={addNewBlog}
        />
      </Togglable>

      <Table>
        <TableBody>
          <TableRow>
            <TableCell align='center'> </TableCell>
            <TableCell align='center'> </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='left' font='bold' >blog name</TableCell>
            <TableCell align='left' font='bold' >blog author</TableCell>
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