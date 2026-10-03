const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db.js");

const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const playlistRoutes = require("./routes/playlistRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const streakRoutes = require("./routes/streakRoutes");
const videoRoutes = require("./routes/videoRoutes");
const noteRoutes = require("./routes/noteRoutes");
const roadmapRoutes = require("./routes/roadmapRoutes");
const documentNoteRoutes = require("./routes/documentNoteRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

// Health check endpoints (Unprotected)
app.get(["/", "/api", "/api/health"], (req, res) => {
  res.status(200).json({
    success: true,
    message: "WatchFlow API is running.",
  });
});

// Modular API routes
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/playlists", playlistRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/streak", streakRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/roadmap", roadmapRoutes);
app.use("/api/notes-hub", documentNoteRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api", noteRoutes);

// Fallback 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production" || require.main === module) {
  connectDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`🚀 WatchFlow API running on http://localhost:${PORT}`);
      });
    })
    .catch((error) => {
      console.error("❌ MongoDB Connection Failed:", error.message);
    });
}

module.exports = app;
