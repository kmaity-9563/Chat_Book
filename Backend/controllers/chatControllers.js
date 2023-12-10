// const express = require('express')
// const Chat = require('../models/Chatmodel');
// const User = require('../models/UserModel')

// // @description        create or fetch one to one chat
// // @routes            /getChat

// const getChat = async(req,res) => {
//     const {userId} = req.body;

//     if(!userId) {
//         res.status(404).json({message:'userid not found'})
//     }

//     var ChatExists = await Chat.find({
//         isGroupChat: false ,
//        users : {$all : [req.user._id, userId]}
//     })
//     // .populate("users" , "-password")
//     // .populate("latestMessage")

//     if (ChatExists) {
//         res.status(200).json(ChatExists)
//     }
//     else {
//         try{
//         const chatData = [{
//             users : [req.user._id, userId],
//             chatName : "sender",
//             isGroupChat : false
//         }]

//         const createChat = await Chat.create(chatData);

//         const fullChat = await Chat.findOne({_id : createChat._id}).populate('users', '-password');
//         res.status(200).json(fullChat)
//     } catch {
//         res.status(404).json({message: 'Error creating'})
//     }

//     }

//     // isChat = await User.populate(isChat , { 
//     //         path : "latestMessage.sender",
//     //         select : "name pic"
//     // });
// }



// module.exports = {
//     getChat
// }