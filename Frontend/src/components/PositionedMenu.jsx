import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useRecoilValue } from 'recoil';
import { UserNameState } from '../store/atoms/user';
import ProfileModal from './ProfileModal';  // Assuming ProfileModal is a component
import { useNavigate } from 'react-router-dom';

function PositionedMenu() {
  const userName = useRecoilValue(UserNameState);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    // setAnchorEl(null);
    localStorage.setItem("token",null);
    navigate("/")
  };

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Dashboard
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <ProfileModal>
          <MenuItem onClick={handleClose}>
            <AccountCircleIcon style={{ marginRight: '8px' }} />
            {userName}
          </MenuItem>
        </ProfileModal>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

export default PositionedMenu;
