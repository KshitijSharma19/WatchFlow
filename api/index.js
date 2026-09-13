const connectDB = require("../server/config/db");
const app = require("../server/server");

module.exports = async (req, res) => {
  try {
    await connectDB();
  } catch (err) {
    console.error("❌ [Vercel Serverless DB Error]", err.message);
  }
  return app(req, res);
};
