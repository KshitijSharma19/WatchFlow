import { memo } from "react";
import { FileText } from "lucide-react";

const QueueVideoCard = memo(
  ({ video, index, isActive, onVideoSelect, onNotesClick }) => {
    return (
      <div
        onClick={() => onVideoSelect(video._id)}
        className={`rounded-lg p-2 cursor-pointer border transition-all duration-150 flex gap-3 group ${
          isActive
            ? "bg-red-500/10 border-red-500/30"
            : "bg-transparent hover:bg-neutral-900/60 border-transparent hover:border-neutral-800/50"
        }`}
      >
        <div className="relative shrink-0">
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="w-[100px] aspect-video rounded-md object-cover bg-neutral-900 block"
            loading="lazy"
          />
          <div
            className={`absolute bottom-1 right-1 px-1 py-0.5 rounded text-[9px] font-mono ${
              isActive
                ? "bg-red-600 text-white"
                : "bg-black/80 text-neutral-300"
            }`}
          >
            {index + 1}
          </div>
        </div>

        <div className="min-w-0 flex-1 flex flex-col justify-between py-0.5 gap-2">
          <div className="flex items-start justify-between gap-2">
            <p
              className={`text-xs font-medium line-clamp-2 leading-snug flex-1 ${
                isActive
                  ? "text-red-300"
                  : "text-neutral-200 group-hover:text-white"
              }`}
            >
              {video.title}
            </p>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onNotesClick(video);
              }}
              className={`p-1 rounded-md transition shrink-0 ${
                video.notes?.trim()
                  ? "bg-red-500/15 text-red-400"
                  : "text-neutral-500 hover:text-red-400 hover:bg-neutral-800"
              }`}
            >
              <FileText className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-1">
            {video.progressPercent > 0 && (
              <div className="h-0.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-500 rounded-full"
                  style={{ width: `${video.progressPercent}%` }}
                />
              </div>
            )}

            <div className="flex items-center justify-between text-[10px] text-neutral-500 font-mono">
              {video.progressPercent > 0 && (
                <span className="text-red-400/80">
                  {video.progressPercent === 100
                    ? "Done"
                    : `${video.progressPercent}%`}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  },
);

QueueVideoCard.displayName = "QueueVideoCard";
export default QueueVideoCard;
