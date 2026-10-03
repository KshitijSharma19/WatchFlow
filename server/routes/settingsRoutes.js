const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getProfile,
  updateProfile,
  updatePassword,
  getLeetcodeStats,
} = require("../controllers/settingsController");

router.get("/profile", protect, getProfile);

router.put("/profile", protect, updateProfile);

router.put("/password", protect, updatePassword);

router.get("/leetcode/:username", protect, getLeetcodeStats);

module.exports = router;
