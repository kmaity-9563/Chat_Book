import React from "react";
import { chatsState } from '../store/atoms/chat';
import { useRecoilState } from "recoil";
import SingleChat from "../components/SingleChat";

function ChatBox({ FetchAgain, setFetchAgain }) {
    const [chatData, setChatData] = useRecoilState(chatsState);

    return (
      
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    background: "white",
                    width: "100%", // Set width to 100% to take the rest of the space
                    borderRadius: "10px",
                    border: "10px solid #ccc",
                    padding: "10px",
                    marginLeft: "10px",
                    marginRight: "20px",
                    marginTop: "10px",
                }}
            >
                <SingleChat FetchAgain={FetchAgain} setFetchAgain={setFetchAgain} />
                {/* Additional content if needed */}
            </div>
       
    );
}

export default ChatBox;
