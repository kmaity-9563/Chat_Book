import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Card, Typography } from "@mui/material";
import {useState} from "react";
import { styled } from "@mui/material/styles";
// import Button from '@mui/material/Button';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
// import { BASE_URL } from "../config.js";
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
// import { json } from "stream/consumers";
import {userState} from "../store/atoms/user";
import { useSetRecoilState } from "recoil";
import { useEffect } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [Loading,setLoading] = useState(false);
  const [Pic,setPic] = useState("")
  // const [errormessage, setErrormessage] = useState("");
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);



  
  const submitHandler = async() => {
    
    try {
      if (!username || !password) {
        throw new Error('Please enter both username and password');
      }

      const response = await axios.post('http://localhost:3000/user/login', {
        username: username,
        password: password,
      });

      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log(response.data.token);
     
      localStorage.setItem('token', response.data.token);
      setUser((prevUser) => ({
        ...prevUser,
        available: true,
      }));
      {console.log(setUser.available)}
      // navigate('/chat');
    } catch (error) {
      console.error('Error during login:', error);
      // setErrorMessage(error.message);
    }

}
useEffect(() => {
  console.log('Updated userName:', setUser.available);
}, [setUser.userName]);

    const handleFileChange = (pic) => {
      // setLoading(true);
      if (!pic) {
    return <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity="error">Please select a file</Alert>
    </Stack>;
}
      console.log('Selected file:', pic);

      if(pic.type === "image/jpeg" || pic.type === "image/png") {
          const data = new FormData();
          data.append("file",pic);
          data.append("upload_preset", "ur1moazb");
          data.append("cloud_name", "dabfubfpy");
          fetch("https://api.cloudinary.com/v1_1/dabfubfpy/image/upload", {
            method : "POST",
            body : data
          }).then(res => res.json())
          .then(data => {
            setPic(data.url.toString());
            console.log(data.url.toString())
            // setLoading(false);
          }).catch(err => {
            console.error(err);
            // setLoading(false);
          })
      } else {
        <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity="error">This is an error alert — check it out!</Alert>
      </Stack>
      return
      }
    };

  

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });


  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        marginLeft: "100",
      }}
    >
      {/* <div style={{
                paddingTop: 150,
                marginBottom: 10,
                display: "flex",
                justifyContent: "center"
            }}>
                <Typography variant={"h6"}>
                Welcome to Coursera. Sign up below
                </Typography>
            </div> */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card
          varint={"outlined"}
          style={{
            width: 400,
            padding: 20,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
          }}
        >
          <TextField
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            fullWidth={true}
            label="username"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            fullWidth={true}
            label="Password"
            variant="outlined"
            type={"password"}
          />

          <br />
          <br />
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            // onChange={(e) => postDetails(e.target.files[0])}
          >
            Upload Dp
            <VisuallyHiddenInput type="file" accept="image/*"
             onChange={(e) => handleFileChange(e.target.files[0])} />
          </Button>
          <br />
          <br />

          <Button
            size={"large"}
            variant="contained"
            // onClick={submitHandler}
            onClick={ submitHandler }
          >
           
            Login
          </Button>
        </Card>
      </div>
    </div>
  );
}



export default Login;