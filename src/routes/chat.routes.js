const router = require("express").Router();
const { createChat, getChat } = require("../controllers/chat.controllers");
const { authMiddleware } = require("../middleware/middleware");

router.post("/", authMiddleware, createChat);
router.post("/get", authMiddleware, getChat);

module.exports = router;
