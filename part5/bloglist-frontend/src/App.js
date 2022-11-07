import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from "./components/Notification";
import loginService from './services/login'
import BlogForm from './components/Blogform';
import LoginForm from './components/Loginform';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notificationMsg, setNotificationMsg] = useState(null);
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  //const blogFormRef = useRef()
  

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

  const loginForm = () => {
   
    return (
      <Togglable buttonLabel='login'>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
    )
  }
  const createBlog = (blogObject) => {
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
  }

    const blogForm = () => {

    return (

      <Togglable buttonLabel='create'>
        <BlogForm
          createBlog={createBlog}
          
        />
      </Togglable>

    )
  }
  

  const displayBlogs = (props) => {
    return (
      <>
      {props.sort((a,b)=>b.likes-a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} setBlogs={setBlogs} blogs={blogs}/>
      )}
      </>
      )

  }

     
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
       {blogForm()}
       {displayBlogs(blogs)}

       </div>
       
       }
      
      
    </div>
  )
}

export default App
