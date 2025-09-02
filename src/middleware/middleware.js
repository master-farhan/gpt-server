const userModel = require("../models/user.model");

async function authMiddleware(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await userModel.findById(decoded._id);
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized", error });
  }

  next();
}

module.exports = { authMiddleware };
