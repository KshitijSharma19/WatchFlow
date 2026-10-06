import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export default function CreatePlaylistModal({
  isOpen,
  onClose,
  onImport,
  importing,
}) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (!isOpen) {
      queueMicrotask(() => {
        setUrl("");
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === "Escape" && !importing) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, importing, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleImport = () => {
    const trimmedUrl = url.trim();

    if (!trimmedUrl || importing) {
      return;
    }

    onImport(trimmedUrl);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 sm:p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-playlist-title"
    >
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-[#111] p-4 sm:p-6 shadow-2xl text-slate-900 dark:text-white">
        <h2 id="create-playlist-title" className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
          Import Playlist
        </h2>

        <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-slate-500 dark:text-neutral-400">
          Paste a YouTube playlist URL.
        </p>

        <input
          autoFocus
          type="url"
          value={url}
          placeholder="https://youtube.com/playlist?list=..."
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleImport();
            }
          }}
          className="mt-5 w-full rounded-xl border border-slate-300 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-900 px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-neutral-500 outline-none transition-colors focus:border-red-500"
        />

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            disabled={importing}
            onClick={() => {
              if (!importing) {
                onClose();
              }
            }}
            className="rounded-xl border border-slate-300 dark:border-neutral-700 px-5 py-2 text-slate-700 dark:text-neutral-300 transition-colors hover:bg-slate-100 dark:hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={importing || !url.trim()}
            onClick={handleImport}
            className={`flex items-center gap-2 rounded-xl px-5 py-2 font-medium transition-opacity duration-200 cursor-pointer ${
              importing || !url.trim()
                ? "cursor-not-allowed bg-slate-200 dark:bg-neutral-700 text-slate-400 dark:text-neutral-400"
                : "bg-red-500/10 hover:bg-red-500/20 text-[#E04D4D] dark:text-red-400 border border-red-500/30"
            }`}
          >
            {importing && <Loader2 className="h-4 w-4 animate-spin" />}

            {importing ? "Importing..." : "Import Playlist"}
          </button>
        </div>
      </div>
    </div>
  );
}
