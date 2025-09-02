const router = require("express").Router();
const { createChat } = require("../controllers/chat.controllers");
const { authMiddleware } = require("../middleware/middleware");

router.post("/", authMiddleware, createChat);

module.exports = router;
