const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
    
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body
    
    if (body.title === undefined || body.url === undefined) {
        response.status(400).send()
    } else if (body.likes === undefined) {
        let blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: 0
        })
        const result = await blog.save()
        response.status(201).json(result)
    } else {
        let blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes
        })
        const result = blog.save()
        response.status(201).json(result)
    }
      
})

module.exports = blogsRouter