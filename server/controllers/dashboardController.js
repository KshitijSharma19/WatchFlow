const Playlist = require("../models/Playlist");
const Video = require("../models/Video");

exports.getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const totalPlaylists = await Playlist.countDocuments({ userId });

    const userPlaylists = await Playlist.find({ userId });

    const recentPlaylistsRaw = await Playlist.find({ userId })
      .sort({ createdAt: -1 })
      .limit(4);

    const recentPlaylists = await Promise.all(
      recentPlaylistsRaw.map(async (playlist) => {
        const videos = await Video.find({
          playlistId: playlist._id,
        }).sort({ position: 1 });

        const completedVideos = videos.filter(
          (video) => video.completed,
        ).length;

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

        const remainingHours = ((totalSeconds - watchedSeconds) / 3600).toFixed(
          1,
        );

        let thumbnailUrl = playlist.thumbnailUrl;
        if (!thumbnailUrl || thumbnailUrl.includes("undefined") || thumbnailUrl.trim() === "") {
          const firstVideo = videos[0];
          if (firstVideo?.thumbnailUrl) {
            thumbnailUrl = firstVideo.thumbnailUrl;
          } else if (firstVideo?.ytVideoId) {
            thumbnailUrl = `https://i.ytimg.com/vi/${firstVideo.ytVideoId}/hqdefault.jpg`;
          }
          if (thumbnailUrl && thumbnailUrl !== playlist.thumbnailUrl) {
            playlist.thumbnailUrl = thumbnailUrl;
            await playlist.save().catch(() => {});
          }
        }

        return {
          ...playlist.toObject(),
          thumbnailUrl,
          completedVideos,
          progress,
          remainingHours,
        };
      }),
    );

    const playlistIds = userPlaylists.map((playlist) => playlist._id);

    const totalVideos = await Video.countDocuments({
      playlistId: {
        $in: playlistIds,
      },
    });

    const completedVideos = await Video.countDocuments({
      playlistId: {
        $in: playlistIds,
      },
      completed: true,
    });

    const videoProgress =
      totalVideos === 0 ? 0 : Math.round((completedVideos / totalVideos) * 100);

    res.status(200).json({
      success: true,
      stats: {
        totalPlaylists,
        totalVideos,
        completedVideos,
        videoProgress,
      },
      recentPlaylists,
    });
  } catch (error) {
    console.error("[Dashboard]", error.message);

    res.status(500).json({
      success: false,
      message: "Dashboard fetch failed",
    });
  }
};

exports.getContinueLearning = async (req, res) => {
  try {
    const userId = req.user.id;

    const playlist = await Playlist.findOne({ userId }).sort({
      lastAccessedAt: -1,
    });

    if (!playlist) {
      return res.status(200).json({
        success: true,
        continueData: null,
      });
    }

    // Resume partially watched video first
    let video = await Video.findOne({
      playlistId: playlist._id,
      completed: false,
      progressPercent: { $gt: 0 },
    }).sort({
      position: 1,
    });

    // Otherwise first uncompleted video
    if (!video) {
      video = await Video.findOne({
        playlistId: playlist._id,
        completed: false,
      }).sort({
        position: 1,
      });
    }

    // Everything completed
    if (!video) {
      return res.status(200).json({
        success: true,
        continueData: null,
      });
    }

    let playlistThumb = playlist.thumbnailUrl;
    let vidThumb = video.thumbnailUrl;

    if (!playlistThumb || playlistThumb.includes("undefined")) {
      playlistThumb = vidThumb || `https://i.ytimg.com/vi/${video.ytVideoId}/hqdefault.jpg`;
    }
    if (!vidThumb || vidThumb.includes("undefined")) {
      vidThumb = `https://i.ytimg.com/vi/${video.ytVideoId}/hqdefault.jpg`;
    }

    res.status(200).json({
      success: true,
      playlist: {
        _id: playlist._id,
        title: playlist.title,
        thumbnailUrl: playlistThumb,
      },
      video: {
        _id: video._id,
        title: video.title,
        thumbnailUrl: vidThumb,
        watchedSeconds: video.watchedSeconds,
        progressPercent: video.progressPercent,
      },
    });
  } catch (error) {
    console.error("[Dashboard]", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch continue learning",
    });
  }
};
