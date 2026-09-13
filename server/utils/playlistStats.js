module.exports = (videos) => {
  const completedVideos = videos.filter((video) => video.completed).length;

  const progress =
    videos.length === 0
      ? 0
      : Math.round((completedVideos / videos.length) * 100);

  const totalSeconds = videos.reduce(
    (sum, video) => sum + (video.durationInSeconds || 0),
    0,
  );

  const watchedSeconds = videos.reduce(
    (sum, video) => sum + (video.watchedSeconds || 0),
    0,
  );

  return {
    completedVideos,
    progress,
    remainingHours: ((totalSeconds - watchedSeconds) / 3600).toFixed(1),
  };
};
