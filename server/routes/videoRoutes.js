const express = require("express");
const router = express.Router();
const verifyVideoOwnership = require("../middleware/videoOwnershipMiddleware");

const protect = require("../middleware/authMiddleware");
const {
  updateVideoStatus,
  updateVideoNotes,
  updateVideoProgress,
} = require("../controllers/videoController");

router.patch("/:id", protect, verifyVideoOwnership, updateVideoStatus);

router.patch("/:id/notes", protect, verifyVideoOwnership, updateVideoNotes);

router.patch(
  "/:id/progress",
  protect,
  verifyVideoOwnership,
  updateVideoProgress,
);

module.exports = router;
