const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
  seedSampleNotes,
  askPdfChatbot,
} = require("../controllers/documentNoteController");

// All notes hub routes are authenticated
router.use(protect);

router.get("/", getAllNotes);
router.post("/", createNote);
router.post("/seed-samples", seedSampleNotes);
router.post("/chat", askPdfChatbot);
router.get("/:id", getNoteById);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

module.exports = router;
