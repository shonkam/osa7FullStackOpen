import React from 'react'
import { useSelector } from 'react-redux'
import {
  BrowserRouter as Router, Switch, Route, Link
} from "react-router-dom"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@material-ui/core'

const Users = () => {
  const users = useSelector(state => state.users)

  if (!users) {
    return null
  }
  return (
    <div>
      <h2>Users</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <h3>
                  name
                </h3>
              </TableCell>
              <TableCell>
                <h3>
                  blogs created
                </h3>
              </TableCell>
            </TableRow>
            {users.map(user =>
              <TableRow key={user.id} >
                <TableCell>
                  <Link to={`/users/${user.id}`}> {user.name} </Link>
                </TableCell>
                <TableCell>
                  {user.blogs.length}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Users