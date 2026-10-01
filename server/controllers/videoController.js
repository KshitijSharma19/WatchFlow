const Video = require("../models/Video");
const Playlist = require("../models/Playlist");
const updateDailyActivity = require("../utils/updateDailyActivity");

exports.updateVideoStatus = async (req, res) => {
  try {
    const videoId = req.params.id;
    const { completed } = req.body;

    if (typeof completed !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "completed must be true or false",
      });
    }

    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }

    const wasCompleted = video.completed;
    video.completed = completed;

    if (completed) {
      video.progressPercent = 100;
      video.watchedSeconds = video.durationInSeconds || 0;

      if (!wasCompleted) {
        await updateDailyActivity(req.user.id, video.durationInSeconds || 0, true);
      }
    } else {
      video.progressPercent = 0;
      video.watchedSeconds = 0;
    }
    await video.save();

    const now = new Date();
    await Playlist.findByIdAndUpdate(video.playlistId, {
      lastAccessedAt: now,
    });

    res.status(200).json({
      success: true,
      video,
    });
  } catch (error) {
    console.error("[Video Status]", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to update video status",
    });
  }
};

exports.updateVideoNotes = async (req, res) => {
  try {
    const videoId = req.params.id;
    const { notes } = req.body;

    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }

    video.notes = notes?.trim() || "";
    await video.save();

    res.status(200).json({
      success: true,
      video,
    });
  } catch (error) {
    console.error("[Video Notes]", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to update notes",
    });
  }
};

exports.updateVideoProgress = async (req, res) => {
  try {
    const videoId = req.params.id;
    const {
      watchedSeconds,
      sessionSeconds = 0,
      forceStreak = false,
    } = req.body;

    if (typeof watchedSeconds !== "number" || watchedSeconds < 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid watchedSeconds",
      });
    }

    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }

    const wasCompleted = video.completed;
    const previousWatchedSeconds = video.watchedSeconds || 0;

    video.watchedSeconds = Math.min(
      watchedSeconds,
      video.durationInSeconds || 0,
    );

    const progressPercent =
      video.durationInSeconds > 0
        ? Math.min(
            100,
            Math.round((video.watchedSeconds / video.durationInSeconds) * 100),
          )
        : 0;

    video.progressPercent = progressPercent;

    if (progressPercent >= 95) {
      video.completed = true;
      video.progressPercent = 100;
    }

    const isNowCompleted = !wasCompleted && video.completed;
    const secondsDelta = Math.max(
      0,
      video.watchedSeconds - previousWatchedSeconds,
    );

    // Any 30s playback, 30s reached in video, forceStreak, or positive watch delta
    const effectiveSeconds = Math.max(secondsDelta, sessionSeconds);

    if (
      forceStreak ||
      watchedSeconds >= 30 ||
      effectiveSeconds >= 30 ||
      isNowCompleted
    ) {
      // 30 seconds makes it count as a streak for that day
      await updateDailyActivity(
        req.user.id,
        Math.max(30, effectiveSeconds),
        isNowCompleted,
      );
    } else if (effectiveSeconds > 0) {
      await updateDailyActivity(req.user.id, effectiveSeconds, isNowCompleted);
    }

    await video.save();

    const now = new Date();
    await Playlist.findByIdAndUpdate(video.playlistId, {
      lastAccessedAt: now,
    });

    res.status(200).json({
      success: true,
      video,
    });
  } catch (error) {
    console.error("[Video Progress]", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to update progress",
    });
  }
};
