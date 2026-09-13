const mongoose = require("mongoose");

const PlaylistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  ytPlaylistId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  thumbnailUrl: {
    type: String,
  },
  totalVideos: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastAccessedAt: {
    type: Date,
    default: Date.now,
  },
});

PlaylistSchema.index({ userId: 1, ytPlaylistId: 1 }, { unique: true });

module.exports = mongoose.model("Playlist", PlaylistSchema);
