const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
  playlistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Playlist",
    required: true,
  },

  ytVideoId: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    default: "",
  },

  thumbnailUrl: {
    type: String,
    default: "",
  },

  durationInSeconds: {
    type: Number,
    default: 0,
  },

  position: {
    type: Number,
    default: 0,
  },

  progressPercent: {
    type: Number,
    default: 0,
  },

  watchedSeconds: {
    type: Number,
    default: 0,
  },

  completed: {
    type: Boolean,
    default: false,
  },

  notes: {
    type: String,
    default: "",
  },
});

VideoSchema.index({ playlistId: 1, position: 1 });

VideoSchema.index({ playlistId: 1, ytVideoId: 1 });

module.exports = mongoose.model("Video", VideoSchema);
