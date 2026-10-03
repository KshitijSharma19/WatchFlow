module.exports = (user) => ({
  id: user._id,
  username: user.username,
  name: user.name || user.username || "",
  email: user.email,
  avatar: user.avatar || "",
  leetcodeUsername: user.leetcodeUsername || "",
});
