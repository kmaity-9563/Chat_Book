const express = require("express");
const router = express.Router();
const authentication = require("../middleware/authMiddleware");
const Chat = require("../models/Chatmodel"); 
const User = require("../models/UserModel"); 
const { error } = require("console");


router.post("/createChat", authentication, async (req, res) => {
  const { userId, username } = req.body;

  if (!userId || !username) {
    console.log("userId or username not sent with the request");
    return res.sendStatus(400);
  }

  try {
    let isChat = await Chat.findOne({
      isGroupChat: false,
      users: { $all: [req.user._id, userId] },
    });

    if (isChat) {
      // Case: Chat already exists
      isChat = await Chat.populate(isChat, {
        path: "users",
        select: "-password",
      });

      return res.status(200).send(isChat);
    }

    // Case: Create a new chat
    const chatData = {
      chatName: username,
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    const createdChat = await Chat.create(chatData);

    const fullChat = await Chat.findOne({ _id: createdChat._id })
      .populate({
        path: "users",
        select: "-password",
      })
      .populate({
        path: "lastMessage",
        populate: {
          path: "sender",
          select: "username pic",
        },
      });

    res.status(200).send(fullChat);
  } catch (error) {
    res.status(400);
    console.error(error);
    res.send({ error: "Error creating chat" });
  }
});

router.get("/fetchchat", authentication, async (req, res) => {
  try {
    const results = await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate({
        path: "users",
        select: "-password",
      })
      .populate("groupAdmin", "-password")
      .populate({
        path: "lastMessage",
        populate: {
          path: "sender",
          select: "username pic",
        },
      })
      .sort({ updatedAt: -1 });

    res.status(200).send(results);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});



// @description        create group chat

router.post("/groupchat", authentication , async (req , res) => {

  if( !req.body.name && !req.body.users) {
    res.send("enter all the fields");
  }

  var Users = JSON.parse(req.body.users);
  // const Users = req.body.users || [];

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
      {  chatName : chatName},
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
