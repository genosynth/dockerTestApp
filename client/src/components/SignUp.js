import React , {useState} from 'react'
import axios from 'axios';

function SignUp() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const updateUsername = event => {
        setUsername(event.target.value);
     };

     const updatePassword = event => {
        setPassword(event.target.value);
     };


     const registration = (event) =>{
        event.preventDefault()
        let user = {username, password}
        axios.post(`http://localhost:8081/sign`,  user )
        .then(res => {
          if (!res.data.username){
            return window.alert("Username already in use!")
          }

          window.alert("User registered")
          console.log(res);
          console.log(res.data);
        })
    }
     


  return (
    <form onSubmit={registration}>
        
        <input type="text" placeholder='username'onChange={updateUsername} value={username}></input>
        <input type="password" placeholder='password' onChange={updatePassword} value={password}></input>
        <input type="password" placeholder='confirm password'></input>
        <button type='submit'>Sign Up</button>
    </form>
  )
}

export default SignUp