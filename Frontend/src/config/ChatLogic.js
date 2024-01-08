export const getSender = (loggedUser, users) => {
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
            console.log("userid " + users._id);
            console.log("logged user userid " + loggedUser._id);
            console.log("user name 1" + users.users[0].username);
            console.log("user name 2" + users.users[1].username);
            console.log("logged user user name " + loggedUser.username);

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
