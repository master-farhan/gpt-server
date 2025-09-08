const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// helper → generateToken & setCookie
function generateTokenAndSetCookie(userId, res) {
  const token = jwt.sign({ _id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d", // ✅ 7 days expiry
  });

  res.cookie("token", token, {
    httpOnly: true,       // XSS attack থেকে নিরাপদ
    secure: true,         // ✅ production এ অবশ্যই true (localhost এ false দিতে পারো)
    sameSite: "None",     // ✅ cross-origin cookies allow করবে (client=http://localhost:5173)
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
  });

  return token;
}

// register user
async function registerUser(req, res) {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await userModel.create({
      fullName: { firstName, lastName },
      email,
      password: await bcrypt.hash(password, 10),
    });

    generateTokenAndSetCookie(user._id, res);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
}

// login user
async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in user", error });
  }
}

// logout user
async function logoutUser(req, res) {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });
  res.status(200).json({ message: "User logged out successfully" });
}

// get logged-in user
const getUser = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by ID
    const user = await userModel.findById(decoded._id).select("-password -__v");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = { registerUser, loginUser, logoutUser, getUser };
