const connectDB = require("../server/config/db");
const app = require("../server/server");

module.exports = async (req, res) => {
  try {
    await connectDB();
  } catch (err) {
    console.error("❌ [Vercel Serverless DB Connection Failed]", err.message);
    return res.status(500).json({
      success: false,
      message: `Database connection failed: ${err.message}. Please check MongoDB Atlas IP Whitelist (0.0.0.0/0).`,
    });
  }
  return app(req, res);
};
