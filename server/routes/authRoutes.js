const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  githubAuth,
  githubAuthCallback,
  githubAuthCodeExchange,
  googleAuth,
  googleAuthCallback,
  googleAuthCodeExchange,
} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);

// GitHub OAuth endpoints
router.get("/github", githubAuth);
router.get("/github/callback", githubAuthCallback);
router.post("/github", githubAuthCodeExchange);

// Google OAuth endpoints
router.get("/google", googleAuth);
router.get("/google/callback", googleAuthCallback);
router.post("/google", googleAuthCodeExchange);

module.exports = router;
