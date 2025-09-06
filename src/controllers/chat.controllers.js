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

// Get all chats for the logged-in user
const getChat = async (req, res) => {
  const user = req.user;

  try {
    const chats = await chatModel
      .find({ user: user._id })
      .sort({ lastActivity: -1 });

    res.status(200).json({
      message: "Chats fetched successfully",
      chats: chats.map((chat) => ({
        _id: chat._id,
        user: chat.user,
        title: chat.title,
        lastActivity: chat.lastActivity,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching chats", error });
  }
};

module.exports = {
  createChat,
  getChat,
};
