import React from "react";
import { Container } from "@mui/material";
import { useRecoilValue, useRecoilState } from 'recoil';
import { userState } from "../store/atoms/user";

import Header from "../components/Header";
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";

function Chatpage() {
  
  const user = useRecoilValue(userState);

  return (
    <div style={{ width: "100%" }}>
      {console.log(user)}
      {user && <Header />}

      <Container
        sx={{
          display: "flex",
          flexDirection: "row",  // Set to "row" to align components horizontally
          justifyContent: "space-between",
          height: "91.5vh",
          width: "100%",
          padding: "10px",
          // paddingLeft: "-5px",
          // paddingLeft: 0, 
          marginLeft: "0",  // Adjust the left margin as needed
        }}
      >
        {user && <MyChats />}
        {user && <ChatBox />}
      </Container>
    </div>
  );
}

export default Chatpage;
