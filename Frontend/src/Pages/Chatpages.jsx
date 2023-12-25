import React from "react";
import { Container } from "@mui/material";
import { useRecoilValue } from 'recoil';
import { userState } from "../store/atoms/user";
import SearchDrawer from "../components/miscellaneous/SearchDrawer";
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";

function Chatpage() {
  const { available } = useRecoilValue(userState);

  return (
    <div style={{ width: "100%" }}>
      {console.log(available)}
      {available && <SearchDrawer />}

      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          height: "91.5vh",
          width: "100%",
          padding: "10px",
        }}
      >
        {available && <MyChats />}
        {available && <ChatBox />}
      </Container>
    </div>
  );
}

export default Chatpage;
