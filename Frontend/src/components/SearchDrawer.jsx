import { Drawer, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
// import React, { useState } from 'react';
// import * as React from 'react';
// import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import ChatLoading from './ChatLoading'
import axios from 'axios'; 
// import UserListItem from '../UserAvatar/UserListItem';

const SearchDrawer = ({ open, handleClose }) => {

  const [Loading , setLoading] = useState(false);
  const [SearchResult , setSearchResult] = useState(null)
  const [Search, setSearch] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleSearch = async () => {
      if(!Search) {
        setShowAlert(true);
      } else {  setShowAlert(false);  }
      try{
        setLoading(true);
        const { data } = await axios.get(`http://localhost:3000/user/alluser?search=${Search}`, {
                headers: {
                    Authorization: 'Bearer ' + user.token
                }
            });

            setLoading(false)
            setSearchResult(data);
      } catch {
        setShowAlert(true);
          // console.error(error)
      }
     
  }

  const accesChat = (userId) => {

  }

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={handleClose}
      variant='temporary'
    >
      <Box display="flex" padding="2px">
        <TextField id="standard-helperText"
          // label="search here"
          variant="standard"
          sx={{ paddingLeft: '15px' }}
          value={Search}
          onChange={(event) => setSearch(event.target.value)} />
        <div style={{ marginTop: '10px' }} >
          <Button size="small" onClick={handleSearch}>find</Button>
        </div>
      </Box>
      <List>
        {['Inbox'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton style={{ padding: 0 }}>
              <Box display="flex" padding="2" component="form"
                sx={{
                  '& > :not(style)': { m: 1, width: '20ch' },
                }}
                noValidate
                autoComplete="off">

              </Box>
              {/* Uncomment the following if you want to include icons */}
              {/* <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon> */}
              {/* <ListItemText primary={text} /> */}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {/* {Loading ? (<ChatLoading />) :
        (SearchResult ?.map(user => (
             <UserListItem key={user._id} user={user} handleFunction={() => accesChat(user._id)} />
      )))} */}
      {showAlert && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="warning">This is a warning alert — check it out!</Alert>
        </Stack>
      )}
    </Drawer>
  );



  // return (
  //   <Drawer anchor="left" open={open} onClose={handleClose} variant="temporary">
  //     <Box display="flex" padding="2px">
  //       <TextField
  //         id="standard-helperText"
  //         variant="standard"
  //         sx={{ paddingLeft: '15px' }}
  //         value={Search}
  //         onChange={(event) => setSearch(event.target.value)}
  //       />
  //       <div style={{ marginTop: '10px' }}>
  //         <Button size="small" onClick={handleSearch}>
  //           Find
  //         </Button>
  //       </div>
  //     </Box>
  //     <List>
  //       {/* Your list items go here */}
  //     </List>
  //     {Loading ? (
  //       <ChatLoading />
  //     ) : (
  //       <Typography>
  //         {SearchResult ? (
  //           // Display your search result data here
  //           <ListItemText primary={SearchResult} />
  //         ) : (
  //           // If no search result, display a message
  //           <ListItemText primary="No search result" />
  //         )}
  //       </Typography>
  //     )}
  //     {showAlert && (
  //       <Stack sx={{ width: '100%' }} spacing={2}>
  //         <Alert severity="warning">This is a warning alert — check it out!</Alert>
  //       </Stack>
  //     )}
  //   </Drawer>
  // );

};

export default SearchDrawer;
