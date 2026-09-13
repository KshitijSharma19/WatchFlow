const connectDB = require("../server/config/db");
const app = require("../server/server");

module.exports = async (req, res) => {
  await connectDB();
  return app(req, res);
};
