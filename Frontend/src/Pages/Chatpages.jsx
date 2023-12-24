import React from "react";
import { Container } from "@mui/material";
import { useEffect } from "react";
import axios from "axios";
import SearchDrawer from "../components/miscellaneous/SearchDrawer";
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox"
// import {userName} from "../store/atoms/user"
// import { isLoading } from "../store/atoms/user"
import {userState} from "../store/atoms/user"
import { useRecoilValue } from 'recoil';

function Chatpage(){

    const { isLoading ,userName } = useRecoilValue(userState)

    // useEffect(() => {
        //     axios.get('http://localhost:3000/chat',{
        //         method: "GET",
        //     }).then((response) => {console.log(response.data);
        //     }).catch((error) => {console.log(error);})
        // },[])


    return(
        

    
            <div style={{width: "100%" }}>
                  {userName &&   <SearchDrawer/> }

            <Container
            sx={{
                display : "flex",
                justifyContent : "space-between",
                height : "91.5vh",
                width : "100%",
                padding : "10px"
            }}
            >
            {userName &&  <MyChats/>}
            {userName &&  <ChatBox/>}

            </Container>


            </div>
        

    )
}

export default Chatpage