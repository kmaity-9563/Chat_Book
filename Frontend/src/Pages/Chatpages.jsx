import React from "react";
import { Box, Container } from "@mui/material";
import { useRecoilValue } from 'recoil';
import { userState } from "../store/atoms/user";
import { useState } from 'react';
import Header from "../components/Header";
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";

function Chatpage() {
  const user = useRecoilValue(userState);
  const [FetchAgain, setFetchAgain] = useState(false);

  return (
    <div style={{ width: "100%" }}>
      {user && <Header />}

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          height: "91.5vh",
          width: "100%",
          padding: "10px",
          marginLeft: "0",
        }}
      >
        {user && <MyChats FetchAgain={FetchAgain}  />}
        {user && <ChatBox FetchAgain={FetchAgain} setFetchAgain={setFetchAgain}  />}
      </Box>
    </div>
  );
}

export default Chatpage;
