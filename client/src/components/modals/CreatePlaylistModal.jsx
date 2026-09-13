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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-playlist-title"
    >
      <div className="w-full max-w-lg rounded-2xl border border-neutral-800 bg-[#111] p-6">
        <h2 id="create-playlist-title" className="text-xl font-bold">
          Import Playlist
        </h2>

        <p className="mt-2 text-sm text-neutral-400">
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
          className="mt-5 w-full rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-3 outline-none transition-colors focus:border-red-500"
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
            className="rounded-xl border border-neutral-700 px-5 py-2 transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={importing || !url.trim()}
            onClick={handleImport}
            className={`flex items-center gap-2 rounded-xl px-5 py-2 font-medium transition-opacity duration-200 ${
              importing || !url.trim()
                ? "cursor-not-allowed bg-neutral-700 text-neutral-400"
                : "bg-gradient-to-r from-[#BA3C3C] to-[#E04D4D] hover:opacity-90"
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
