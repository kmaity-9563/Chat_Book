import React, { useEffect, useState } from 'react';
import { Drawer, List, ListItem, ListItemButton, Box, TextField, Button, Stack, Alert } from '@mui/material';
import axios from 'axios'; 
import UserListItem from './UserListItem';
import { useRecoilState, useRecoilValue } from 'recoil';
import ChatLoading from './ChatLoading';
import { chatsState } from '../store/atoms/chat';
import { userState } from '../store/atoms/user';
import { selectedChatState } from '../store/atoms/selectedChat';

const SearchDrawer = ({ open, handleClose }) => {
  const [Loading, setLoading] = useState(false);
  const [SearchResult, setSearchResult] = useState([]);
  const [Search, setSearch] = useState('');
  const [LoadingChat, setLoadingChat] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [chatData, setChatData] = useRecoilState(chatsState);
  const [SelectedChat, SetselectedChat] = useRecoilState(selectedChatState);
  const user = useRecoilValue(userState);

  const handleSearch = () => {
    setSearchResult([]);
    setShowAlert(false);
  }
// here is a bug
  useEffect(() => {
    const fetchdata = async () => {
      if (!Search) {
        setLoading(true);
        setShowAlert(true);
      } else {
        setLoading(false);
        setShowAlert(false);
      }
  
      try {
        setLoading(true);
        if (!user || !user.token) {
          throw new Error('User or user token is not available');
        }
  
        const { data } = await axios.get(`http://localhost:3000/user/alluser?search=${Search}`, {
          headers: {
            Authorization: 'Bearer ' + user.token,
          },
        });
  
        setLoading(false);
        setSearchResult(data);
      } catch (error) {
        console.error("Error loading data:", error);
        setShowAlert(true);
        setLoading(false);
      }
    };
    fetchdata();
  },[Search , user.token])

  

  const accessChat = async (userId, username) => {
    try {
      setLoadingChat(true);
      const { data } = await axios.post('http://localhost:3000/chat/createChat', { userId, username }, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (!chatData.find((c) => c._id === data._id)) {
        setChatData([data, ...chatData]);
      }
      SetselectedChat(data);

      setLoadingChat(false);
    } catch (error) {
      setShowAlert(true);
      console.error(error);
      setLoadingChat(false);
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
          {user && (
            console.log("user list component user id " + user._id + " user token " + user.token + "username" + user.username + " pic " + user.pic + "isAdmin" + user.isAdmin)
          )}
          {SearchResult && SearchResult.length > 0 && (
            SearchResult.map((searchUser) => (
              <UserListItem
                key={searchUser._id}
                name={searchUser.username}
                pic={searchUser.pic}
                handelFunction={() => accessChat(searchUser._id, searchUser.username)}
                />
            ))
          )}
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
