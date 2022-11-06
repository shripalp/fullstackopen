import { useState } from 'react' 

const Blog = ({ blog }) => {

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

  const handleLikes = () => {
   

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