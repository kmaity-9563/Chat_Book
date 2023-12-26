import React from "react";
import { useState } from "react";
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Box from '@mui/system/Box';
import { Typography } from "@mui/material";
import PositionedMenu from './PositionedMenu'

const SearchDrawer = () => {
  const [search, setSearch] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{display : "flex", justifyContent : "space-between",  alignItems:"center" , background: "#F3F3F3",width : "100%",}}>
    <div style={{
      display : "flex",
      alignItems: "center",
      width : "200px",
      color : "black" , 
      paddingTop: 5,   
      paddingLeft: 5,
       borderWidth: "5px", bgcolor: 'primary.main',
      '&:hover': { bgcolor: 'primary.dark', }, 
      
    }}>
      <Tooltip title="Search" placement="bottom">
        <Button>
          <FontAwesomeIcon icon={faSearch} />
        </Button>
      </Tooltip>
      <Tooltip title="Search" placement="bottom">
        <Button onClick={handleClickOpen}>
          Search User
        </Button>
      </Tooltip>
    </div>
    <Typography variant="h5" fontFamily="sans-serif" paddingRight={"100px"}>
      Chat Book
    </Typography>
    <div >
      <PositionedMenu />
      </div>
    </div>
  );
}

export default SearchDrawer;
