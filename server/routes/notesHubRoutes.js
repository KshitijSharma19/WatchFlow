const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const notesHubController = require("../controllers/notesHubController");

// Require authentication for personal categorized notes storage
router.use(authMiddleware);

router.get("/", notesHubController.getNotes);
router.post("/", notesHubController.createNote);
router.put("/:id", notesHubController.updateNote);
router.delete("/:id", notesHubController.deleteNote);
router.patch("/:id/pin", notesHubController.togglePin);

module.exports = router;
