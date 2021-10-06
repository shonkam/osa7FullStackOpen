import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateLikes, deleteBlog, user }) => {

  const [infoVisible, setInfoVisible] = useState(false)

  const hideWhenVisible = { display: infoVisible ? 'none' : '' }
  const showWhenVisible = { display: infoVisible ? '' : 'none' }

  const toggleVisibility = () => {
    setInfoVisible(!infoVisible)
  }

  if (infoVisible === true) {
    return (
      <div style={showWhenVisible} className='blogStyle'>
        <div>{blog.title} <button onClick={toggleVisibility} id='hide'>hide</button> </div>
        <div>by {blog.author} </div>
        <div>likes {blog.likes} <button onClick={() => updateLikes(blog)} id='like'> like </button> </div>
        <div>url {blog.url} </div>

        {blog.user[0].username === user.username ?
          <div><button onClick={() => deleteBlog(blog)} id='remove'>remove</button> </div>
          : null
        }

      </div>
    )
  }
  return (
    <div style={hideWhenVisible} className='blogStyle'>
      {blog.title} by {blog.author} <button onClick={toggleVisibility} id='view'>view</button>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateLikes: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired

}

export default Blog
