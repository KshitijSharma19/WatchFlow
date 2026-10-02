const CategorizedNote = require("../models/CategorizedNote");

exports.getNotes = async (req, res) => {
  try {
    const userId = req.user.id;
    const { category, search, pinned } = req.query;

    const query = { userId };

    if (category && category !== "All") {
      query.category = category;
    }

    if (pinned === "true") {
      query.isPinned = true;
    }

    if (search && search.trim()) {
      const searchRegex = new RegExp(search.trim(), "i");
      query.$or = [
        { title: searchRegex },
        { content: searchRegex },
        { tags: { $in: [searchRegex] } },
        { category: searchRegex },
      ];
    }

    const notes = await CategorizedNote.find(query).sort({
      isPinned: -1,
      updatedAt: -1,
    });

    res.status(200).json({
      success: true,
      count: notes.length,
      notes,
    });
  } catch (error) {
    console.error("[Get Notes Hub Error]:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve notes",
    });
  }
};

exports.createNote = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      title,
      category = "General",
      tags = [],
      content,
      resourceLink = "",
      resourceType = "doc",
      isPinned = false,
      color = "blue",
    } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Note title is required",
      });
    }

    if (!content || !content.trim()) {
      return res.status(400).json({
        success: false,
        message: "Note content is required",
      });
    }

    const formattedTags = Array.isArray(tags)
      ? tags.map((t) => String(t).trim()).filter(Boolean)
      : typeof tags === "string"
      ? tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : [];

    const note = await CategorizedNote.create({
      userId,
      title: title.trim(),
      category: category.trim() || "General",
      tags: formattedTags,
      content: content.trim(),
      resourceLink: resourceLink.trim(),
      resourceType,
      isPinned: Boolean(isPinned),
      color: color || "blue",
    });

    res.status(201).json({
      success: true,
      note,
    });
  } catch (error) {
    console.error("[Create Note Hub Error]:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to create note",
    });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const {
      title,
      category,
      tags,
      content,
      resourceLink,
      resourceType,
      isPinned,
      color,
    } = req.body;

    const note = await CategorizedNote.findOne({ _id: id, userId });
    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found or unauthorized",
      });
    }

    if (title !== undefined) note.title = title.trim();
    if (category !== undefined) note.category = category.trim() || "General";
    if (content !== undefined) note.content = content.trim();
    if (resourceLink !== undefined) note.resourceLink = resourceLink.trim();
    if (resourceType !== undefined) note.resourceType = resourceType;
    if (isPinned !== undefined) note.isPinned = Boolean(isPinned);
    if (color !== undefined) note.color = color;

    if (tags !== undefined) {
      note.tags = Array.isArray(tags)
        ? tags.map((t) => String(t).trim()).filter(Boolean)
        : typeof tags === "string"
        ? tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [];
    }

    await note.save();

    res.status(200).json({
      success: true,
      note,
    });
  } catch (error) {
    console.error("[Update Note Hub Error]:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to update note",
    });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const note = await CategorizedNote.findOneAndDelete({ _id: id, userId });
    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found or unauthorized",
      });
    }

    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
      noteId: id,
    });
  } catch (error) {
    console.error("[Delete Note Hub Error]:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to delete note",
    });
  }
};

exports.togglePin = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const note = await CategorizedNote.findOne({ _id: id, userId });
    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found or unauthorized",
      });
    }

    note.isPinned = !note.isPinned;
    await note.save();

    res.status(200).json({
      success: true,
      isPinned: note.isPinned,
      note,
    });
  } catch (error) {
    console.error("[Toggle Pin Error]:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to update pin status",
    });
  }
};
