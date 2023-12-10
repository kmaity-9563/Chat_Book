import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import { Card } from "@mui/material";
import { useState } from "react";
import axios from "axios";
// import { BASE_URL } from "../config.js";
import { useNavigate } from "react-router-dom";
// import { useSetRecoilState } from "recoil";
// import { userState } from "../store/atoms/user.js";

function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // const navigate = useNavigate()
    // const setUser = useSetRecoilState(userState);

    const submitHandler = async () => {
        if (!username || !password) {
            alert('All fields are required');
            return;
        }
        try {
            const response = await fetch("http://localhost:3000/user/signup", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });
    
            const data = await response.json();
            console.log(data);
            localStorage.setItem("token", data.token);
        } catch (error) {
            console.error("Axios request failed:", error);
        }
        // window.location = "/"
        // setUser({userEmail: email, isLoading: false})
        // navigate("/courses")
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", marginLeft: "100" }}>
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
                <Card variant="outlined" style={{ width: 400, padding: 20, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                    <TextField
                        onChange={(event) => {
                            setUsername(event.target.value);
                        }}
                        fullWidth={true}
                        label="Email"
                        variant="outlined"
                    />
                    <br/><br/>
                    <TextField
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        fullWidth={true}
                        label="Password"
                        variant="outlined"
                        type={"password"}
                    />
                    <br/><br/>

                    <Button
                        size={"large"}
                        variant="contained"
                        onClick={submitHandler}
                    > Signup</Button>
                </Card>
            </div>
        </div>
    );
}

export default Signup;
