const DailyActivity = require("../models/DailyActivity");
const { getLocalDateString } = require("./dateUtils");

module.exports = async (userId, secondsWatched = 0, isCompletion = false) => {
  const today = getLocalDateString();
  const minutes = secondsWatched > 0 ? Math.ceil(secondsWatched / 60) : 0;

  const incFields = {};

  if (minutes > 0) {
    incFields.minutesStudied = minutes;
  }

  if (isCompletion) {
    incFields.videosCompleted = 1;
  }

  // Ensure record exists even if 0 seconds passed
  await DailyActivity.findOneAndUpdate(
    {
      userId,
      date: today,
    },
    {
      $inc: Object.keys(incFields).length > 0 ? incFields : { minutesStudied: 0 },
    },
    {
      upsert: true,
      new: true,
    },
  );
};
