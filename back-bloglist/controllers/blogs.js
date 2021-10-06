const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body


    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response, next) => {
    logger.info(request.body)
    const id = request.params.id
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = await Blog.findById(id)
    logger.info(blog.user.toString())
    if (blog.user.toString() === decodedToken.id.toString()) {
        blog.delete()
        response.status(204).end()
    }
    else {
        response.status(401).json({ error: 'invalid token' })
    }
})

blogsRouter.put('/:id', async (request, response, next) => {
    const likes = request.body.likes
    const id = request.params.id
    logger.info(request.body.likes)

    const updatedPerson =
        await
            Blog.findByIdAndUpdate(id, { likes: likes }, { new: true })
    response.json(updatedPerson)
})

module.exports = blogsRouter