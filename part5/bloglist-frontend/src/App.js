import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from "./components/Notification";
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] =useState('')
  const [notificationMsg, setNotificationMsg] = useState(null);
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])



  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )


  const blogForm = () => (
    <form onSubmit={createBlog}>
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

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationMsg({
        text: 'wrong username or password',
        type: "error",
      })
      setTimeout(() => {
        setNotificationMsg(null)
      }, 5000)
    }
  }

  const handleLogout =  () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(window.localStorage.getItem('loggedBlogappUser'))
  }

  const createBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title: title,
      author: author,
      url: url
    };

    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));
        setNotificationMsg({
          text: `${blogObject.title} by ${user.username} added`,
          type: 'notification',
        });
        setTimeout(() => {
          setNotificationMsg(null);
        }, 5000);

        
      })
      .catch((error) => {
        setNotificationMsg({
          text: `${error.message}`,
          type: 'error',
        });
        setTimeout(() => {
          setNotificationMsg(null);
        }, 5000);
        
      });

    console.log("button clicked", event.target);
  };

  const handleTitleChange = (event) => {
    console.log(event.target.value);
    //console.log("new title is...", newTitle);
    setTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    console.log(event.target.value);
    //console.log("new note is...", newNote);
    setAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    console.log(event.target.value);
    //console.log("new note is...", newNote);
    setUrl(event.target.value);
  };

  return (
    <div>
      <h2>blogs</h2>
      {notificationMsg !== null ? <Notification msg={notificationMsg} /> : null}
      {user === null ?
      loginForm() :
      
      <div>
       <p>
        {user.name} logged-in
        <button onClick={handleLogout}>logout</button>
       </p>
       <h2>create new</h2>
        {blogForm()}
        {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      </div>
                 
       }
      
      </div>
  )
}

export default App
