const bcrypt = require("bcryptjs");
const axios = require("axios");

const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const userResponse = require("../utils/userResponse");

const getClientUrl = (req) => {
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

  return clientUrl.replace(/\/+$/, "");
};

const getGoogleCallbackUrl = (req) => {
  if (process.env.GOOGLE_CALLBACK_URL) {
    return process.env.GOOGLE_CALLBACK_URL;
  }
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  const proto = req.headers["x-forwarded-proto"] || (req.secure ? "https" : "http");
  if (host) {
    return `${proto}://${host}/api/auth/google/callback`;
  }
  return "http://localhost:5000/api/auth/google/callback";
};

const handleGoogleCode = async (code, redirectUri) => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Google credentials are not configured on the server");
  }

  // 1. Exchange code for access token
  let tokenResponse;
  try {
    const params = new URLSearchParams();
    params.append("code", code);
    params.append("client_id", clientId);
    params.append("client_secret", clientSecret);
    params.append("redirect_uri", redirectUri);
    params.append("grant_type", "authorization_code");

    tokenResponse = await axios.post(
      "https://oauth2.googleapis.com/token",
      params.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );
  } catch (tokenErr) {
    const detail =
      tokenErr.response?.data?.error_description ||
      tokenErr.response?.data?.error ||
      tokenErr.message;
    throw new Error(`Failed to exchange Google code: ${detail}`);
  }

  const { access_token, error, error_description } = tokenResponse.data;
  if (error || !access_token) {
    throw new Error(
      error_description || error || "Failed to obtain Google access token",
    );
  }

  // 2. Fetch Google user profile
  let userRes;
  try {
    userRes = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  } catch (profileErr) {
    const detail =
      profileErr.response?.data?.error_description ||
      profileErr.response?.data?.error ||
      profileErr.message;
    throw new Error(`Failed to fetch Google profile: ${detail}`);
  }

  const gUser = userRes.data;
  const googleId = String(gUser.sub);
  const email = gUser.email;

  if (!email) {
    throw new Error("No verified email associated with this Google account");
  }

  const normalizedEmail = email.trim().toLowerCase();
  const displayName = gUser.name || gUser.given_name || "WatchFlow User";
  const avatar = gUser.picture || "";

  // 3. Find or create user
  let user = await User.findOne({
    $or: [{ googleId }, { email: normalizedEmail }],
  });

  if (user) {
    let updated = false;
    if (!user.googleId) {
      user.googleId = googleId;
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
      (gUser.given_name || displayName)
        .replace(/[^a-zA-Z0-9_-]/g, "")
        .toLowerCase() ||
      normalizedEmail.split("@")[0].replace(/[^a-zA-Z0-9_-]/g, "").toLowerCase() ||
      "user";
    let uniqueUsername = baseUsername;
    let counter = 1;
    while (await User.findOne({ username: uniqueUsername })) {
      uniqueUsername = `${baseUsername}${counter++}`;
    }

    const randomPassword = await bcrypt.hash(
      `oauth_google_${googleId}_${Date.now()}`,
      10,
    );

    user = await User.create({
      username: uniqueUsername,
      name: displayName,
      email: normalizedEmail,
      password: randomPassword,
      googleId,
      avatar,
    });
  }

  return user;
};

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
  const clientUrl = getClientUrl(req);

  if (!clientId) {
    return res.redirect(
      `${clientUrl}/login?error=${encodeURIComponent(
        "GitHub OAuth is not configured on the server. Please add GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET to server .env",
      )}`,
    );
  }

  const githubUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=read:user,user:email`;
  res.redirect(githubUrl);
};

// Handle GitHub redirect callback on backend
exports.githubAuthCallback = async (req, res) => {
  const { code, error, error_description } = req.query;
  const clientUrl = getClientUrl(req);

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

// Handle direct code exchange from frontend POST for GitHub
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

// Redirect user to Google OAuth authorization page
exports.googleAuth = (req, res) => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientUrl = getClientUrl(req);

  if (!clientId) {
    return res.redirect(
      `${clientUrl}/login?error=${encodeURIComponent(
        "Google OAuth is not configured on the server. Please add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to server .env",
      )}`,
    );
  }

  const callbackUrl = getGoogleCallbackUrl(req);
  const googleUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(
    clientId,
  )}&redirect_uri=${encodeURIComponent(
    callbackUrl,
  )}&response_type=code&scope=${encodeURIComponent(
    "openid email profile",
  )}&access_type=offline&prompt=select_account`;

  res.redirect(googleUrl);
};

// Handle Google redirect callback on backend
exports.googleAuthCallback = async (req, res) => {
  const { code, error, error_description } = req.query;
  const clientUrl = getClientUrl(req);

  if (error || !code) {
    const errMsg = error_description || error || "Google authorization canceled";
    return res.redirect(`${clientUrl}/login?error=${encodeURIComponent(errMsg)}`);
  }

  try {
    const callbackUrl = getGoogleCallbackUrl(req);
    const user = await handleGoogleCode(code, callbackUrl);
    const token = generateToken(user._id);

    res.redirect(`${clientUrl}/login?token=${token}`);
  } catch (err) {
    console.error("Google Auth Callback Error:", err.message);
    res.redirect(
      `${clientUrl}/login?error=${encodeURIComponent(
        err.message || "Google authentication failed",
      )}`,
    );
  }
};

// Handle direct code exchange from frontend POST for Google
exports.googleAuthCodeExchange = async (req, res) => {
  try {
    const { code, redirectUri } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Authorization code is required",
      });
    }

    const callbackUrl = redirectUri || getGoogleCallbackUrl(req);
    const user = await handleGoogleCode(code, callbackUrl);
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      token,
      user: userResponse(user),
    });
  } catch (err) {
    console.error("Google Auth Code Exchange Error:", err.message);
    res.status(500).json({
      success: false,
      message: err.message || "Google authentication failed",
    });
  }
};
