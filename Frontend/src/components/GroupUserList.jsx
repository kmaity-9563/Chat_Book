// UserListItem.jsx

import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const GroupUserList = ({ name, pic, handelFunction }) => {
  return (
    <ListItem style={{  }}>
      <ListItemAvatar>
        <Avatar alt={name} src={pic} />
      </ListItemAvatar>
      <ListItemText primary={name} />
      <IconButton onClick={handelFunction}>
        <CloseIcon />
      </IconButton>
    </ListItem>
  );
};

export default GroupUserList;
