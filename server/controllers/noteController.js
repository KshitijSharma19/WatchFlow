const Note = require("../models/Note");
const Video = require("../models/Video");

exports.getNotesByVideo = async (req, res) => {
  try {
    const { videoId } = req.params;
    const userId = req.user.id;

    const notes = await Note.find({ videoId, userId }).sort({ timestamp: 1 });

    res.status(200).json({
      success: true,
      notes,
    });
  } catch (error) {
    console.error("[Get Notes]", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch video notes",
    });
  }
};

exports.createNote = async (req, res) => {
  try {
    const { videoId } = req.params;
    const { timestamp = 0, noteText } = req.body;
    const userId = req.user.id;

    if (!noteText || !noteText.trim()) {
      return res.status(400).json({
        success: false,
        message: "Note text is required",
      });
    }

    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }

    const newNote = await Note.create({
      videoId,
      playlistId: video.playlistId,
      userId,
      timestamp: Math.max(0, Math.floor(Number(timestamp) || 0)),
      noteText: noteText.trim(),
    });

    res.status(201).json({
      success: true,
      note: newNote,
    });
  } catch (error) {
    console.error("[Create Note]", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to create note",
    });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { timestamp, noteText } = req.body;
    const userId = req.user.id;

    const note = await Note.findOne({ _id: id, userId });
    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found or unauthorized",
      });
    }

    if (noteText !== undefined) {
      note.noteText = noteText.trim();
    }

    if (timestamp !== undefined) {
      note.timestamp = Math.max(0, Math.floor(Number(timestamp) || 0));
    }

    await note.save();

    res.status(200).json({
      success: true,
      note,
    });
  } catch (error) {
    console.error("[Update Note]", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to update note",
    });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const note = await Note.findOneAndDelete({ _id: id, userId });
    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found or unauthorized",
      });
    }

    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
      noteId: id,
    });
  } catch (error) {
    console.error("[Delete Note]", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to delete note",
    });
  }
};
