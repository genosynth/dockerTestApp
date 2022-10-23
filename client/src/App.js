import React , {useState,useEffect} from 'react'
import LogIn from "./components/LogIn"
import SignUp from "./components/SignUp";
import './App.css';



function App() {

  
  return (
    <div className="App">
      
     <SignUp/>
     <LogIn/>
    </div>
  );
}

export default App;
