import React from 'react'

const User = ({ user }) => {
  const blogs = user.blogs.length
  return (

    <tr>
      <td>{user.name}</td>
      <td></td>
      <td>{blogs}</td>
    </tr>
  )
}

export default User