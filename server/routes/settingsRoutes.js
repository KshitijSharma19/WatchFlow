const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getProfile,
  updateProfile,
  updatePassword,
} = require("../controllers/settingsController");

router.get("/profile", protect, getProfile);

router.put("/profile", protect, updateProfile);

router.put("/password", protect, updatePassword);

module.exports = router;
