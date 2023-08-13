const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
let blogs = 0

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
})

describe('with initial blogs', () => { 

    test('number of blogs is correct', async () => {
        const response  = await api
            .get('/api/blogs')
            .expect(200)
        expect(response.body).toHaveLength(blogs)   
    })

    test('id is defined', async () => {
        const response = await api
            .get('/api/blogs')
            .expect(200)
        expect(response.body[0].id).toBeDefined()
    })
    
})

describe('no inital blogs needed', () => {

    test('add new blog', async () => {
        const blog = {
            "title": "new Blog",
            "author": "me",
            "url": "http://example.com",
            "likes": 5
        }

        await api
            .post('/api/blogs')
            .send(blog)
            .expect(201)
        
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(blogs + 1)
        blogs += 1
    }, 10000)

    test('default likes value', async () => {
        const blog = {
            "title": "new Blog",
            "author": "me",
            "url": "http://example.com"
        }

        await api
            .post('/api/blogs')
            .send(blog)
            .expect(201)
            
        const response = await api
            .get('/api/blogs')
            .expect(200)
        expect(response.body[blogs].likes).toBe(0)
        
    }, 10000)

    test('add blog missing title or url', async () => {
        const blog1 = {
            "author": "me",
            "url": "http//example.com",
            "likes": 0
        }

        const blog2 = {
            "title": "this is title",
            "author": "me",
            "likes": 0
        }

        await api
            .post('/api/blogs')
            .send(blog1)
            .expect(400)

        await api
            .post('/api/blogs')
            .send(blog2)
            .expect(400)
    }, 10000)

    test('add then delete blog', async () => {
        // const initBlogs = (await Blog.find({})).length()

        const blog = {
            "title": "goodbye",
            "author": "me",
            "url": "http://asdf.com",
            "likes": 100
        }

        const id = await api
            .post('/api/blogs')
            .send(blog)
        
        await api
            .delete(`/api/blogs/${id.id}`)
            .expect(204)

        await api
            .get(`/api/blogs/${id.id}`)
            .expect(404)
        
    })

    test('add then change likes of a blog', async () => {
        const blog = {
            "title": "goodbye",
            "author": "me",
            "url": "http://asdf.com",
            "likes": 100
        }

        await api
            .post('api/blog')
            .send(blog)

        const updatedBlog = {
            "title": "goodbye",
            "author": "me",
            "url": "http://asdf.com",
            "likes": 200
        }
        
        await api
            .put(`api/blog/${id.id}`)
            .send(updatedBlog)

        const response = await api
            .get(`api/blog/${id.id}`)
            .expect(200)

        expect(response.likes).toBe(200)
        })

})

afterAll(async () => {
    await mongoose.connection.close()
})