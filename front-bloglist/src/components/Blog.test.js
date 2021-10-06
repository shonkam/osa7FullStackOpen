import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  const mockHandler = jest.fn()

  const blog = {
    author: 'blog author',
    title: 'blog title',
    url: 'blog url',
    likes: 99,
    user: [{
      username: 'username'

    }]
  }

  const user = {
    username: 'username'
  }

  beforeEach(() => {
    component = render(
      <Blog key={blog.id} blog={blog} user={user} updateLikes={mockHandler} deleteBlog={mockHandler} />
    )
  })

  test('renders only title and author', () => {

    expect(component.container).toHaveTextContent(
      'blog title by blog author'
    )
    expect(component.container).not.toHaveTextContent(
      'blog url'
    )
  })


  test('renders also likes and url when pressed view', () => {

    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
      'blog url'
    )
  })


  test('check that like button works', () => {
    const painike = component.getByText('view')
    fireEvent.click(painike)

    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })

})
