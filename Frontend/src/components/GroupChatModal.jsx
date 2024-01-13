
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddIcon from '@mui/icons-material/Add';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useState, useEffect } from 'react';
import Input from '@mui/material/Input';
import axios from 'axios';
import { userState } from '../store/atoms/user';
import { useRecoilValue , useRecoilState } from 'recoil';
import UserListItem from './UserListItem';
import UserBadge from './UserBadge';
import {chatsState} from '../store/atoms/chat'
// import {selectedChatState} from '../store/atoms/selectedChat'

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

export default function GroupChatModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [GroupName, setGroupName] = useState();
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [SelectedUsers, setSelectedUsers] = useState([])
  // const [selectedChat, setSelectedChat] = useRecoilState(selectedChatState);
  const user = useRecoilValue(userState);
  const [chatData, setChatData] = useRecoilState(chatsState);

  const handelSubmit = async () => {
    if (!GroupName || !SelectedUsers || SelectedUsers.length === 0) {
      console.log("Please select group name and members");
      return;
    }
  
    try {
      const { data } = await axios.post(
        'http://localhost:3000/chat/groupchat',
        {
          name: GroupName,
          users: SelectedUsers.map((usr) => usr._id),
        },
        {
          headers: {
            Authorization: 'Bearer ' + user.token,
            'Content-Type': 'application/json',
          },
        }
      );
  
      console.log("data", data);
      // Assuming setChatData is a function to update your state with the new chat data
      setChatData((prevChatData) => [...prevChatData, data]);
      onclose();
    } catch (err) {
      console.log("Error failed to create", err);
    }
  };
  

  const handelDelete = (delUser) => {
    setSelectedUsers(SelectedUsers.filter((us) => us._id !== delUser._id))
  }

  const handelGroup = (Addusers) => {
    console.log("Create group logic here");
    if (!SelectedUsers) {
      console.log("no data inside selected user")
    }
    if (SelectedUsers.includes(Addusers)) {
      console.log("users already added")
    }
    console.log("selected users" + SelectedUsers)
    setSelectedUsers([...SelectedUsers, Addusers])
  };

  const handleSearch = (Sres) => {
    setSearch(Sres);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (search) {
        try {
          setLoading(true);
          console.log("search triggered");
          const response = await axios.get(`http://localhost:3000/user/alluser?search=${search}`, {
            headers: {
              Authorization: 'Bearer ' + user.token,
            },
          });
          console.log(response.data);
          setSearchResult(response.data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      } else {
        setSearchResult([]);
        setLoading(false);
      }
    };

    fetchData();
  }, [search, user.token]);

  return (
    <div>
      <Button
        variant="contained"
        sx={{ fontSize: { base: "17px", md: "10px", lg: "17px" } }}
        startIcon={<AddIcon />}
        onClick={handleOpen}
      >
        add user
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>

            <Typography id="modal-modal-title" variant="h6" component="h2">
              create group chat
            </Typography>

            <Input
              placeholder="set group name"
              onChange={(e) => { setGroupName(e.target.value) }}
              sx={{ marginBottom: 1 }}
            />

            <Input
              placeholder="search name here"
              onChange={(e) => { handleSearch(e.target.value) }}
              sx={{ marginBottom: 1 }}
            />

            <Button
              onClick={handelSubmit}>
              create group
            </Button>

            {console.log("SelectedUsers state:", SelectedUsers)};
            <Box style={{ display: "flex", flexDirection: "row", marginTop: "10px" }}>
              {/* Display searched users */}
              {loading ? (
                <div>loading</div>
              ) : (
                <div>
                  {searchResult && searchResult.length > 0 && searchResult
                    ?.slice(0, 3)
                    .map((searchedUser) => (
                      <UserListItem
                        key={searchedUser._id}
                        name={searchedUser.username}
                        pic={searchedUser.pic}
                        handelFunction={() => handelGroup(searchedUser)}
                      />
                    ))}
                </div>
              )}
              {/* Display selected users */}
              <div style={{ marginLeft: "20px" }}>
                {SelectedUsers.map((user) => (
                  <UserBadge
                    key={user._id}
                    name={user.name}
                    pic={user.pic}
                    handelFunction={() => handelDelete(user)}
                  />
                ))}
              </div>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
