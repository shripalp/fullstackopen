import { useState } from 'react' 
import blogService from '../services/blogs'



const Blog = ({ blog, setBlogs, blogs }) => {

  const [visible, setVisible]=useState(false)
  
  const toggleVisible = { display: visible ? 'none' : '' }
  

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
    console.log("button clicked", event.target);
    event.preventDefault();
    const response = await blogService.update(blog.id,{...blog, likes: blog.likes+1})
    const oldBlogID = blogs.findIndex(b => b.id === response.id)
    const clonedBlogs = [...blogs]
    clonedBlogs.splice(oldBlogID,1,response)
    setBlogs(clonedBlogs)
    }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={handleView}>view</button>
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
        {JSON.parse(window.localStorage.getItem('loggedBlogappUser')).name}
        </p>
                       
        </div>
        
    
  </div>
)}

export default Blog