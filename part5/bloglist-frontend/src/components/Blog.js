import { useState } from 'react'
import blogService from '../services/blogs'



const Blog = ({ blog, setBlogs, blogs }) => {

  const [visible, setVisible]=useState(false)

  const user = JSON.parse(window.localStorage.getItem('loggedBlogappUser')).username

  const toggleVisible = { display: visible ? 'none' : '' }


  const noDisplay = {
    display:'none'
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const handleView = () => {
    setVisible(!visible)
  }

  const handleLikes =  async (event) => {
    //console.log("button clicked", event.target);
    event.preventDefault()
    const updatedBlog = await blogService.update(blog.id,{ ...blog, likes: blog.likes+1 })
    const oldBlogID = blogs.findIndex(blog => blog.id === updatedBlog.id)
    const clonedBlogs = [...blogs]
    clonedBlogs.splice(oldBlogID,1,updatedBlog)
    setBlogs(clonedBlogs)
  }


  const removeButton = {

    background: 'dodgerblue'

  }



  const removeBlog = (event) => {
    event.preventDefault()
    const id = blog.id
    const message = `remove ${blog.title} by ${user}?`
    if (window.confirm(message) === true) {
      blogService.remove(blog.id)
        .then(setBlogs(blogs.filter((blog) => blog.id !== id)))
    }

  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        {visible ? <button onClick={handleView}>view</button> : <button onClick={handleView}>hide</button>}
      </div>
      <div style={toggleVisible}>
        <p>
          {blog.url}
        </p>
        <p>
          likes: {blog.likes}
          <button onClick={handleLikes}>like</button>
        </p>
        <p>

          {blog.user.username}
          {blog.user.username===JSON.parse(window.localStorage.getItem('loggedBlogappUser')).username? <button style={removeButton} onClick={removeBlog}>remove</button> :<button style={noDisplay} onClick={removeBlog}>add</button> }


        </p>

      </div>


    </div>
  )}

export default Blog