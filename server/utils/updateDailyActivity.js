const DailyActivity = require("../models/DailyActivity");
const { getLocalDateString } = require("./dateUtils");

module.exports = async (userId, secondsWatched = 0, isCompletion = false) => {
  const today = getLocalDateString();
  // 30 seconds in a video makes it count as a streak for that day (minimum 1 min recorded)
  const minutes =
    secondsWatched >= 30
      ? Math.max(1, Math.ceil(secondsWatched / 60))
      : secondsWatched > 0
      ? 1
      : 0;

  const existing = await DailyActivity.findOne({
    userId,
    date: today,
  });

  if (existing) {
    if (minutes > 0) {
      existing.minutesStudied = Math.max(
        1,
        (existing.minutesStudied || 0) + minutes,
      );
    }
    if (isCompletion) {
      existing.videosCompleted = (existing.videosCompleted || 0) + 1;
    }
    // If it was somehow 0 minutes and 0 videos, ensure at least 1 minute is recorded
    if ((existing.minutesStudied || 0) === 0 && (existing.videosCompleted || 0) === 0) {
      existing.minutesStudied = 1;
    }
    await existing.save();
    return existing;
  }

  // Create new record for today with at least 1 minute of activity
  const created = await DailyActivity.create({
    userId,
    date: today,
    minutesStudied: Math.max(1, minutes),
    videosCompleted: isCompletion ? 1 : 0,
  });

  return created;
};
