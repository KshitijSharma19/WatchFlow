import { useState, useEffect } from "react";
import {
  X,
  Pin,
  ExternalLink,
  Copy,
  Check,
  Edit2,
  Trash2,
  Bookmark,
  Sparkles,
  Code,
  List,
  CheckSquare,
} from "lucide-react";
import toast from "react-hot-toast";

const COLOR_MAP = {
  emerald: {
    bg: "bg-emerald-500/10 dark:bg-emerald-500/15",
    border: "border-emerald-500/30",
    text: "text-emerald-700 dark:text-emerald-400",
    glow: "hover:border-emerald-500/50",
  },
  cyan: {
    bg: "bg-cyan-500/10 dark:bg-cyan-500/15",
    border: "border-cyan-500/30",
    text: "text-cyan-700 dark:text-cyan-400",
    glow: "hover:border-cyan-500/50",
  },
  purple: {
    bg: "bg-purple-500/10 dark:bg-purple-500/15",
    border: "border-purple-500/30",
    text: "text-purple-700 dark:text-purple-400",
    glow: "hover:border-purple-500/50",
  },
  amber: {
    bg: "bg-amber-500/10 dark:bg-amber-500/15",
    border: "border-amber-500/30",
    text: "text-amber-700 dark:text-amber-400",
    glow: "hover:border-amber-500/50",
  },
  rose: {
    bg: "bg-rose-500/10 dark:bg-rose-500/15",
    border: "border-rose-500/30",
    text: "text-rose-700 dark:text-rose-400",
    glow: "hover:border-rose-500/50",
  },
  blue: {
    bg: "bg-blue-500/10 dark:bg-blue-500/15",
    border: "border-blue-500/30",
    text: "text-blue-700 dark:text-blue-400",
    glow: "hover:border-blue-500/50",
  },
};

export default function NoteModal({
  isOpen,
  onClose,
  mode = "view", // "view" | "create" | "edit"
  note = null,
  categories = [],
  onSave,
  onDelete,
  onTogglePin,
}) {
  const [currentMode, setCurrentMode] = useState(mode);
  const [copied, setCopied] = useState(false);

  // Form fields
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("General");
  const [customCategory, setCustomCategory] = useState("");
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const [resourceLink, setResourceLink] = useState("");
  const [color, setColor] = useState("blue");
  const [isPinned, setIsPinned] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setCurrentMode(mode);
    if (note) {
      setTitle(note.title || "");
      const isKnown = categories.includes(note.category);
      if (isKnown) {
        setCategory(note.category);
        setIsCustomCategory(false);
        setCustomCategory("");
      } else {
        setCategory("__custom__");
        setIsCustomCategory(true);
        setCustomCategory(note.category || "");
      }
      setTags(Array.isArray(note.tags) ? note.tags.join(", ") : note.tags || "");
      setContent(note.content || "");
      setResourceLink(note.resourceLink || "");
      setColor(note.color || "blue");
      setIsPinned(Boolean(note.isPinned));
    } else {
      setTitle("");
      setCategory(categories[1] || "General");
      setIsCustomCategory(false);
      setCustomCategory("");
      setTags("");
      setContent("");
      setResourceLink("");
      setColor("blue");
      setIsPinned(false);
    }
  }, [note, mode, categories, isOpen]);

  if (!isOpen) return null;

  const handleCopy = () => {
    const textToCopy = `${title}\n\nCategory: ${category}\n${content}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    toast.success("Note copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Please provide a note title");
      return;
    }
    if (!content.trim()) {
      toast.error("Note content cannot be empty");
      return;
    }

    const finalCategory = isCustomCategory
      ? customCategory.trim() || "General"
      : category === "__custom__"
      ? customCategory.trim() || "General"
      : category;

    const formattedTags = tags
      .split(",")
      .map((t) => t.trim().toLowerCase().replace(/^#/, ""))
      .filter(Boolean);

    setIsSubmitting(true);
    try {
      await onSave({
        _id: note?._id,
        id: note?.id,
        title: title.trim(),
        category: finalCategory,
        tags: formattedTags,
        content: content.trim(),
        resourceLink: resourceLink.trim(),
        color,
        isPinned,
      });
      toast.success(note ? "Note updated!" : "Note saved successfully!");
      onClose();
    } catch {
      toast.error("Failed to save note. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const insertSnippet = (snippet) => {
    setContent((prev) => (prev ? `${prev}\n\n${snippet}` : snippet));
  };

  const colorStyles = COLOR_MAP[color] || COLOR_MAP.blue;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-neutral-800 bg-slate-50/50 dark:bg-neutral-950/40">
          <div className="flex items-center gap-2.5">
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${colorStyles.bg} ${colorStyles.border} ${colorStyles.text}`}
            >
              {currentMode === "view"
                ? note?.category || "General"
                : currentMode === "create"
                ? "New Categorized Note"
                : "Edit Note"}
            </span>

            {currentMode === "view" && note?.isPinned && (
              <span className="flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                <Pin className="w-3 h-3 fill-current" />
                Pinned
              </span>
            )}
          </div>

          <div className="flex items-center gap-1">
            {currentMode === "view" && (
              <>
                <button
                  onClick={handleCopy}
                  title="Copy note"
                  className="p-2 text-slate-500 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => setCurrentMode("edit")}
                  title="Edit note"
                  className="p-2 text-slate-500 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>

                {onDelete && !note?.isDefault && (
                  <button
                    onClick={() => {
                      if (window.confirm("Are you sure you want to delete this note?")) {
                        onDelete(note);
                        onClose();
                      }
                    }}
                    title="Delete note"
                    className="p-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 rounded-lg hover:bg-red-500/10 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </>
            )}

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* View Mode */}
        {currentMode === "view" ? (
          <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                {note?.title}
              </h2>
              {note?.updatedAt && (
                <p className="text-xs text-slate-400 dark:text-neutral-500 mt-1">
                  Updated {new Date(note.updatedAt).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              )}
            </div>

            {/* Note Content */}
            <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-neutral-300 leading-relaxed whitespace-pre-line font-sans text-sm sm:text-base bg-slate-50/70 dark:bg-neutral-950/50 p-4 sm:p-5 rounded-xl border border-slate-200/80 dark:border-neutral-800/80">
              {note?.content}
            </div>

            {/* Tags */}
            {note?.tags && note.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {note.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-neutral-400 border border-slate-200 dark:border-neutral-700/60"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Resource Link if available */}
            {note?.resourceLink && (
              <div className="pt-2 border-t border-slate-100 dark:border-neutral-800">
                <a
                  href={note.resourceLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 transition-colors border border-red-500/20"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open External Reference / Cheatsheet
                </a>
              </div>
            )}
          </div>
        ) : (
          /* Create / Edit Mode */
          <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            {/* Title */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-neutral-400 mb-1.5">
                Note Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Dynamic Programming 0/1 Knapsack Pattern"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500"
              />
            </div>

            {/* Category selection & bifurcation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-neutral-400 mb-1.5">
                  Bifurcation Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={isCustomCategory ? "__custom__" : category}
                  onChange={(e) => {
                    if (e.target.value === "__custom__") {
                      setIsCustomCategory(true);
                    } else {
                      setIsCustomCategory(false);
                      setCategory(e.target.value);
                    }
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500"
                >
                  {categories
                    .filter((c) => c !== "All")
                    .map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  <option value="__custom__">+ Add Custom Category...</option>
                </select>
              </div>

              {/* Accent Color */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-neutral-400 mb-1.5">
                  Color Tag
                </label>
                <div className="flex items-center gap-2 pt-1">
                  {Object.keys(COLOR_MAP).map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setColor(c)}
                      className={`w-7 h-7 rounded-full border-2 transition-transform ${
                        c === "emerald"
                          ? "bg-emerald-500"
                          : c === "cyan"
                          ? "bg-cyan-500"
                          : c === "purple"
                          ? "bg-purple-500"
                          : c === "amber"
                          ? "bg-amber-500"
                          : c === "rose"
                          ? "bg-rose-500"
                          : "bg-blue-500"
                      } ${
                        color === c
                          ? "scale-110 border-white dark:border-neutral-900 shadow-md ring-2 ring-red-500"
                          : "border-transparent opacity-75 hover:opacity-100"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Custom Category Input if selected */}
            {isCustomCategory && (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-neutral-400 mb-1.5">
                  Custom Category Name
                </label>
                <input
                  type="text"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  placeholder="e.g., Cloud Computing & DevOps, Machine Learning"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500"
                />
              </div>
            )}

            {/* Tags & External Resource */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-neutral-400 mb-1.5">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="e.g., dsa, recursion, cheatsheet"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-neutral-400 mb-1.5">
                  External Resource / URL (Optional)
                </label>
                <input
                  type="url"
                  value={resourceLink}
                  onChange={(e) => setResourceLink(e.target.value)}
                  placeholder="https://notion.so/... or Google Drive / GitHub"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500"
                />
              </div>
            </div>

            {/* Quick Templates Toolbar */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-neutral-400">
                  Note Content & Key Takeaways <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-slate-400 dark:text-neutral-500 hidden sm:inline">
                    Insert:
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      insertSnippet("```javascript\n// Paste or type your code snippet here\n\n```")
                    }
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-neutral-300 hover:bg-slate-200 dark:hover:bg-neutral-700 transition-colors"
                  >
                    <Code className="w-3 h-3" />
                    Code
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      insertSnippet(
                        "### Core Principles\n- Principle 1: ...\n- Principle 2: ...\n- Principle 3: ..."
                      )
                    }
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-neutral-300 hover:bg-slate-200 dark:hover:bg-neutral-700 transition-colors"
                  >
                    <List className="w-3 h-3" />
                    List
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      insertSnippet(
                        "### Implementation Checklist\n[ ] Understand edge cases\n[ ] Time complexity bounds\n[ ] Space optimization"
                      )
                    }
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-neutral-300 hover:bg-slate-200 dark:hover:bg-neutral-700 transition-colors"
                  >
                    <CheckSquare className="w-3 h-3" />
                    Checklist
                  </button>
                </div>
              </div>

              <textarea
                required
                rows={9}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your study notes, algorithmic breakdowns, or architectural notes..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 text-slate-900 dark:text-white text-sm font-sans focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500"
              />
            </div>

            {/* Pin note option */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="isPinned"
                checked={isPinned}
                onChange={(e) => setIsPinned(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-red-600 focus:ring-red-500 cursor-pointer"
              />
              <label
                htmlFor="isPinned"
                className="text-xs font-medium text-slate-700 dark:text-neutral-300 cursor-pointer flex items-center gap-1"
              >
                <Pin className="w-3 h-3 fill-current text-amber-500" />
                Pin note to the top of your vault
              </label>
            </div>

            {/* Form actions */}
            <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-200 dark:border-neutral-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 dark:text-neutral-400 hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 rounded-xl text-sm font-semibold bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30 transition-all disabled:opacity-50"
              >
                {isSubmitting ? "Saving..." : note ? "Update Note" : "Save to Vault"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
