import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import { useRecoilValue } from 'recoil';
// import { userState } from '../store/atoms/user';

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

export const ProfileModal = ({ user }) => {
//   const user = useRecoilValue(userState);
  {console.log("user inside modal"+user)}
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  

  const handleButtonClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    handleOpen();
  };

  
  const handleClose = () => {
    console.log('Closing modal');
    setOpen(false);
  };
  

  return (
    <>
      <Button  onClick={ handleButtonClick}>
      <AccountCircleIcon style={{ marginRight: '8px' }} />
      {user.username}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          {user.username}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            hey its profile
          </Typography>
        </Box>
      </Modal>
    </>
  );
}

//  default ProfileModal;