const Playlist = require("../models/Playlist");
const Video = require("../models/Video");

exports.getPlaylistDetails = async (req, res) => {
  try {
    const playlist = await Playlist.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: "Playlist not found",
      });
    }

    const videos = await Video.find({
      playlistId: playlist._id,
    }).sort({
      position: 1,
    });

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
