import React from 'react';
import { ListItem, ListItemButton, ListItemText, Avatar, Typography, Box } from '@mui/material';

const UserListItem = ({ name, pic, handleFunction }) => {
  return (
    <ListItem disablePadding sx={{ marginBottom: 1 }}>
      <ListItemButton style={{ padding: 1 }} onClick={handleFunction}>
        <Avatar size="small" alt={name} src={pic} />
        <Box ml={2}>
          <ListItemText>
            <Typography variant="subtitle1">{name}</Typography>
            {/* Additional user details can be accessed like: */}
            {/* <Typography variant="body2">
              <b>Email:</b> {email}
            </Typography> */}
          </ListItemText>
        </Box>
      </ListItemButton>
    </ListItem>
  );
};

export default UserListItem;
