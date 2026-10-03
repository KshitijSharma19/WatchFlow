const express = require("express");
const router = express.Router();
const { submitFeedback } = require("../controllers/feedbackController");
const optionalAuth = require("../middleware/optionalAuth");

// Optional auth so users can submit feedback even if not strictly logged in, or with their attached session
router.post("/", optionalAuth, submitFeedback);

module.exports = router;
