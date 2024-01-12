import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Typography, Box } from "@mui/material";
import { selectedChatState } from '../store/atoms/selectedChat';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { getSenderObject } from "../config/ChatLogic";
import { userState } from '../store/atoms/user'
import { ProfileModal } from './ProfileModal';

function SingleChat({ FetchAgain, setFetchAgain }) {
    const [selectedChat, setSelectedChat] = useRecoilState(selectedChatState);
    const [loggedUser, setLoggedUser] = useState(null);
    const user = useRecoilValue(userState)

    useEffect(() => {
        // Use useEffect to fetch user info from localStorage once when the component mounts
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setLoggedUser(userInfo);
    }, []); // Empty dependency array means this effect runs only once

    return (
        <div>
            {selectedChat ? (
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <ChevronLeftIcon display={{ base: "flex", md: "none" }} onClick={() => setSelectedChat("")} />
                    {!selectedChat.isGroupChat ? (<div>
                        <ProfileModal user={ getSenderObject(user, selectedChat)}/>
                        {console.log("selected chat users is here", selectedChat)}
                        {console.log("logged user is here",loggedUser )}
                        {console.log("sender object", getSenderObject(loggedUser, selectedChat))}

                            {/* Access the properties of the object */}
                            <Typography>
                                {getSenderObject(loggedUser, selectedChat).username}
                            </Typography>
                       
                    </div>) : <div>
                        {console.log("selected group Chat details is herre", selectedChat)}
                        {console.log("selected group Chat name is herre", selectedChat.chatName)}
                        {selectedChat.chatName.toUpperCase()}
                        {/* {<UpdatedGroupChatModal/>} */}
                    </div>}

                </Box>
            ) : (
                <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: "100%" }}>
                    <Typography fontFamily="Work Sans" fontSize="3xl">
                        hloo chatsfghfgjnh
                    </Typography>
                </Box>
            )}
        </div>
    );
}

export default SingleChat;
