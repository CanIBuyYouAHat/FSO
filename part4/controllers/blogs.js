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

blogsRouter.delete('/:id', async (request, response) => {
    const blog = await Blog.findByIdAndRemove(request.params.id)
    if (blog) {
        response.json(blog)
    } else {
        response.status(404).json
    }
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blog = new Blog ({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    response.json(updatedBlog)
})

module.exports = blogsRouter