const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getDashboard,
  getContinueLearning,
} = require("../controllers/dashboardController");

router.get("/", protect, getDashboard);

router.get("/continue", protect, getContinueLearning);

module.exports = router;
