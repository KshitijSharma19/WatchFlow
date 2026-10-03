const User = require("../models/User");
const bcrypt = require("bcryptjs");
const userResponse = require("../utils/userResponse");

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user: userResponse(user), 
    });
  } catch (error) {
    console.error("[Get Profile]", error.message); 
    res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const resolvedName = (req.body.name || req.body.username || "").trim();
    const email = req.body.email;
    const leetcodeUsername = (req.body.leetcodeUsername ?? "").trim();

    if (!resolvedName || !email?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
      email: normalizedEmail,
      _id: { $ne: req.user.id },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email is already in use",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        username: resolvedName,
        name: resolvedName,
        email: normalizedEmail,
        leetcodeUsername,
      },
      {
        new: true,
        runValidators: true,
      },
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: userResponse(updatedUser), 
    });
  } catch (error) {
    console.error("[Update Profile]", error.message); 
    res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Both passwords are required",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    const samePassword = await bcrypt.compare(newPassword, user.password);

    if (samePassword) {
      return res.status(400).json({
        success: false,
        message: "New password must be different",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("[Update Password]", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to update password",
    });
  }
};

exports.getLeetcodeStats = async (req, res) => {
  try {
    const rawUsername = (req.params.username || "").trim();
    if (!rawUsername) {
      return res.status(400).json({
        success: false,
        message: "LeetCode username is required",
      });
    }

    const query = `
      query userProfileCalendar($username: String!) {
        matchedUser(username: $username) {
          username
          profile {
            realName
            userAvatar
            ranking
          }
          submitStats {
            acSubmissionNum {
              difficulty
              count
              submissions
            }
          }
          userCalendar {
            streak
            totalActiveDays
            submissionCalendar
          }
        }
      }
    `;

    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      body: JSON.stringify({ query, variables: { username: rawUsername } }),
    });

    const result = await response.json();
    const matched = result?.data?.matchedUser;

    if (!matched) {
      return res.status(404).json({
        success: false,
        message: "LeetCode account not found. Please verify the username.",
      });
    }

    // Process submission calendar
    let rawCalendar = {};
    try {
      rawCalendar = JSON.parse(matched.userCalendar?.submissionCalendar || "{}");
    } catch (e) {
      rawCalendar = {};
    }

    const timestamps = Object.keys(rawCalendar)
      .map(Number)
      .sort((a, b) => a - b);

    const daysSet = new Set();
    let totalSubmissions = 0;
    for (const ts of timestamps) {
      const dateStr = new Date(ts * 1000).toISOString().split("T")[0];
      daysSet.add(dateStr);
      totalSubmissions += rawCalendar[ts] || 1;
    }

    const sortedDays = Array.from(daysSet).sort();
    let maxStreak = 0;
    let tempStreak = 0;
    let prevDate = null;

    for (const day of sortedDays) {
      const cur = new Date(day);
      if (!prevDate) {
        tempStreak = 1;
      } else {
        const diffDays = Math.round((cur.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24));
        if (diffDays === 1) {
          tempStreak += 1;
        } else if (diffDays > 1) {
          tempStreak = 1;
        }
      }
      if (tempStreak > maxStreak) {
        maxStreak = tempStreak;
      }
      prevDate = cur;
    }

    const currentStreak = matched.userCalendar?.streak || 0;
    const totalActiveDays = Math.max(sortedDays.length, matched.userCalendar?.totalActiveDays || 0);

    const acStats = matched.submitStats?.acSubmissionNum || [];
    const allSolved = acStats.find((s) => s.difficulty === "All")?.count || 0;
    const easySolved = acStats.find((s) => s.difficulty === "Easy")?.count || 0;
    const mediumSolved = acStats.find((s) => s.difficulty === "Medium")?.count || 0;
    const hardSolved = acStats.find((s) => s.difficulty === "Hard")?.count || 0;

    res.status(200).json({
      success: true,
      stats: {
        username: matched.username,
        realName: matched.profile?.realName || matched.username,
        avatar: matched.profile?.userAvatar || "",
        ranking: matched.profile?.ranking || null,
        currentStreak,
        maxStreak: Math.max(maxStreak, currentStreak),
        totalActiveDays,
        totalSubmissions,
        solved: {
          all: allSolved,
          easy: easySolved,
          medium: mediumSolved,
          hard: hardSolved,
        },
        submissionCalendar: rawCalendar,
      },
    });
  } catch (error) {
    console.error("[Get LeetCode Stats]", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch LeetCode statistics",
    });
  }
};

