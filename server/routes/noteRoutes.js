const express = require("express");
const router = express.Router({ mergeParams: true });
const authMiddleware = require("../middleware/authMiddleware");
const noteController = require("../controllers/noteController");

// Protected endpoints
router.use(authMiddleware);

// Video notes endpoints
router.get("/videos/:videoId/notes", noteController.getNotesByVideo);
router.post("/videos/:videoId/notes", noteController.createNote);

// Specific note endpoints
router.put("/notes/:id", noteController.updateNote);
router.delete("/notes/:id", noteController.deleteNote);

module.exports = router;
