import React from 'react';
import { ListItem, ListItemButton, ListItemText, Avatar, Typography, Box } from '@mui/material';

const UserListItem = ({ user, handleFunction }) => {
  return (
    <ListItem key={user._id} disablePadding>
      <ListItemButton style={{ padding: 0 }} onClick={handleFunction}>
        <Avatar size="small" alt={user.name} src={user.pic} />
        <Box ml={2}>
          <ListItemText>
            <Typography variant="subtitle1">{user.name}</Typography>
            {/* <Typography variant="body2">
              <b>Email:</b> {user.email}
            </Typography> */}
          </ListItemText>
        </Box>
      </ListItemButton>
    </ListItem>
  );
};

export default UserListItem;
