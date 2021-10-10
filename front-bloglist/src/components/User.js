import React from 'react'
import { useParams } from "react-router-dom"
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@material-ui/core'

const User = ({ users }) => {

  const id = useParams().id

  if (!users) {
    return null
  }

  const correctUser = users.find(i => i.id === id)
  const blogs = correctUser.blogs

  if (blogs.length === 0) {
    return (
      <div>
        <h2>{correctUser.name}</h2>
        <h4>added blogs</h4>
        <div>user hasn't added any blogs yet</div>
      </div>
    )
  }

  return (
    <div>
      <h2>{correctUser.name}</h2>
      <h4>added blogs</h4>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blogs.map(blog =>
              <TableRow key={blog.id}>
                <TableCell>
                  {blog.title}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default User