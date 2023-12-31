import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemButton, Box, TextField, Button, Stack, Alert } from '@mui/material';
import axios from 'axios'; 
import UserListItem from './UserListItemItem';
import { useRecoilState, useRecoilValue } from 'recoil';
import  ChatLoading  from './ChatLoading';
import { selectedChatState } from '../store/atoms/selectedChat'; // Adjust the path as needed
import {chatsState} from '../store/atoms/chat'
import {userState} from '../store/atoms/user'
// import {selectedChat} from '../store/atoms/selectedChat';

const SearchDrawer = ({ open, handleClose }) => {
  const [Loading, setLoading] = useState(false);
  const [SearchResult, setSearchResult] = useState(null);
  const [Search, setSearch] = useState('');
  const [LoadingChat, setLoadingChat] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [chatData , setChatData] = useRecoilState(chatsState)
  const [SelectedChat , SetselectedChat] = useRecoilState(selectedChatState)
  const user = useRecoilValue(userState);

  // Use Recoil for selected chat state
  // const selectedChat = useRecoilValue(selectedChatState);

  const handleSearch = async () => {
    if (!Search) {
      setLoading(true)
      setShowAlert(true); // Show alert if the search term is empty
    } else {
      setLoading(true)
      setShowAlert(false); // Hide alert if there's a search term
    }
  
    try {
      setLoading(true);
      if (!user || !user.token) {
        // Handle the case where user or user.token is not defined
        throw new Error('User or user token is not available');
      }
  
      // Make the GET request to fetch user data
      const { data } = await axios.get(`http://localhost:3000/user/alluser?search=${Search}`, {
        headers: {
          Authorization: 'Bearer ' + user.token,
        },
      });
  
      console.log("Data inside handle search:", data);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      // Log the error details for debugging
      console.error("Error loading data:", error);
      setShowAlert(true);
    }
  };
  

  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const { data } = await axios.post('http://localhost:3000/chat/fetchchat',
      {},
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        }
      );

      if (!chatData.find((c) => c._id === data._id)) setChatData([data, ...chatData]);
      SetselectedChat(data);

      setLoadingChat(false);
   
    } catch (error) {
      setShowAlert(true);
      // console.error(error);
    }
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={handleClose}
      variant='temporary'
    >
      <Box display="flex" padding="2px">
        <TextField
          id="standard-helperText"
          variant="standard"
          sx={{ paddingLeft: '15px' }}
          value={Search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <div style={{ marginTop: '10px' }}>
          <Button size="small" onClick={handleSearch}>find</Button>
        </div>
      </Box>
      <List>
        {['Inbox'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton style={{ padding: 0 }}>
              <Box
                display="flex"
                padding="2"
                component="form"
                sx={{
                  '& > :not(style)': { m: 1, width: '20ch' },
                }}
                noValidate
                autoComplete="off"
              ></Box>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {Loading ? (
        <ChatLoading />
      ) : (
        <div>
          {SearchResult?.map((user) => (
            <UserListItem key={user._id} user={user} handleFunction={() => accessChat(user._id)} />
          ))}
        </div>
      )}
      {showAlert && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="warning">This is a warning alert — check it out!</Alert>
        </Stack>
      )}
    </Drawer>
  );
};

export default SearchDrawer;
