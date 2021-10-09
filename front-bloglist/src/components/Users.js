import React from 'react'
import { useSelector } from 'react-redux'
import User from './User'

const Users = () => {
  const users = useSelector(state => state.users)

  if (!users) {
    return null
  }
  return (

    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th></th>
            <th>blogs created</th>
          </tr>
          {users.map(user =>
            <User key={user.id} user={user} />
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Users