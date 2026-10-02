import { memo, useState } from "react";
import { FileText } from "lucide-react";

const PlayerInfoCard = memo(
  ({ currentVideo, currentIndex, totalVideos, onNotesClick }) => {
    const [showFullDesc, setShowFullDesc] = useState(false);

    return (
      <div className="bg-white dark:bg-neutral-900/25 border border-slate-200 dark:border-neutral-800/50 shadow-xs dark:shadow-none rounded-xl p-4 md:p-5 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-widest uppercase text-red-600 dark:text-red-400">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              Now Playing
            </span>
            <span className="text-[10px] text-slate-500 dark:text-neutral-600 font-mono">
              {currentIndex + 1} / {totalVideos}
            </span>
          </div>

          <button
            type="button"
            onClick={() => onNotesClick(currentVideo)}
            className={`shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl border transition-all cursor-pointer ${
              currentVideo?.notes?.trim()
                ? "bg-red-50 border-red-200 text-red-600 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-300"
                : "bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200 dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-300 hover:border-red-500/30"
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-red-500 dark:text-red-400" />
            <span className="text-xs font-medium">
              {currentVideo?.notes?.trim() ? "Saved" : "Notes"}
            </span>
          </button>
        </div>

        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-neutral-100 leading-snug">
          {currentVideo?.title}
        </h1>

        <div className="h-px w-full bg-slate-200 dark:bg-neutral-800/60" />

        <p className="text-slate-600 dark:text-neutral-400 text-xs md:text-sm leading-relaxed whitespace-pre-line break-words">
          {showFullDesc
            ? currentVideo?.description
            : `${currentVideo?.description?.slice(0, 240) || ""}...`}
        </p>

        {currentVideo?.description?.length > 240 && (
          <button
            type="button"
            onClick={() => setShowFullDesc((prev) => !prev)}
            className="text-xs font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition cursor-pointer"
          >
            {showFullDesc ? "Show Less" : "Show More"}
          </button>
        )}
      </div>
    );
  },
);

PlayerInfoCard.displayName = "PlayerInfoCard";
export default PlayerInfoCard;
