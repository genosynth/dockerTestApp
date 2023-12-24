import React , {useState, useEffect} from 'react'
import axios from 'axios';
import jwt from 'jwt-decode'

function LogIn() {

  const [username , setUsername] = useState(" ")
  const [password, setPassword] = useState(" ")

  const handleChangeUsername = (event) => {
      setUsername(event.target.value)
  }

  const handleChangePassword = (event) => {
    setPassword(event.target.value)
  }

  const loggingIn = (event) => {
    event.preventDefault()

    axios.post(`http://localhost:8081/login`, { username: username, password:password })
    
    .then(res => {

      if(!res.data.token){
        return window.alert(`${res.data.error}`)
      }
      let decoded = jwt(res.data.token)
      localStorage.setItem("token", res.data.token)
      
      console.log(decoded);
      console.log(res.data);

      window.alert(`Hello ${decoded.newObj.username}`)
      setUsername("")
      setPassword("")
      window.location.reload()
    })

   
  }

  const logOut = () => {
    localStorage.removeItem("token")
  }
  
  const [logInState, setLogInState] = useState(()=>{
    if (localStorage.getItem("token")){    
      let decoded = jwt(localStorage.getItem("token"))
      return decoded.newObj.username
    }


  })


  if (localStorage.getItem("token")){
    return <form onSubmit={logOut}>
      <h1>Logged in as {logInState}</h1>
      <button type='submit'>Log Out</button>
      </form>
  }

  return (
    <form onSubmit={loggingIn}>
        <input type="text" placeholder="username" onChange={handleChangeUsername} ></input>
        <input type="password" placeholder="password" onChange={handleChangePassword} ></input>
        <button type='submit'>Log In</button>
    </form>
  )
}

export default LogIn