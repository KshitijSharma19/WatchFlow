import { X, ExternalLink } from "lucide-react";

export default function VideoModal({ problem, isOpen, onClose }) {
  if (!isOpen || !problem) return null;

  const embedUrl = problem.youtubeId
    ? `https://www.youtube.com/embed/${problem.youtubeId}?autoplay=1&rel=0`
    : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-[#0f0f13] border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 px-6 border-b border-neutral-800/80 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
              {problem.title} · Video Walkthrough
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {problem.youtubeId && (
              <a
                href={`https://www.youtube.com/watch?v=${problem.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800 transition cursor-pointer text-xs flex items-center gap-1.5"
                title="Watch on YouTube"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">YouTube</span>
              </a>
            )}

            <button
              onClick={onClose}
              aria-label="Close video modal"
              className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800 transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Video Player Container */}
        <div className="w-full aspect-video bg-black flex items-center justify-center">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={`Video solution for ${problem.title}`}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="text-center p-8 text-neutral-400">
              <p className="text-sm">Video walkthrough is currently being prepared for this problem.</p>
              <a
                href={problem.leetcodeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-xs text-red-400 hover:underline"
              >
                View discussions on LeetCode <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 px-6 bg-[#0a0a0d] border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
          <span>{problem.hint}</span>
          <span className="text-neutral-500">WatchFlow Problem Walkthrough</span>
        </div>
      </div>
    </div>
  );
}
