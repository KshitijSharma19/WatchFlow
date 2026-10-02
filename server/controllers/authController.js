const bcrypt = require("bcryptjs");
const axios = require("axios");

const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const userResponse = require("../utils/userResponse");

const handleGitHubCode = async (code) => {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("GitHub credentials are not configured on the server");
  }

  // 1. Exchange code for access token
  const tokenResponse = await axios.post(
    "https://github.com/login/oauth/access_token",
    {
      client_id: clientId,
      client_secret: clientSecret,
      code,
    },
    {
      headers: {
        Accept: "application/json",
      },
    },
  );

  const { access_token, error, error_description } = tokenResponse.data;
  if (error || !access_token) {
    throw new Error(
      error_description || error || "Failed to exchange GitHub authorization code",
    );
  }

  // 2. Fetch GitHub user profile
  const userRes = await axios.get("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "User-Agent": "WatchFlow-App",
    },
  });

  const ghUser = userRes.data;
  let email = ghUser.email;

  // 3. Fetch verified email if email is private
  if (!email) {
    try {
      const emailRes = await axios.get("https://api.github.com/user/emails", {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "User-Agent": "WatchFlow-App",
        },
      });

      if (Array.isArray(emailRes.data)) {
        const primaryEmail =
          emailRes.data.find((e) => e.primary && e.verified) ||
          emailRes.data.find((e) => e.verified) ||
          emailRes.data[0];
        if (primaryEmail) {
          email = primaryEmail.email;
        }
      }
    } catch (err) {
      console.warn("Unable to fetch private email from GitHub:", err.message);
    }
  }

  if (!email) {
    email = `${ghUser.login}@users.noreply.github.com`;
  }

  const normalizedEmail = email.trim().toLowerCase();
  const githubId = String(ghUser.id);
  const displayName = ghUser.name || ghUser.login || "WatchFlow User";
  const avatar = ghUser.avatar_url || "";

  // 4. Find or create user
  let user = await User.findOne({
    $or: [{ githubId }, { email: normalizedEmail }],
  });

  if (user) {
    let updated = false;
    if (!user.githubId) {
      user.githubId = githubId;
      updated = true;
    }
    if (!user.avatar && avatar) {
      user.avatar = avatar;
      updated = true;
    }
    if (!user.name && displayName) {
      user.name = displayName;
      updated = true;
    }
    if (updated) {
      await user.save();
    }
  } else {
    let baseUsername =
      (ghUser.login || displayName).replace(/[^a-zA-Z0-9_-]/g, "").toLowerCase() ||
      "user";
    let uniqueUsername = baseUsername;
    let counter = 1;
    while (await User.findOne({ username: uniqueUsername })) {
      uniqueUsername = `${baseUsername}${counter++}`;
    }

    const randomPassword = await bcrypt.hash(
      `oauth_gh_${githubId}_${Date.now()}`,
      10,
    );

    user = await User.create({
      username: uniqueUsername,
      name: displayName,
      email: normalizedEmail,
      password: randomPassword,
      githubId,
      avatar,
    });
  }

  return user;
};

exports.registerUser = async (req, res) => {
  try {
    const { username, name, email, password } = req.body;
    const displayName = username || name;

    if (!displayName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields (name/username, email, password) are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username: displayName.trim(),
      name: displayName.trim(),
      email: normalizedEmail,
      password: hashedPassword,
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: userResponse(user),
    });
  } catch (error) {
    console.error("Auth Controller Error:", error.message);

    res.status(500).json({
      success: false,
      message: error.message || "Server error during registration",
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      token,
      user: userResponse(user),
    });
  } catch (error) {
    console.error("Auth Controller Error:", error.message);

    res.status(500).json({
      success: false,
      message: error.message || "Server error during login",
    });
  }
};

// Redirect user to GitHub OAuth authorization page
exports.githubAuth = (req, res) => {
  const clientId = process.env.GITHUB_CLIENT_ID;
  if (!clientId) {
    return res.status(500).json({
      success: false,
      message: "GitHub Client ID is not configured on the server",
    });
  }

  const githubUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=read:user,user:email`;
  res.redirect(githubUrl);
};

// Handle GitHub redirect callback on backend
exports.githubAuthCallback = async (req, res) => {
  const { code, error, error_description } = req.query;

  let clientUrl = process.env.CLIENT_URL;

  // Smart fallback if CLIENT_URL is empty, default placeholder, or contains example.com
  if (!clientUrl || clientUrl.includes("example.com")) {
    const host = req.headers["x-forwarded-host"] || req.headers.host;
    const proto = req.headers["x-forwarded-proto"] || "https";
    if (host && !host.includes("localhost")) {
      clientUrl = `${proto}://${host}`;
    } else {
      clientUrl = "http://localhost:5173";
    }
  }

  // Always strip trailing slashes to prevent malformed redirects like //login
  clientUrl = clientUrl.replace(/\/+$/, "");

  if (error || !code) {
    const errMsg = error_description || error || "GitHub authorization canceled";
    return res.redirect(`${clientUrl}/login?error=${encodeURIComponent(errMsg)}`);
  }

  try {
    const user = await handleGitHubCode(code);
    const token = generateToken(user._id);

    res.redirect(`${clientUrl}/login?token=${token}`);
  } catch (err) {
    console.error("GitHub Auth Callback Error:", err.message);
    res.redirect(
      `${clientUrl}/login?error=${encodeURIComponent(err.message || "GitHub authentication failed")}`,
    );
  }
};

// Handle direct code exchange from frontend POST
exports.githubAuthCodeExchange = async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Authorization code is required",
      });
    }

    const user = await handleGitHubCode(code);
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      token,
      user: userResponse(user),
    });
  } catch (err) {
    console.error("GitHub Auth Code Exchange Error:", err.message);
    res.status(500).json({
      success: false,
      message: err.message || "GitHub authentication failed",
    });
  }
};
