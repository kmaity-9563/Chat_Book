import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Pages/Homepages';
import Chatpage from './Pages/Chatpages';
import Signup from './components/Signup'
import Login from './components/Login'
import { useEffect } from "react";
import { RecoilRoot } from 'recoil';
import { userState } from './store/atoms/user'
import axios from "axios"
// import { useHistory } from "react-router-dom";
import { useRecoilValue } from 'recoil';


function App() {

  return (
    <RecoilRoot>
      <div className="App"
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "#eeeeee"
        }}
      >
        <Router>
       {/* <initUser /> */}
          <Routes>
            <Route path={"/home"} element={<Homepage />} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"/signup"} element={<Signup />} />
            <Route path={"/chat"} element={<Chatpage />} />
          </Routes>
        </Router>
      </div>
    </RecoilRoot>
  )
}

function initUser() {
  let history = useHistory();
  const setUser = useRecoilValue(userState)

  const init = async () => {
    try {
      const response = await axios.get("http://localhost:3000/user/init", {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token"),
        }
      }
      )
      if(response.data.userName) {
        setUser({
          isLoading : false,
          userName: response.data.userName,
          token: response.data.token,
          
        })
      } else {
        history.push("/login")
        setUser({
          isLoading : false,
          userName: null,
          token : null
      })

    }
  } catch (error) {
    setUser({
      isLoading : false,
      userName: null,
      token : null
    })
  }
  
}
  useEffect(() => {
    initUser();
  }, [history , setUser]);

  return <></>
}

  export default App
