import React, { useEffect, useState } from "react";
import axios from 'axios'; 
import { userState } from "../store/atoms/user";
import { useRecoilValue, useRecoilState } from "recoil";
import { Box, Typography, Button, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ChatLoading from './ChatLoading';
import { getSender } from '../config/ChatLogic';
import { selectedChatState } from '../store/atoms/selectedChat';
import { chatsState } from '../store/atoms/chat';
import GroupChatModal from './GroupChatModal';

function MyChats({ FetchAgain }) {
    const user = useRecoilValue(userState);
    const [selectedChat, setSelectedChat] = useRecoilState(selectedChatState);
    const [chatData, setChatData] = useRecoilState(chatsState);
    const [loggedUser, setLoggedUser] = useState();
    const [loading, setLoading] = useState(false);

    const fetchChat = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:3000/chat/fetchchat', {
                headers: {
                    Authorization: "Bearer " + user.token
                }
            });
            setChatData(response.data);
        } catch (error) {
            console.error("Error fetching chat:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchChat();
        setLoggedUser(JSON.parse(localStorage.getItem("userInfo")))
    }, [user.token, FetchAgain]);

    useEffect(() => {
        // Additional actions to perform when selectedChat changes
        console.log("SelectedChat changed:", selectedChat);
        console.log("ChatData changed:", chatData);
    }, [selectedChat , chatData]);

    return (
        <Box
            display={{ base: selectedChat ? 'flex': 'none' , md: 'flex' }}
            flexDirection="column"
            alignItems="center"
            padding={3}
            width={{ base: '100%', md: '28%' }}
            bgcolor="white"
            borderRadius={1}
            borderWidth={1}
            border="10px solid #ccc"
        >
            <Stack
                pb={3}
                px={3}
                fontSize={{ base: "28px", md: "30px" }}
                fontFamily="Work sans"
                w="100%"
                justifyContent="space-between"
            >
                <div>Your Chat </div>
                <GroupChatModal>
                </GroupChatModal>
            </Stack>
            <Box
                d="flex"
                flexDir="column"
                p={3}
                bg="#F8F8F8"
                width="100%"
                height="100%"
                borderRadius="lg"
                overflowY="hidden"
            >
                {loading ? (
                    <ChatLoading />
                ) : (
                    <Stack overflowY="scroll">
                        {chatData.map((chat) => (
                            <Box
                                onClick={() => setSelectedChat(chat)}
                                cursor="pointer"
                                sx={{
                                    backgroundColor: selectedChat === chat ? "#38B2AC" : "#E8E8E8",
                                    color: selectedChat === chat ? "white" : "black",
                                    px: 3,
                                    py: 2,
                                    borderRadius: 'lg',
                                }}
                                key={chat._id}
                            >
                                <Typography>
                                    {!chat.isGroupChat ? (
                                        getSender(loggedUser, chat)
                                    ) : (
                                        chat.chatName
                                    )}
                                </Typography>
                            </Box>
                        ))}
                    </Stack>
                )}
            </Box>
        </Box>
    );
}

export default MyChats;
