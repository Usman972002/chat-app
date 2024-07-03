const express = require("express");
const router = express.Router();
const conversation = require("../models/conversationModel");
const message = require("../models/messageModel");
const {getReceiverSocketId ,io} = require('../socket/socket')

router.post("/send/:receiverId", async (req, res) => {
  try {
    const { Message } = req.body;
    const { receiverId } = req.params;
    const senderId = req.user.userId;

    let conversationOfUsers = await conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversationOfUsers) {
      conversationOfUsers = await conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new message({
      senderId,
      receiverId,
      message: Message,
    });

    if (newMessage) {
      conversationOfUsers.messages.push(newMessage._id);
    }

    await Promise.all([conversationOfUsers.save(), newMessage.save()]);
    // SOCKET IO FUNCTIONALITY WILL GO HERE
		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}


    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in Sending Message", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:receiverId", async (req, res) => {
  try {
    const { receiverId } = req.params;
    const senderId = req.user.userId;

    let conversationOfUsers = await conversation
      .findOne({
        participants: { $all: [senderId, receiverId] },
      })
      .populate("messages");
    if (!conversationOfUsers) return res.status(200).json([]);
    res.status(200).json(conversationOfUsers.messages);
  } catch (error) {
    console.log("Error in Getting Message", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
