const express = require("express");
const router = express.Router();
const authentication = require("../middleware/authMiddleware");
const Chat = require("../models/Chatmodel"); // Import the Chat model
const User = require("../models/UserModel"); // Import the User model
const { error } = require("console");

// @description        create or fetch one to one chat
//  @routes            post/getChat

router.post("/createChat", authentication, async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }
  // const user = await User.findById(req.user._id).select("-password");
  // console.log("Populated User:", user);

  var isChat = await Chat.findOne({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  }) .populate("username", "-password")
  .populate("lastMessage");

  isChat = await User.populate(isChat , {
    path: "lastmessage",
    populate : {
      path : "sender",
      select : "name pic"
    }
  } )
    // Populate nested path directly

  console.log("req.user._id:", req.user._id);
  console.log("userId:", userId);
  console.log("isChat:", isChat);

  if (isChat) {
    // Case: Chat already exists
    res.send(isChat);
  } else {
    // Case: Create a new chat
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);

      const fullChat = await Chat.findOne({ _id: createdChat._id })
       .populate("users", "-password")
      .populate("userAdmin", "-password")
      .populate({
        path: "lastMessage",
        populate: {
          path: "sender",
          select: "username pic"
        },
      })

      res.status(200).send(fullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});

// @description         fetch all chat
//  @routes            get/getChat

router.get("/fetchchat", authentication, async (req, res) => {
  try {
    const chat = await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate({
        path: "lastMessage",
        populate: {
          path: "sender",
          select: "username pic"
        },
      })
      .sort({ updatedAt: -1 });

    res.send({ chat });
  } catch {
    throw new Error(error.message);
  }
});

// @description        create group chat

router.post("/groupchat", authentication , async (req , res) => {

  if( !req.body.name && !req.body.users) {
    res.send("enter all the fields");
  }

  var Users = JSON.parse(req.body.users);

  if(Users.length < 2){
    res.status(400)
    .send("need minimum 2 users")
  }

  Users.push(req.user._id);

  try{
    const groupchat = await Chat.create({
       chatName : req.body.name,
       isGroupChat : true ,
       groupAdmin : req.user,
       users : Users
    })

    const fullChat = await Chat.find({_id: groupchat._id})
    .populate("users" , "-password")
    .populate("groupAdmin" , "-password")
    // .populate({
    // path : "lastMessage" ,
    // populate :{
    //     path : "sender",
    //     select : "name pic" 
    // }
    // } 
    // )

    res.status(200).send(fullChat)
  }catch (error){
      throw new error(error.message)
  }

})

router.put("/updatename", authentication, async (req, res) => {
  try {
    const { chatId, chatName } = req.body;
    console.log("Request Body:", req.body);

    const fullChat = await Chat.findByIdAndUpdate(
      chatId,
      {  chatName},
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    console.log("Updated Chat:", fullChat);

    if (!fullChat) {
      return res.status(404).json({ msg: "No such chat found" });
    }

    res.status(200).send(fullChat);
  } catch (error) {
    console.error("Error updating chat name:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
});


router.put("/adduser", async(req,res) => {
  const {userId , chatId} = req.body;

  const newUser = await Chat.findByIdAndUpdate(chatId , {
    $push: {users : userId}},
    {new : true}
  ).populate("users", "-password")
  .populate("groupAdmin" , "-password");

  if(!newUser) {
    return res.status(401).json({msg : 'failed to add'})
  }
  res.send(newUser)
})

router.put("/removeuser", async (req, res) => {
  try {
    const { userId, chatId } = req.body;

    const remove = await Chat.findByIdAndUpdate(
      chatId,
      { $pull: { users: userId } },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!remove) {
      return res.status(401).json({ msg: 'Failed to remove user' });
    }

    res.send(remove);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
});


module.exports = router;
