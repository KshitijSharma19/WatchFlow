const express = require("express");
const router = express.Router();
const { generateAiRoadmap } = require("../controllers/roadmapController");

// Unprotected or open route so users can generate roadmaps instantly
router.post("/generate-ai", generateAiRoadmap);

module.exports = router;
