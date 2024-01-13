// import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { selectedChatState } from '../store/atoms/selectedChat';
import { useRecoilState, useRecoilValue } from 'recoil';
import GroupUserList from './GroupUserList';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import React, { useState } from 'react';
import { userState } from '../store/atoms/user';
import axios from 'axios';
import LoadingSkeleton from './LoadingSkeleton copy';
import UserListItem from './UserListItem';
// import { userName } from '../store/selectors';


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

export const UpdatedGroupChatModal = ({ FetchAgain, setFetchAgain }) => {
  const user = useRecoilValue(userState);
  // const username = useRecoilValue(userName);
  const [selectedChat, setSelectedChat] = useRecoilState(selectedChatState);
  const [open, setOpen] = useState(false);
  const [RenameLoading, setRenameLoading] = useState(false)
  const [GroupChatName, setGroupChatName] = useState("")
  const [Loading, setLoading] = useState(false)
  const [SearchResult, setSearchResult] = useState([])

  const handleOpen = () => {
    setOpen(true);
  };

  const removeMemeber = async (usr) => {

    if (selectedChat.groupAdmin !== user._id && user._id !== usr._id) {
      console.log("you are not allowed to remove yourself")
    }

    try {
      setLoading(true)
      const response = await axios.put(
        "http://localhost:3000/chat/removeuser",
        {
          userId: usr._id,
          chatId: selectedChat._id,
        },
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      );
      console.log("remove member data",response.data);
      setLoading(false);
    } catch (error) {
      console.log(error)
    }

    setSelectedChat((prevChat) => ({
      ...prevChat,
      users: [...prevChat.users, user],
    }));
    setLoading(false);
    setFetchAgain(!FetchAgain)

    // setSelectedChat((prevMem) => ({
    //   ...prevMem,
    //   users: prevMem.users.filter((u) => u._id !== user._id),
    // }));
  };

  const leftChat = () => {

  }

  const renameGroup = async () => {
    console.log("GroupChatName", GroupChatName);
    // here is a bug only here name is changing not in my chats 
    if (!GroupChatName) return;
    try {
      const response = await axios.put(
        "http://localhost:3000/chat/updatename",
        {
          userId: user._id,
          chatName: GroupChatName
        },
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      );
      console.log("response.data inside rename group", response);
      // setSelectedChat(response)
      setSelectedChat((prevChat) => ({
        ...prevChat,
        chatName: response.data.chatName
      }))
      // handleClose(); 
      setFetchAgain(!FetchAgain)
      setRenameLoading(false)

    } catch (err) {
      console.log("error during renamong ", err)
    }
  };

  const addUser = async (user) => {
    console.log("user", user)
    console.log('selected chat details', selectedChat)

    if (selectedChat.users.find((u) => u.id === user._id)) {
      console.log("it is already present in group ")
    }

    if (selectedChat.groupAdmin._id === user._id) {
      console.log("only group admin can add someones to group")
      return;
    }

    try {
      setLoading(true);
      const response = await axios.put('http://localhost:3000/chat/adduser', {
        userId: user._id,
        chatId: selectedChat._id
      }, {
        headers: {
          Authorization: "Bearer " + user.token
        }
      }
      )
      console.log("data", response.data)

      setSelectedChat((prevChat) => ({
        ...prevChat,
        users: [...prevChat.users, user],
      }));
      setLoading(false);
      setFetchAgain(!FetchAgain)
    }

    catch (err) {
      console.log("errror during adding members", err)
    }

  }


  const handelSearch = async (search) => {
    if (!search) return;

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
  }

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
      <Button onClick={handleButtonClick}>
        <AccountCircleIcon style={{ marginRight: '8px' }} />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {/* {console.log('selected chat details', selectedChat)} */}
            {selectedChat.chatName}
            <div>
              {(selectedChat.users || []).map((User) => (
                <GroupUserList
                  key={User._id}
                  name={User.username}
                  pic={User.pic}
                  handelFunction={() => removeMemeber(User)}
                />
              ))}
            </div>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            hey its profile
          </Typography>
          <FormControl display="flex" flexDirection='column'>
            <TextField id="group-chat-name"
              label="Group Chat Name"
              variant="standard"
              value={GroupChatName}
              onChange={(e) => setGroupChatName(e.target.value)}
            />
            <Stack spacing={2} direction="row">
              <Button
                variant="contained"
                onClick={renameGroup}


              // isLoading={RenameLoading}
              >update name</Button>
            </Stack>
          </FormControl>
          <FormControl display="flex" flexDirection='column'>
            <TextField id="group-chat-name"
              label="add user"
              variant="standard"
              onChange={(e) => handelSearch(e.target.value)}
            />
            {Loading ?
              (<LoadingSkeleton />) :
              (SearchResult.map((usr) => (
                <UserListItem
                  key={usr._id}
                  name={usr.username}
                  pic={usr.pic}
                  handelFunction={() => addUser(usr)}
                />
              )))
            }
          </FormControl>
          <Stack spacing={2} direction="row">
            <Button
              variant="contained"
              onClick={leftChat}
              style={{ backgroundColor: 'red', color: 'white' }}

            >leave group</Button>
          </Stack>

        </Box>
      </Modal>
    </>
  );
};




// import * as React from 'react';
// import React, { useState } from 'react';
// import Box from '@mui/material/Box';
// import FormControl from '@mui/material/FormControl';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import { selectedChatState } from '../store/atoms/selectedChat';
// import { useRecoilState, useRecoilValue } from 'recoil';
// import GroupUserList from './GroupUserList';
// import TextField from '@mui/material/TextField';
// import Stack from '@mui/material/Stack';
// import { userState } from '../store/atoms/user';
// import axios from 'axios';
// import LoadingSkeleton from './LoadingSkeleton copy';
// import UserListItem from './UserListItem';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

// export const UpdatedGroupChatModal = ({ FetchAgain, setFetchAgain }) => {
//   const user = useRecoilValue(userState);
//   const [selectedChat, setSelectedChat] = useRecoilState(selectedChatState);
//   const [open, setOpen] = useState(false);
//   const [RenameLoading, setRenameLoading] = useState(false);
//   const [GroupChatName, setGroupChatName] = useState('');
//   const [Loading, setLoading] = useState(false);
//   const [SearchResult, setSearchResult] = useState([]);

//   const handleOpen = () => {
//     setOpen(true);
//   };

//   const removeMember = async (usr) => {
//     if (selectedChat.groupAdmin !== user._id && user._id !== usr._id) {
//       console.log('You are not allowed to remove yourself');
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await axios.put(
//         'http://localhost:3000/chat/removeuser',
//         {
//           userId: usr._id,
//           chatId: selectedChat._id,
//         },
//         {
//           headers: {
//             Authorization: 'Bearer ' + user.token,
//           },
//         }
//       );
//       console.log('remove member data', response.data);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }

//     setSelectedChat((prevChat) => ({
//       ...prevChat,
//       users: prevChat.users.filter((u) => u._id !== usr._id),
//     }));
//     setFetchAgain(!FetchAgain);
//   };

//   const leftChat = () => {
//     // Add logic for leaving the chat
//   };

//   const renameGroup = async () => {
//     if (!GroupChatName) return;
//     try {
//       setRenameLoading(true);
//       const response = await axios.put(
//         'http://localhost:3000/chat/updatename',
//         {
//           userId: user._id,
//           chatName: GroupChatName,
//         },
//         {
//           headers: {
//             Authorization: 'Bearer ' + user.token,
//           },
//         }
//       );
//       console.log('response.data inside rename group', response);
//       setSelectedChat((prevChat) => ({
//         ...prevChat,
//         chatName: response.data.chatName,
//       }));
//       setFetchAgain(!FetchAgain);
//     } catch (err) {
//       console.log('error during renaming ', err);
//     } finally {
//       setRenameLoading(false);
//     }
//   };

//   const addUser = async (usr) => {
//     if (selectedChat.users.find((u) => u.id === usr._id)) {
//       console.log('User is already present in the group.');
//       return;
//     }

//     if (selectedChat.groupAdmin._id === usr._id) {
//       console.log('Only group admin can add someone to the group.');
//       return;
//     }

//     try {
//       setLoading(true);
//       await axios.put(
//         'http://localhost:3000/chat/adduser',
//         {
//           userId: usr._id,
//           chatId: selectedChat._id,
//         },
//         {
//           headers: {
//             Authorization: 'Bearer ' + user.token,
//           },
//         }
//       );

//       setSelectedChat((prevChat) => ({
//         ...prevChat,
//         users: [...prevChat.users, usr],
//       }));
//       setFetchAgain(!FetchAgain);
//     } catch (err) {
//       console.log('Error during adding members', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = async (search) => {
//     if (!search) return;

//     try {
//       setLoading(true);
//       console.log('Search triggered');
//       const response = await axios.get(
//         `http://localhost:3000/user/alluser?search=${search}`,
//         {
//           headers: {
//             Authorization: 'Bearer ' + user.token,
//           },
//         }
//       );
//       console.log(response.data);
//       setSearchResult(response.data);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleButtonClick = (event) => {
//     event.preventDefault();
//     event.stopPropagation();
//     handleOpen();
//   };

//   const handleClose = () => {
//     console.log('Closing modal');
//     setOpen(false);
//   };

//   return (
//     <>
//       <Button onClick={handleButtonClick}>
//         <AccountCircleIcon style={{ marginRight: '8px' }} />
//       </Button>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//           <Typography id="modal-modal-title" variant="h6" component="h2">
//             {selectedChat.chatName}
//             <div>
//               {(selectedChat.users || []).map((usr) => (
//                 <GroupUserList
//                   key={usr._id}
//                   name={usr.username}
//                   pic={usr.pic}
//                   handelFunction={() => removeMember(usr)}
//                 />
//               ))}
//             </div>
//           </Typography>
//           <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//             Hey, it's a profile.
//           </Typography>
//           <FormControl display="flex" flexDirection="column">
//             <TextField
//               id="group-chat-name"
//               label="Group Chat Name"
//               variant="standard"
//               value={GroupChatName}
//               onChange={(e) => setGroupChatName(e.target.value)}
//             />
//             <Stack spacing={2} direction="row">
//               <Button
//                 variant="contained"
//                 onClick={renameGroup}
//                 disabled={RenameLoading}
//               >
//                 Update Name
//               </Button>
//             </Stack>
//           </FormControl>
//           <FormControl display="flex" flexDirection="column">
//             <TextField
//               id="group-chat-name"
//               label="Add User"
//               variant="standard"
//               onChange={(e) => handleSearch(e.target.value)}
//             />
//             {Loading ? (
//               <LoadingSkeleton />
//             ) : (
//               SearchResult.map((usr) => (
//                 <UserListItem
//                   key={usr._id}
//                   name={usr.username}
//                   pic={usr.pic}
//                   handelFunction={() => addUser(usr)}
//                 />
//               ))
//             )}
//           </FormControl>
//           <Stack spacing={2} direction="row">
//             <Button
//               variant="contained"
//               onClick={leftChat}
//               style={{ backgroundColor: 'red', color: 'white' }}
//             >
//               Leave Group
//             </Button>
//           </Stack>
//         </Box>
//       </Modal>
//     </>
//   );
// };
