const mongoose = require("mongoose");

const DailyActivitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  date: {
    type: String,
    required: true,
  },

  videosCompleted: {
    type: Number,
    default: 0,
  },

  minutesStudied: {
    type: Number,
    default: 0,
  },
});

DailyActivitySchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("DailyActivity", DailyActivitySchema);
