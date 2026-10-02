const mongoose = require("mongoose");

const DocumentNoteSchema = new mongoose.Schema(
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
    description: {
      type: String,
      default: "",
      trim: true,
    },
    // Bifurcation category: "tools", "technologies", or "subjects"
    categoryType: {
      type: String,
      enum: ["tools", "technologies", "subjects"],
      default: "technologies",
      index: true,
    },
    // Specific tool/tech/subject name (optional, defaults to categoryType)
    categoryName: {
      type: String,
      default: function () {
        return this.categoryType ? (this.categoryType.charAt(0).toUpperCase() + this.categoryType.slice(1)) : "General";
      },
      trim: true,
      index: true,
    },
    // File format: "pdf", "excel", or "note"
    fileType: {
      type: String,
      enum: ["pdf", "excel", "note"],
      required: true,
      default: "note",
    },
    fileName: {
      type: String,
      default: "",
      trim: true,
    },
    fileSize: {
      type: Number,
      default: 0,
    },
    // Base64 data URI string for downloading/rendering the file (PDF or Excel)
    fileData: {
      type: String,
      default: "",
    },
    // Textual content or extracted text used for search and AI Chatbot Q&A
    extractedText: {
      type: String,
      default: "",
    },
    tags: {
      type: [String],
      default: [],
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

DocumentNoteSchema.index({ userId: 1, categoryType: 1, categoryName: 1 });
DocumentNoteSchema.index({ userId: 1, fileType: 1 });

module.exports = mongoose.model("DocumentNote", DocumentNoteSchema);
