const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const logger = require('../utils/logger')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const api = supertest(app)

const blogs = [{ _id: "5a422a851b54a676234d17f7", title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7, __v: 0 }, { _id: "5a422aa71b54a676234d17f8", title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 5, __v: 0 }, { _id: "5a422b3a1b54a676234d17f9", title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12, __v: 0 }, { _id: "5a422b891b54a676234d17fa", title: "First class tests", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", likes: 10, __v: 0 }, { _id: "5a422ba71b54a676234d17fb", title: "TDD harms architecture", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", likes: 0, __v: 0 }, { _id: "5a422bc61b54a676234d17fc", title: "Type wars", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", likes: 2, __v: 0 }
]

let token = null

beforeEach(async () => {

  await User.deleteMany({})
  const saltRounds = 10
  const passwordHash = await bcrypt.hash("password", saltRounds)
  let userObject = new User({
    username: "test username",
    name: "test name",
    passwordHash,
    blogs: "5fde09bda3bb340dd8e8756e"
  })

  await userObject.save()

  let userId = userObject._id

  await Blog.deleteMany({})
  let blogObject = new Blog(blogs[0])
  await blogObject.save()
  blogObject = new Blog(blogs[1])
  await blogObject.save()
  blogObject = new Blog(blogs[2])
  await blogObject.save()
  blogObject = new Blog(blogs[3])
  await blogObject.save()
  blogObject = new Blog(blogs[4])
  await blogObject.save()
  blogObject = new Blog(blogs[5])
  await blogObject.save()

  blogObject = new Blog({
    user: userId,
    title: 'to be deleted',
    author: 'delet',
    url: 'jifcdalsjkldasjlk',
    likes: 1,
    _id: "5fde09bda3bb340dd8e8756e"

  })
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are seven notes', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(blogs.length + 1)
})

test('correct blog id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('adding blog', async () => {
  const newBlog = {
    title: 'title of new blog',
    author: 'author of new blog',
    url: 'url of new blog',
    likes: 5,
  }

  const user =
    await api
      .post('/api/login')
      .send({ username: "test username", password: "password" })

  token = user.body.token
  const count = blogs.length + 2
  const response =
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
  expect(response.status).toBe(201)
  const res = await api.get('/api/blogs')

  expect(res.body).toHaveLength(count)
  expect(res.body[count - 1].title).toContain('title of new blog')
})

test('likes has value', async () => {
  const newBlog = {
    title: 'title of new blog',
    author: 'author of new blog',
    url: 'url of new blog'
  }
  const user =
    await api
      .post('/api/login')
      .send({ username: "test username", password: "password" })

  token = user.body.token

  const response =
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
  expect(response.body.likes).toBe(0)
})

test('post fails if no title or url', async () => {
  const newBlog = {

    author: 'author of new blog',
    url: 'url of new blog'
  }

  const user =
    await api
      .post('/api/login')
      .send({ username: "test username", password: "password" })

  token = user.body.token

  const response =
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)

  expect(response.status).toBe(400)
})

test('deleting blog', async () => {

  const id = "5fde09bda3bb340dd8e8756e"

  const user =
    await api
      .post('/api/login')
      .send({ username: "test username", password: "password" })

  token = user.body.token

  const response =
    await api
      .delete(`/api/blogs/${id}`)
      .set('Authorization', `bearer ${token}`)

  expect(response.status).toBe(204)
})


test('change likes', async () => {
  const updatePerson = {
    id: '5a422aa71b54a676234d17f8',
    likes: 99,
  }

  const response =
    await api
      .put(`/api/blogs/${updatePerson.id}`)
      .send(updatePerson)
  expect(response.status).toBe(200)
  expect(response.body.likes).toBe(99)
})

test('Post fails if no token', async () => {
  const newBlog = {
    title: 'title of new blog',
    author: 'author of new blog',
    url: 'url of new blog',
    likes: 5,
  }

  const response =
    await api
      .post('/api/blogs')
      .send(newBlog)

  expect(response.text).toContain('invalid token')
  expect(response.status).toBe(401)
})

afterAll(() => {
  mongoose.connection.close()
})