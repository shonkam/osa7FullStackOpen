import React from 'react'
import { useParams } from "react-router-dom"

const User = ({ users }) => {
  
  const id = useParams().id
  
  if (!users) {
    return null
  }

  const correctUser = users.find(i => i.id === id)
  const blogs = correctUser.blogs

  if(blogs.length === 0){
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
      <ul>
        {blogs.map(blog =>
          <li key={blog.id}>
            {blog.title}
          </li>
        )}
      </ul>
    </div>
  )
}

export default User