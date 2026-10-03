const Feedback = require("../models/Feedback");

exports.submitFeedback = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields",
      });
    }

    const feedback = await Feedback.create({
      user: req.user?._id || null,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
    });

    res.status(201).json({
      success: true,
      message: "Feedback submitted successfully. Thank you!",
      feedback: {
        id: feedback._id,
        createdAt: feedback.createdAt,
      },
    });
  } catch (error) {
    console.error("[Submit Feedback Error]:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to submit feedback. Please try again later.",
    });
  }
};
