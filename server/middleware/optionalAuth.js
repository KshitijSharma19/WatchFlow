const jwt = require("jsonwebtoken");

const optionalAuth = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (authorization && authorization.startsWith("Bearer ")) {
      const token = authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = {
        _id: decoded.id,
        id: decoded.id,
      };
    }
  } catch (err) {
    // Ignore invalid token for optional auth
    req.user = null;
  }
  next();
};

module.exports = optionalAuth;
