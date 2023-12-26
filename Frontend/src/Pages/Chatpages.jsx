import React from "react";
import { Container } from "@mui/material";
import { useRecoilValue } from 'recoil';
import { UserNameState } from "../store/atoms/user";
import SearchDrawer from "../components/miscellaneous/SearchDrawer";
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";

function Chatpage() {
  const userName = useRecoilValue(UserNameState);

  return (
    <div style={{ width: "100%" }}>
      {userName && <SearchDrawer />}

      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          height: "91.5vh",
          width: "100%",
          padding: "10px",
        }}
      >
        {userName && <MyChats />}
        {userName && <ChatBox />}
      </Container>
    </div>
  );
}

export default Chatpage;
