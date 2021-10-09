import React from 'react'
import { useSelector } from 'react-redux'
import {
  BrowserRouter as Router, Switch, Route, Link
} from "react-router-dom"

const Users = () => {
  const users = useSelector(state => state.users)

  if (!users) {
    return null
  }
  return (

    <div>
      <h2>Users</h2>
      <ul>
        name blogs created
        {users.map(user =>
          <li key={user.id} >
            
            <Link to={`/users/${user.id}`}> {user.name} </Link>
            {user.blogs.length}
          </li>
        )}
      </ul>
    </div>
  )
}

export default Users