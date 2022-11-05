import { useState } from 'react' 


const BlogForm = (props) => {
    
    const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] =useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }


  const addBlog = (event) => {
    event.preventDefault();
    props.createBlog(
        {
            title: title,
            author: author,
            url: url
          }

    )
    setTitle('')
    setAuthor('')
    setUrl('')
}
        
    return (
        <form onSubmit={addBlog}>
          <label for="title">title</label>
          <input
            id="title"
            value={title}
            onChange={handleTitleChange}
          /><br></br>
          <label for="author">author</label>
           <input
           id="author"
            value={author}
            onChange={handleAuthorChange}
          /><br></br>
          <label for="url">url</label>
           <input
           id="url"
            value={url}
            onChange={handleUrlChange}
          /><br></br>
          
          <button type="submit">create</button>
        </form>  
      )
}

  export default BlogForm