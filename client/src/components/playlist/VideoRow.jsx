import { memo } from "react";
import { FileText } from "lucide-react";
import formatDuration from "../../utils/formatDuration";

const VideoRow = memo(({ 
  video, 
  index, 
  onVideoClick, 
  onToggleComplete, 
  onNotesClick 
}) => {
  return (
    <div className="group bg-white dark:bg-neutral-900/20 border border-slate-200 dark:border-neutral-800 hover:border-red-500/30 hover:bg-red-50/20 dark:hover:bg-neutral-900/40 shadow-2xs dark:shadow-none transition-all duration-200 rounded-xl px-3 py-2.5">
      <div className="flex items-center justify-between gap-4">
        <div
          className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer"
          onClick={() => onVideoClick(video._id)}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleComplete(video._id, video.completed);
            }}
            className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all shrink-0 cursor-pointer ${
              video.completed
                ? "bg-red-600 text-white"
                : "bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-neutral-400 hover:bg-slate-200 dark:hover:bg-neutral-700 border border-slate-200 dark:border-transparent"
            }`}
          >
            {video.completed ? "✓" : index + 1}
          </button>

          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="w-24 rounded-lg object-cover shrink-0 aspect-video bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-transparent"
            loading="lazy"
          />

          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium line-clamp-2 text-slate-900 dark:text-white transition-colors duration-200 group-hover:text-red-600 dark:group-hover:text-red-300">
              {video.title}
            </h3>

            <div className="mt-2">
              <div className="flex justify-between text-xs text-slate-500 dark:text-neutral-500 mb-1">
                <span>{formatDuration(video.durationInSeconds)}</span>
                <span>{video.progressPercent}%</span>
              </div>

              <div className="w-full h-1 rounded-full bg-slate-200 dark:bg-neutral-800 overflow-hidden mt-1">
                <div
                  className="h-full bg-gradient-to-r from-[#BA3C3C] to-[#E04D4D]"
                  style={{ width: `${video.progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onNotesClick(video)}
          className={`shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl border transition-all cursor-pointer ${
            video.notes?.trim()
              ? "bg-red-50 border-red-200 text-red-600 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-300"
              : "bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200 dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-300 hover:border-red-500/30"
          }`}
        >
          <FileText className="w-3.5 h-3.5 text-red-500 dark:text-red-400" />
          <span className="text-xs font-medium">
            {video.notes?.trim() ? "Saved" : "Notes"}
          </span>
        </button>
      </div>
    </div>
  );
});

VideoRow.displayName = "VideoRow";
export default VideoRow;