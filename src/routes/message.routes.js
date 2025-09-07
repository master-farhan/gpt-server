const express = require("express");
const router = express.Router();
const messageModel = require("../models/message.model");

// GET all messages for a specific chat
// Example route: /api/messages/:chatId
router.get("/:chatId", async (req, res) => {
  try {
    const { chatId } = req.params;

    const messages = await messageModel
      .find({ chat: chatId })
      .sort({ createdAt: 1 }) 

    res.status(200).json({
      message: "Messages fetched successfully",
      chatId,
      messages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch messages", error });
  }
});

module.exports = router;
