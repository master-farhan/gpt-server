const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function authMiddleware(req, res, next) {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded._id).select("-password -__v");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user; // এখন req.user এ safe user data থাকবে
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized", error });
  }
}

module.exports = { authMiddleware };
