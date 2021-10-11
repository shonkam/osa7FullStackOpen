import React, { useState, useImperativeHandle } from 'react'
import { Button } from '@material-ui/core'


const Togglable = React.forwardRef((props, ref) => {

  const [createBlogVisible, setCreateBlogVisible] = useState(false)
  const hideWhenVisible = { display: createBlogVisible ? 'none' : '' }
  const showWhenVisible = { display: createBlogVisible ? '' : 'none' }

  const toggleVisibility = () => {
    setCreateBlogVisible(!createBlogVisible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div></div>
      <div style={hideWhenVisible}>
        <Button variant='outlined' color='primary' type='submit' onClick={() =>
          setCreateBlogVisible(true)}>
          new blog
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
      </div>
    </div >
  )
})

Togglable.displayName = 'Togglable'

export default Togglable