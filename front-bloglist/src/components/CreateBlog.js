import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from "react-router-dom"
import {
  TextField, Button
} from '@material-ui/core'
import { useFormField } from '../hooks'

const CreateBlog = ({ newBlog, cancel }) => {

  const history = useHistory()
  const title = useFormField('title')
  const author = useFormField('author')
  const url = useFormField('url')
  const likes = useFormField('likes')

  const closeForm = async () => {
    title.reset()
    author.reset()
    url.reset()
    likes.reset()
    await cancel()
    history.push('/users')
    history.push('/')

  }
  const addBlog = async (event) => {
    event.preventDefault()
    const blogToBeAdded = {
      title: title.value,
      author: author.value,
      url: url.value,
      likes: likes.value
    }
    title.reset()
    author.reset()
    url.reset()
    likes.reset()

    await newBlog(blogToBeAdded) 
    history.push('/users')
    history.push('/')
  }

  const titleTemp = {
    title: title.value,
    onChange: title.onChange
  }

  const authorTemp = {
    author: author.value,
    onChange: author.onChange
  }

  const urlTemp = {
    url: url.value,
    onChange: url.onChange
  }

  const likesTemp = {
    likes: likes.value,
    onChange: likes.onChange
  }


  return (
    <div>
      <h2>create new blog</h2>

      <form onSubmit={addBlog}>
        <div>
          <TextField inputProps={titleTemp} label='title' />
        </div>
        <div>
          <TextField inputProps={authorTemp} label='author' />
        </div>
        <div>
          <TextField inputProps={urlTemp} label='url' />
        </div>
        <div>
          <TextField inputProps={likesTemp} label='likes' />
        </div>
        <Button variant='outlined' color='primary' type='submit' >
          create
        </Button>
        <Button variant='outlined' color='secondary' onClick={closeForm}>
          cancel
        </Button>
      </form>
    </div >
  )
}

CreateBlog.propTypes = {
  newBlog: PropTypes.func.isRequired
}

export default CreateBlog