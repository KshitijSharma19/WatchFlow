const Playlist = require("../models/Playlist");
const Video = require("../models/Video");

exports.getPlaylistDetails = async (req, res) => {
  try {
    const playlistId = req.params.id;
    const userId = req.user.id;

    // Run both queries in parallel with .lean() for minimal overhead and latency
    const [playlist, videos] = await Promise.all([
      Playlist.findOne({ _id: playlistId, userId }).lean(),
      Video.find({ playlistId }).sort({ position: 1 }).lean(),
    ]);

    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: "Playlist not found or you do not have permission to access it.",
      });
    }

    res.status(200).json({
      success: true,
      playlist,
      videos,
    });
  } catch (error) {
    console.error("[Playlist Details]", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch playlist details",
    });
  }
};
