import React from "react";
import { Container } from "@mui/material";
import { useRecoilValue } from 'recoil';
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
          justifyContent: "space-between",
          height: "91.5vh",
          width: "100%",
          padding: "10px",
        }}
      >
        {user && <MyChats />}
        {user && <ChatBox />}
      </Container>
    </div>
  );
}

export default Chatpage;
