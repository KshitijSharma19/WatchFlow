const DailyActivity = require("../models/DailyActivity");
const { getLocalDateString } = require("../utils/dateUtils");

const MS_PER_DAY = 1000 * 60 * 60 * 24;

exports.getStreakData = async (req, res) => {
  try {
    const activities = await DailyActivity.find({
      userId: req.user.id,
    }).sort({
      date: 1,
    });

    const dateMap = Object.create(null);

    for (const activity of activities) {
      dateMap[activity.date] = {
        videosCompleted: activity.videosCompleted || 0,
        minutesStudied: activity.minutesStudied || 0,
      };
    }

    const totalMinutes = activities.reduce(
      (sum, day) => sum + (day.minutesStudied || 0),
      0,
    );

    // Calculate current streak count relative to local today
    let currentStreak = 0;
    let checkDate = new Date();
    let checkStr = getLocalDateString(checkDate);

    // If no activity today, check if active yesterday to keep streak going
    if (!dateMap[checkStr]) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = getLocalDateString(yesterday);
      if (dateMap[yesterdayStr]) {
        checkDate = yesterday;
      }
    }

    while (dateMap[getLocalDateString(checkDate)]) {
      currentStreak++;
      checkDate.setDate(checkDate.getDate() - 1);
    }

    // Calculate longest streak across history
    const sortedDates = Object.keys(dateMap).sort();
    let longestStreak = 0;
    let tempStreak = 0;

    for (let i = 0; i < sortedDates.length; i++) {
      if (i === 0) {
        tempStreak = 1;
      } else {
        const prev = new Date(sortedDates[i - 1] + "T00:00:00Z");
        const curr = new Date(sortedDates[i] + "T00:00:00Z");
        const diffDays = Math.round((curr - prev) / MS_PER_DAY);

        tempStreak = diffDays === 1 ? tempStreak + 1 : 1;
      }
      longestStreak = Math.max(longestStreak, tempStreak);
    }

    longestStreak = Math.max(longestStreak, currentStreak);

    res.status(200).json({
      success: true,
      heatmap: dateMap,
      totalMinutesStudied: totalMinutes,
      currentStreak,
      longestStreak,
    });
  } catch (error) {
    console.error("[Streak]", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch streak data",
    });
  }
};
