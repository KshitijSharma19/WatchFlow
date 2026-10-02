const mongoose = require("mongoose");

const CategorizedNoteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      default: "General",
      index: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    content: {
      type: String,
      required: true,
      trim: true,
    },
    resourceLink: {
      type: String,
      trim: true,
      default: "",
    },
    resourceType: {
      type: String,
      enum: ["link", "doc", "code", "video", "cheatsheet"],
      default: "doc",
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: "blue",
    },
  },
  {
    timestamps: true,
  }
);

CategorizedNoteSchema.index({ userId: 1, category: 1 });
CategorizedNoteSchema.index({ userId: 1, isPinned: -1, createdAt: -1 });

module.exports = mongoose.model("CategorizedNote", CategorizedNoteSchema);
