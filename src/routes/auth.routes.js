const router = require("express").Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
} = require("../controllers/auth.controllers");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout", logoutUser);

router.get("/user", getUser);

module.exports = router;
