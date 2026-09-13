const Playlist = require("../models/Playlist");
const Video = require("../models/Video");
const Note = require("../models/Note");
const ytService = require("../services/youtubeService");
const calculatePlaylistStats = require("../utils/playlistStats");

exports.syncPlaylist = async (req, res) => {
  try {
    const { playlistUrl } = req.body;
    const userId = req.user.id;

    const playlistId = ytService.extractPlaylistId(playlistUrl);
    if (!playlistId) {
      return res.status(400).json({
        success: false,
        message: "Invalid YouTube Playlist URL or ID",
      });
    }

    const trackedPlaylistsCount = await Playlist.countDocuments({ userId });
    if (trackedPlaylistsCount >= 20) {
      return res.status(400).json({
        success: false,
        message:
          "Limit reached! You can track up to 20 playlists simultaneously.",
      });
    }

    let playlist = await Playlist.findOne({ userId, ytPlaylistId: playlistId });
    if (playlist) {
      return res.status(400).json({
        success: false,
        message: "You are already tracking this playlist!",
      });
    }

    let snippet;
    try {
      snippet = await ytService.fetchPlaylistMetadata(playlistId);
    } catch (err) {
      if (err.message === "PLAYLIST_NOT_FOUND") {
        return res
          .status(404)
          .json({ success: false, message: "Playlist not found on YouTube" });
      }
      if (err.message === "YOUTUBE_QUOTA_EXCEEDED") {
        return res
          .status(429)
          .json({ success: false, message: "YouTube API quota exceeded. Please try again later." });
      }
      if (err.message === "YOUTUBE_KEY_INVALID") {
        return res
          .status(400)
          .json({ success: false, message: "Invalid YouTube API key configuration." });
      }
      throw err;
    }

    const videosArray = await ytService.fetchAllPlaylistVideos(playlistId);
    const videoIds = videosArray
      .map((video) => video.snippet.resourceId?.videoId)
      .filter(Boolean);

    const durationData = await ytService.fetchVideoDurations(videoIds);
    const durationMap = new Map(durationData.map((item) => [item.id, item]));

    const firstVidId = videosArray[0]?.snippet?.resourceId?.videoId;
    const fallbackThumb = firstVidId
      ? `https://i.ytimg.com/vi/${firstVidId}/hqdefault.jpg`
      : "";

    const calculatedThumbnail =
      snippet.thumbnailUrl ||
      snippet.thumbnails?.high?.url ||
      snippet.thumbnails?.default?.url ||
      fallbackThumb;

    playlist = new Playlist({
      userId,
      ytPlaylistId: playlistId,
      title: snippet.title,
      description: snippet.description,
      thumbnailUrl: calculatedThumbnail,
      totalVideos: videosArray.length,
    });
    const savedPlaylist = await playlist.save();

    const videoDocs = videosArray
      .map((video) => {
        const videoSnippet = video.snippet;
        const vId = videoSnippet.resourceId?.videoId;
        const durationInfo = durationMap.get(vId);

        const durationInSeconds = durationInfo
          ? ytService.convertDurationToSeconds(
              durationInfo.contentDetails.duration,
            )
          : 0;

        const vidThumb =
          videoSnippet.thumbnails?.high?.url ||
          videoSnippet.thumbnails?.medium?.url ||
          videoSnippet.thumbnails?.default?.url ||
          (vId ? `https://i.ytimg.com/vi/${vId}/hqdefault.jpg` : "");

        return {
          playlistId: savedPlaylist._id,
          ytVideoId: vId,
          title: videoSnippet.title,
          description: videoSnippet.description || "",
          thumbnailUrl: vidThumb,
          position: videoSnippet.position,
          notes: "",
          durationInSeconds,
          completed: false,
          progressPercent: 0,
          watchedSeconds: 0,
        };
      })
      .filter((v) => v.ytVideoId);

    if (videoDocs.length > 0) {
      await Video.insertMany(videoDocs);
    }

    res.status(201).json({
      success: true,
      message: "Playlist synced successfully!",
      playlist: savedPlaylist,
    });
  } catch (error) {
    console.error("[Playlist Sync]", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server Error during synchronization" });
  }
};

exports.deletePlaylist = async (req, res) => {
  try {
    const playlistId = req.params.id;

    await Promise.all([
      Video.deleteMany({ playlistId }),
      Playlist.findByIdAndDelete(playlistId),
      Note.deleteMany({ playlistId }),
    ]);

    res.status(200).json({
      success: true,
      message: "Playlist deleted successfully",
    });
  } catch (error) {
    console.error("[Playlist Delete]", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to delete playlist",
    });
  }
};

exports.resyncPlaylist = async (req, res) => {
  try {
    const playlistId = req.params.id;
    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: "Playlist not found",
      });
    }

    const latestVideos = await ytService.fetchAllPlaylistVideos(
      playlist.ytPlaylistId,
    );
    const existingVideos = await Video.find(
      { playlistId: playlist._id },
      "ytVideoId",
    );
    const existingVideoIds = new Set(
      existingVideos.map((video) => video.ytVideoId),
    );

    const newVideos = latestVideos.filter((video) => {
      const ytVideoId = video.snippet.resourceId?.videoId;
      return ytVideoId && !existingVideoIds.has(ytVideoId);
    });

    const newVideoIds = newVideos
      .map((video) => video.snippet.resourceId?.videoId)
      .filter(Boolean);

    const durationData =
      newVideoIds.length > 0
        ? await ytService.fetchVideoDurations(newVideoIds)
        : [];

    const durationMap = new Map(durationData.map((item) => [item.id, item]));

    const newVideoDocs = newVideos.map((video) => {
      const videoSnippet = video.snippet;
      const vId = videoSnippet.resourceId?.videoId;
      const durationInfo = durationMap.get(vId);

      const durationInSeconds = durationInfo
        ? ytService.convertDurationToSeconds(
            durationInfo.contentDetails.duration,
          )
        : 0;

      return {
        playlistId: playlist._id,
        ytVideoId: vId,
        title: videoSnippet.title,
        description: videoSnippet.description || "",
        thumbnailUrl:
          videoSnippet.thumbnails?.high?.url ||
          videoSnippet.thumbnails?.medium?.url ||
          videoSnippet.thumbnails?.default?.url ||
          (vId ? `https://i.ytimg.com/vi/${vId}/hqdefault.jpg` : ""),
        position: videoSnippet.position,
        completed: false,
        progressPercent: 0,
        watchedSeconds: 0,
        notes: "",
        durationInSeconds,
      };
    });

    if (newVideoDocs.length > 0) {
      await Video.insertMany(newVideoDocs);
      playlist.totalVideos += newVideoDocs.length;
      await playlist.save();
    }

    return res.status(200).json({
      success: true,
      addedVideos: newVideoDocs.length,
      totalVideos: playlist.totalVideos,
    });
  } catch (error) {
    console.error("[Playlist Resync]", error.message);
    res.status(500).json({
      success: false,
      message: "Resync failed",
    });
  }
};

exports.getUserPlaylists = async (req, res) => {
  try {
    const userId = req.user.id;
    const playlistsRaw = await Playlist.find({ userId }).sort({
      createdAt: -1,
    });

    const playlists = await Promise.all(
      playlistsRaw.map(async (playlist) => {
        const videos = await Video.find({ playlistId: playlist._id }).sort({ position: 1 });
        const stats = calculatePlaylistStats(videos);

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
          ...stats,
        };
      }),
    );

    res.status(200).json({
      success: true,
      playlists,
    });
  } catch (error) {
    console.error("[Playlist]", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch playlists",
    });
  }
};
