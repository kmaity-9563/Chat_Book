import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useRecoilValue } from 'recoil';
import { UserNameState } from '../store/atoms/user';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

 const ProfileModal = () => {
  const userName = useRecoilValue(UserNameState);
  const [open, setOpen] = React.useState(false);
  const handleOpen = (event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log('Opening modal');
    setOpen(true);
  };
  
  const handleClose = () => {
    console.log('Closing modal');
    setOpen(false);
  };
  

  return (
    <div>
      <Button onClick={handleOpen}>
      <AccountCircleIcon style={{ marginRight: '8px' }} />
      {userName}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          {userName}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            hey its profile
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default ProfileModal;