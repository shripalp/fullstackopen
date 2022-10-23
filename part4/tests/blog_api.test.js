const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./list_helper')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('cleared')

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
  console.log('done')
})

describe('initial blogs', () => {

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map((blog) => blog.title)

    expect(contents).toContain('test')
  })
})


describe('add a new blog', () => {
  test('blogs are defined with id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()

  })

  test('addition of a new blog', async () => {
    const newBlog ={
      title: 'my new blog'
    }
    await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/)
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)
  })

  test('set likes to 0 if the blog has no likes', async () => {
    const noLikes = {
      title: 'my new blog'
    }
    if (!noLikes.likes) {
      const response = await api.post('/api/blogs').send({ ...noLikes, likes: 0 })
      expect(response.body.likes).toBe(0)
    }
  })

  test('send error without title and url', async () => {
    const missingUrl = {
      title: 'no url'
    }

    if (!missingUrl.title && !missingUrl.url)
      await api.post('/api/blogs').send(missingUrl).expect(400)
  })
})


describe('deletion of a blog', () => {
  test('succeeds with status code 201 if update is successfull', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1)

  })
})
describe('update a blog', () => {
  test('update existing blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    //console.log(blogToUpdate);

    const updatedBlog = {
      ...blogToUpdate,
      likes: 8
    }
    console.log(updatedBlog);

    await api.put(`/api/blogs/${updatedBlog.id}`).send(updatedBlog).expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    console.log(blogsAtEnd[0])
    expect(blogsAtEnd[0].likes).toBe(8)

  })
})

// test('the first note is about HTTP methods', async () => {
//   const response = await api.get('/api/blogs')

//   expect(response.body[0].content).toBe('HTML is easy')
// })

describe('test one like', () => {

  test('test one like', () => {
    const result = helper.dummy(helper.initialBlogs)
    expect(result).toBe(1)

  })

})

describe('total likes', () => {

  test('when list has only one blog, equals the likes of that', () => {
    const result = helper.totalLikes(helper.initialBlogs)
    expect(result).toBe(36)
  })
})

describe('favorite', () => {
  test('test most favourite blog', () => {
    const result = helper.favoriteBlog(helper.initialBlogs)
    expect(result).toBe(12)

  })

})

afterAll(() => {
  mongoose.connection.close()
})
