import { useState } from 'react'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from '../pages/Homepages';
import Chatpage from '../pages/Chatpages';
import Signup from '../components/Signup'
import Login from '../components/Login'
function App() {

  return (
    <div className="App" 
    style={{width: "100vw",
                height: "100vh",
                backgroundColor: "#eeeeee"
              }}
    >
    <Router>
    <Routes>
      <Route path={"/"} element={<Homepage/>}/>
      <Route path={"/login"} element={<Login/>}/>
      <Route path={"/signup"} element={<Signup/>}/>
      <Route path={"/chat"} element={<Chatpage/>}/>
    </Routes>
   </Router> 
   </div>
  )
}

export default App
