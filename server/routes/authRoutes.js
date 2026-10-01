const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  githubAuth,
  githubAuthCallback,
  githubAuthCodeExchange,
} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);

// GitHub OAuth endpoints
router.get("/github", githubAuth);
router.get("/github/callback", githubAuthCallback);
router.post("/github", githubAuthCodeExchange);

module.exports = router;
