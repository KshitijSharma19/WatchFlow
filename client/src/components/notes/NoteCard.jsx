import {
  Pin,
  ExternalLink,
  Copy,
  Check,
  Edit2,
  Trash2,
  Bookmark,
  Calendar,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const COLOR_MAP = {
  emerald: {
    badgeBg: "bg-emerald-500/10 dark:bg-emerald-500/15",
    badgeBorder: "border-emerald-500/30",
    badgeText: "text-emerald-700 dark:text-emerald-400",
    accent: "group-hover:border-emerald-500/40",
  },
  cyan: {
    badgeBg: "bg-cyan-500/10 dark:bg-cyan-500/15",
    badgeBorder: "border-cyan-500/30",
    badgeText: "text-cyan-700 dark:text-cyan-400",
    accent: "group-hover:border-cyan-500/40",
  },
  purple: {
    badgeBg: "bg-purple-500/10 dark:bg-purple-500/15",
    badgeBorder: "border-purple-500/30",
    badgeText: "text-purple-700 dark:text-purple-400",
    accent: "group-hover:border-purple-500/40",
  },
  amber: {
    badgeBg: "bg-amber-500/10 dark:bg-amber-500/15",
    badgeBorder: "border-amber-500/30",
    badgeText: "text-amber-700 dark:text-amber-400",
    accent: "group-hover:border-amber-500/40",
  },
  rose: {
    badgeBg: "bg-rose-500/10 dark:bg-rose-500/15",
    badgeBorder: "border-rose-500/30",
    badgeText: "text-rose-700 dark:text-rose-400",
    accent: "group-hover:border-rose-500/40",
  },
  blue: {
    badgeBg: "bg-blue-500/10 dark:bg-blue-500/15",
    badgeBorder: "border-blue-500/30",
    badgeText: "text-blue-700 dark:text-blue-400",
    accent: "group-hover:border-blue-500/40",
  },
};

export default function NoteCard({
  note,
  onOpen,
  onEdit,
  onDelete,
  onTogglePin,
  onSelectTag,
}) {
  const [copied, setCopied] = useState(false);

  const colorStyles = COLOR_MAP[note.color] || COLOR_MAP.blue;

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`${note.title}\n\n${note.content}`);
    setCopied(true);
    toast.success("Note content copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePin = (e) => {
    e.stopPropagation();
    if (onTogglePin) onTogglePin(note);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this note?")) {
      onDelete(note);
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(note);
  };

  return (
    <div
      onClick={() => onOpen(note)}
      className={`group relative flex flex-col justify-between p-5 rounded-2xl bg-white dark:bg-neutral-900/90 border border-slate-200 dark:border-neutral-800/80 shadow-xs hover:shadow-xl dark:shadow-neutral-950/50 transition-all duration-200 cursor-pointer ${colorStyles.accent} hover:-translate-y-0.5`}
    >
      {/* Top Header: Category Pill & Pin Action */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${colorStyles.badgeBg} ${colorStyles.badgeBorder} ${colorStyles.badgeText}`}
          >
            {note.category}
          </span>

          <div className="flex items-center gap-1">
            <button
              onClick={handlePin}
              title={note.isPinned ? "Unpin note" : "Pin note to top"}
              className={`p-1.5 rounded-lg transition-colors ${
                note.isPinned
                  ? "text-amber-500 bg-amber-500/10 hover:bg-amber-500/20"
                  : "text-slate-400 hover:text-slate-600 dark:text-neutral-500 dark:hover:text-neutral-300 hover:bg-slate-100 dark:hover:bg-neutral-800"
              }`}
            >
              <Pin className={`w-3.5 h-3.5 ${note.isPinned ? "fill-current" : ""}`} />
            </button>

            <button
              onClick={handleCopy}
              title="Quick copy"
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:text-neutral-500 dark:hover:text-neutral-300 rounded-lg hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
          {note.title}
        </h3>

        {/* Content Snippet */}
        <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 line-clamp-3 mt-2 leading-relaxed whitespace-pre-line font-sans">
          {note.content.replace(/```[\s\S]*?```/g, "[Code Snippet]")}
        </p>
      </div>

      {/* Bottom Footer: Tags, Link & Management */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-neutral-800/80">
        {/* Tags */}
        {note.tags && note.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-2.5">
            {note.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  if (onSelectTag) onSelectTag(tag);
                }}
                className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-neutral-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              >
                #{tag}
              </span>
            ))}
            {note.tags.length > 3 && (
              <span className="text-[10px] text-slate-400 dark:text-neutral-500 self-center">
                +{note.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Footer info & action buttons */}
        <div className="flex items-center justify-between text-xs text-slate-400 dark:text-neutral-500">
          <div className="flex items-center gap-2">
            {note.resourceLink && (
              <a
                href={note.resourceLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                title="Open resource link"
                className="inline-flex items-center gap-1 text-red-500 hover:text-red-600 dark:hover:text-red-400 font-medium"
              >
                <ExternalLink className="w-3 h-3" />
                Resource
              </a>
            )}
          </div>

          <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleEdit}
              title="Edit note"
              className="p-1 text-slate-400 hover:text-slate-700 dark:text-neutral-500 dark:hover:text-neutral-200 rounded hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>

            {!note.isDefault && (
              <button
                onClick={handleDelete}
                title="Delete note"
                className="p-1 text-slate-400 hover:text-red-500 dark:text-neutral-500 dark:hover:text-red-400 rounded hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
