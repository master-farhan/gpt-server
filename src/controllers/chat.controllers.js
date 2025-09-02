const chatModel = require("../models/chat.model");

const createChat = async (req, res) => {
  const { title } = req.body;
  const user = req.user;

  try {
    const chat = await chatModel.create({
      user: user._id,
      title,
    });
    res.status(201).json({
      message: "chat created successfully",
      chat: {
        _id: chat._id,
        user: chat.user,
        title: chat.title,
        lastActivity: chat.lastActivity,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating chat", error });
  }
};

module.exports = {
  createChat,
};
