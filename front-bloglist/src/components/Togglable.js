import React, { useState, useImperativeHandle } from 'react'

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
        <button onClick={() => setCreateBlogVisible(true)}>new blog</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}


        <button onClick={() =>
          setCreateBlogVisible(false)}>cancel</button>

      </div>

    </div >
  )
})

Togglable.displayName = 'Togglable'

export default Togglable