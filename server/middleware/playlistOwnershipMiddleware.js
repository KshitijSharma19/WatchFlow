const Playlist = require("../models/Playlist");

const verifyPlaylistOwnership = async (req, res, next) => {
  try {
    const playlist = await Playlist.findById(req.params.id);

    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: "Playlist not found",
      });
    }

    if (playlist.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to access this playlist.",
      });
    }

    next();
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      message: "Ownership check failed",
    });
  }
};

module.exports = verifyPlaylistOwnership;
