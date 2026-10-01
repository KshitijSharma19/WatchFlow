const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { getStreakData, logActivity } = require("../controllers/streakController");

router.get("/", protect, getStreakData);
router.post("/activity", protect, logActivity);

module.exports = router;
