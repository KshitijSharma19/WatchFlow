const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { getStreakData } = require("../controllers/streakController");

router.get("/", protect, getStreakData);

module.exports = router;
