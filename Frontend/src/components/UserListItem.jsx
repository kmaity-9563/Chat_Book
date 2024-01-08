
import React from 'react';
import { ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Box } from '@mui/material';

const UserListItem = ({ name, pic, handelFunction }) => {

  
  return (
    <ListItem
      // button
      onClick={handelFunction}
      
      sx={{
        cursor: 'pointer',
        backgroundColor: '#E8E8E8',
        '&:hover': {
          backgroundColor: '#38B2AC',
          color: 'white',
        },
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        color: 'black',
        paddingX: 3,
        paddingY: 2,
        marginBottom: 2,
        borderRadius: 'lg',
      }}
    >
      <ListItemAvatar>
        <Avatar
          size="small"
          sx={{ cursor: 'pointer' }}
          alt={name}
          src={pic}
        />
      </ListItemAvatar>
      <Box>
        <ListItemText>
          <Typography variant="body1">{name}</Typography>
          
        </ListItemText>
      </Box>
    </ListItem>
    
  );
};

export default UserListItem;




