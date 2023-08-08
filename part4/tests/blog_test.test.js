const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
let blogs = 0

test('number of blogs is correct', async () => {
    const response  = await api
        .get('/api/blogs')
        .expect(200)
    expect(response.body).toHaveLength(blogs)   
})

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

test('id is defined', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
    expect(response.body[0].id).toBeDefined()
})

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

afterAll(async () => {
    await mongoose.connection.close()
})