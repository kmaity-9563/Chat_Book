import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';

const UserBadge = ({ name, pic, handelFunction }) => {
  return (
    <Stack spacing={1} direction="row">
      <Chip
        avatar={<Avatar alt={name} src={pic} />}
        label={name}
        onDelete={handelFunction}
        color="primary"
        variant="outlined"
        style={{ marginRight: '8px' }}
      />
    </Stack>
  );
};

export default UserBadge;
