const bcrypt = require("bcryptjs");

const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const userResponse = require("../utils/userResponse");

exports.registerUser = async (req, res) => {
  try {
    const { username, name, email, password } = req.body;
    const displayName = username || name;

    if (!displayName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields (name/username, email, password) are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username: displayName.trim(),
      email: normalizedEmail,
      password: hashedPassword,
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: userResponse(user),
    });
  } catch (error) {
    console.error("Auth Controller Error:", error.message);

    res.status(500).json({
      success: false,
      message: error.message || "Server error during registration",
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      token,
      user: userResponse(user),
    });
  } catch (error) {
    console.error("Auth Controller Error:", error.message);

    res.status(500).json({
      success: false,
      message: error.message || "Server error during login",
    });
  }
};
