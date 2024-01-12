export const getSender = (loggedUser, users) => {
    try {
      if (
        users &&
        users._id &&
        users.users &&
        users.users.length === 2 &&
        users.users[0].username &&
        users.users[1].username
      ) {
        console.log("users", users);
        console.log("logged user", loggedUser);
  
        return loggedUser._id === users._id
          ? users.users[0].username
          : users.users[1].username;
      } else {
        console.error("Invalid users object:", users);
        return "Unknown Sender";
      }
    } catch (error) {
      console.error("Error in getSender:", error);
      return "Unknown Sender";
    }
  };

export const getSenderObject = (loggedUser, users) => {
    try {
        // Ensure users is defined and has expected properties
        if (
            users &&
            users._id &&
            users.users &&
            users.users.length === 2 &&
            users.users[0].username &&
            users.users[1].username
        ) {
            // console.log("userid " + users._id);
            console.log("logged user  " + loggedUser);
            console.log("logged user user name " + loggedUser.username);
            console.log("user  1" + users.users[0]);
            console.log("user  2" + users.users[1]);
           

            return loggedUser._id === users._id
                ? users.users[0]
                : users.users[1];
        } else {
            console.error("Invalid users object:", users);
            return "Unknown Sender";
        }
    } catch (error) {
        console.error("Error in getSender:", error);
        return "Unknown Sender";
    }
};
