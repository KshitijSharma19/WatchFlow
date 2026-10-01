import { useState } from "react";
import { X, Check, CheckCircle2, FileText } from "lucide-react";

export default function RoadmapPlayerModal({
  isOpen,
  video,
  courseTitle,
  isCompleted,
  onToggleComplete,
  onClose,
}) {
  const [showNotes, setShowNotes] = useState(false);
  const [noteText, setNoteText] = useState("");

  if (!isOpen || !video) return null;

  const ytVideoId = video.ytVideoId || video.videoId || video.id;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-slate-900 dark:bg-[#0c0c11] border border-slate-700/80 dark:border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:px-6 border-b border-slate-800 dark:border-neutral-800/80 flex items-center justify-between gap-4 bg-slate-950/60">
          <div className="min-w-0">
            <span className="text-[11px] font-bold text-[#E04D4D] uppercase tracking-wider block">
              {courseTitle || "Roadmap Video Lesson"}
            </span>
            <h3 className="text-sm sm:text-base font-bold text-white truncate">
              {video.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            aria-label="Close video player"
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800/80 transition cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player (Embedded directly in WatchFlow) */}
        <div className="relative w-full aspect-video bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${ytVideoId}?autoplay=1&rel=0&modestbranding=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>

        {/* Action Controls & Notes Bar */}
        <div className="p-4 px-6 bg-slate-950/90 border-t border-slate-800 dark:border-neutral-800/80 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onToggleComplete(video.id || video._id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                isCompleted
                  ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-400"
                  : "bg-white/10 hover:bg-white/15 border border-white/10 text-white"
              }`}
            >
              {isCompleted ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Completed</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Mark as Done</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setShowNotes(!showNotes)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-neutral-300 transition cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{showNotes ? "Hide Notes" : "Quick Notes"}</span>
            </button>
          </div>

          <span className="text-[11px] text-neutral-400">
            Playing directly inside WatchFlow · distraction-free
          </span>
        </div>

        {/* Quick Notes Tray */}
        {showNotes && (
          <div className="p-4 bg-slate-900 dark:bg-[#07070a] border-t border-slate-800 dark:border-neutral-900 animate-in slide-in-from-bottom duration-200">
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Jot down quick takeaways, formulas, or timestamps..."
              rows={3}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-[#E04D4D]"
            />
          </div>
        )}
      </div>
    </div>
  );
}
