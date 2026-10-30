const Playlist = require("../models/Playlist");
const Video = require("../models/Video");

exports.getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const userPlaylists = await Playlist.find({ userId })
      .sort({ createdAt: -1 })
      .lean();

    const totalPlaylists = userPlaylists.length;
    if (totalPlaylists === 0) {
      return res.status(200).json({
        success: true,
        stats: {
          totalPlaylists: 0,
          totalVideos: 0,
          completedVideos: 0,
          videoProgress: 0,
        },
        recentPlaylists: [],
      });
    }

    const playlistIds = userPlaylists.map((p) => p._id);
    const recentPlaylistsRaw = userPlaylists.slice(0, 4);

    // Fetch all videos for user playlists in 1 bulk query with minimal projection
    const allVideos = await Video.find(
      { playlistId: { $in: playlistIds } },
      "playlistId completed durationInSeconds watchedSeconds position thumbnailUrl ytVideoId"
    )
      .sort({ position: 1 })
      .lean();

    // Group videos by playlistId in memory
    const videosByPlaylist = new Map();
    let totalVideos = 0;
    let completedVideos = 0;

    for (const v of allVideos) {
      totalVideos++;
      if (v.completed) completedVideos++;

      const pIdStr = v.playlistId.toString();
      let arr = videosByPlaylist.get(pIdStr);
      if (!arr) {
        arr = [];
        videosByPlaylist.set(pIdStr, arr);
      }
      arr.push(v);
    }

    const videoProgress =
      totalVideos === 0 ? 0 : Math.round((completedVideos / totalVideos) * 100);

    const recentPlaylists = recentPlaylistsRaw.map((playlist) => {
      const pIdStr = playlist._id.toString();
      const videos = videosByPlaylist.get(pIdStr) || [];

      const pCompleted = videos.filter((video) => video.completed).length;
      const progress =
        videos.length === 0 ? 0 : Math.round((pCompleted / videos.length) * 100);

      const totalSeconds = videos.reduce(
        (sum, video) => sum + (video.durationInSeconds || 0),
        0
      );

      const watchedSeconds = videos.reduce(
        (sum, video) => sum + (video.watchedSeconds || 0),
        0
      );

      const remainingHours = ((totalSeconds - watchedSeconds) / 3600).toFixed(1);

      let thumbnailUrl = playlist.thumbnailUrl;
      if (!thumbnailUrl || thumbnailUrl.includes("undefined") || thumbnailUrl.trim() === "") {
        const firstVideo = videos[0];
        if (firstVideo?.thumbnailUrl) {
          thumbnailUrl = firstVideo.thumbnailUrl;
        } else if (firstVideo?.ytVideoId) {
          thumbnailUrl = `https://i.ytimg.com/vi/${firstVideo.ytVideoId}/hqdefault.jpg`;
        }
      }

      return {
        ...playlist,
        thumbnailUrl,
        completedVideos: pCompleted,
        progress,
        remainingHours,
      };
    });

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

    const playlist = await Playlist.findOne({ userId })
      .sort({ lastAccessedAt: -1 })
      .lean();

    if (!playlist) {
      return res.status(200).json({
        success: true,
        continueData: null,
      });
    }

    // Resume partially watched video first, otherwise first uncompleted video
    let video = await Video.findOne({
      playlistId: playlist._id,
      completed: false,
      progressPercent: { $gt: 0 },
    })
      .sort({ position: 1 })
      .lean();

    if (!video) {
      video = await Video.findOne({
        playlistId: playlist._id,
        completed: false,
      })
        .sort({ position: 1 })
        .lean();
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
