import React from "react";
import { useEffect } from "react";
import axios from "axios";
function Chatpage(){
    return(
        useEffect(() => {
            axios.get('http://localhost:3000/chat',{
                method: "GET",
            }).then((response) => {console.log(response.data);
            }).catch((error) => {console.log(error);})
        },[])
    )
}

export default Chatpage