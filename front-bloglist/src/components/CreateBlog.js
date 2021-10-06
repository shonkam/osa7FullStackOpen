import React, { useState } from 'react'
import PropTypes from 'prop-types'

const CreateBlog = ({ newBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState('')

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }
  const handleLikesChange = (event) => {
    setLikes(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    newBlog({
      title: title,
      author: author,
      url: url,
      likes: likes
    })

    setAuthor('')
    setTitle('')
    setUrl('')
    setLikes('')
  }

  return (
    <div>
      <h2>create new blog</h2>

      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            value={title}
            id='title'
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author:
          <input
            value={author}
            id="author"
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url:
          <input
            value={url}
            id="url"
            onChange={handleUrlChange}
          />
        </div>
        <div>
          likes:
          <input
            value={likes}
            id="likes"
            onChange={handleLikesChange}
          />
        </div>
        <button type="submit" id="create">create</button>
      </form>
    </div >
  )
}

CreateBlog.propTypes = {
  newBlog: PropTypes.func.isRequired
}

export default CreateBlog