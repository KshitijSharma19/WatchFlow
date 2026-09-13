import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { Clock, Plus, Trash2, Edit2, Play, Save, X } from "lucide-react";
import api from "../../api/axios";
import formatTime from "../../utils/formatTime";

export default function NotesModal({
  isOpen,
  onClose,
  video,
  player,
  onSeekTimestamp,
  onNotesSaved,
}) {
  const [activeTab, setActiveTab] = useState("timestamps"); // 'timestamps' | 'general'
  const [timestampNotes, setTimestampNotes] = useState([]);
  const [loadingNotes, setLoadingNotes] = useState(false);

  // New Note state
  const [newNoteText, setNewNoteText] = useState("");
  const [currentTimestamp, setCurrentTimestamp] = useState(0);
  const [savingNote, setSavingNote] = useState(false);

  // Edit Note state
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // General text notes state
  const [generalNotesText, setGeneralNotesText] = useState("");
  const [savingGeneral, setSavingGeneral] = useState(false);

  const fetchNotes = useCallback(async () => {
    if (!video?._id) return;
    try {
      setLoadingNotes(true);
      const res = await api.get(`/videos/${video._id}/notes`);
      setTimestampNotes(res.data.notes || []);
    } catch (err) {
      console.error("[Fetch Timestamp Notes]", err.message);
    } finally {
      setLoadingNotes(false);
    }
  }, [video]);

  useEffect(() => {
    if (isOpen && video) {
      fetchNotes();
      setGeneralNotesText(video.notes || "");
      if (player && typeof player.getCurrentTime === "function") {
        try {
          const time = Math.floor(player.getCurrentTime() || 0);
          setCurrentTimestamp(time);
        } catch {
          setCurrentTimestamp(0);
        }
      }
    }
  }, [isOpen, video, player, fetchNotes]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === "Escape" && !savingNote && !savingGeneral) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, savingNote, savingGeneral, onClose]);

  if (!isOpen || !video) return null;

  const handleCaptureTimestamp = () => {
    if (player && typeof player.getCurrentTime === "function") {
      try {
        const time = Math.floor(player.getCurrentTime() || 0);
        setCurrentTimestamp(time);
      } catch {
        setCurrentTimestamp(0);
      }
    }
  };

  const handleCreateNote = async (e) => {
    e.preventDefault();
    if (!newNoteText.trim() || savingNote) return;

    try {
      setSavingNote(true);
      const res = await api.post(`/videos/${video._id}/notes`, {
        timestamp: currentTimestamp,
        noteText: newNoteText.trim(),
      });

      setTimestampNotes((prev) =>
        [...prev, res.data.note].sort((a, b) => a.timestamp - b.timestamp),
      );
      setNewNoteText("");
      toast.success("Timestamp note added!");
    } catch (err) {
      console.error("[Add Note]", err.message);
      toast.error(err.response?.data?.message || "Failed to add note.");
    } finally {
      setSavingNote(false);
    }
  };

  const handleStartEdit = (note) => {
    setEditingNoteId(note._id);
    setEditingText(note.noteText);
  };

  const handleSaveEdit = async (noteId) => {
    if (!editingText.trim()) return;
    try {
      const res = await api.put(`/notes/${noteId}`, {
        noteText: editingText.trim(),
      });
      setTimestampNotes((prev) =>
        prev.map((n) => (n._id === noteId ? res.data.note : n)),
      );
      setEditingNoteId(null);
      toast.success("Note updated!");
    } catch (err) {
      console.error("[Update Note]", err.message);
      toast.error("Failed to update note.");
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await api.delete(`/notes/${noteId}`);
      setTimestampNotes((prev) => prev.filter((n) => n._id !== noteId));
      toast.success("Note deleted.");
    } catch (err) {
      console.error("[Delete Note]", err.message);
      toast.error("Failed to delete note.");
    }
  };

  const handleSaveGeneralNotes = async () => {
    if (savingGeneral) return;
    try {
      setSavingGeneral(true);
      const res = await api.patch(`/videos/${video._id}/notes`, {
        notes: generalNotesText.trim(),
      });

      if (onNotesSaved) {
        onNotesSaved(res.data.video);
      }
      toast.success("Summary notes saved.");
      onClose();
    } catch (err) {
      console.error("[Save General Notes]", err.message);
      toast.error("Failed to save summary notes.");
    } finally {
      setSavingGeneral(false);
    }
  };

  const handleJumpTo = (seconds) => {
    if (onSeekTimestamp) {
      onSeekTimestamp(seconds);
    }
    toast.success(`Jumped to ${formatTime(seconds)}`);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-2xl rounded-2xl border border-neutral-800 bg-[#0b0b0d] p-5 sm:p-6 shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-neutral-100 truncate max-w-[450px]">
              {video.title}
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">Video Learning Notes</p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close notes modal"
            className="p-1.5 rounded-lg border border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 border-b border-neutral-800/80 pb-3 mb-4">
          <button
            type="button"
            onClick={() => setActiveTab("timestamps")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer ${
              activeTab === "timestamps"
                ? "bg-red-500/20 border border-red-500/30 text-red-400"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            Timestamp Notes ({timestampNotes.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("general")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer ${
              activeTab === "general"
                ? "bg-red-500/20 border border-red-500/30 text-red-400"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Video Summary
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "timestamps" ? (
          <div className="flex-1 flex flex-col min-h-0 space-y-4">
            {/* Create New Timestamp Note Form */}
            <form
              onSubmit={handleCreateNote}
              className="bg-neutral-900/60 border border-neutral-800/80 p-3.5 rounded-xl space-y-3 shrink-0"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-neutral-400 font-medium">
                    Timestamp:
                  </span>
                  <button
                    type="button"
                    onClick={handleCaptureTimestamp}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-950 border border-neutral-800 text-red-400 font-mono text-xs hover:border-red-500/30 transition cursor-pointer"
                  >
                    <Clock className="w-3 h-3" />
                    {formatTime(currentTimestamp)}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleCaptureTimestamp}
                  className="text-[11px] text-neutral-400 hover:text-red-400 underline transition cursor-pointer"
                >
                  Capture current time
                </button>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder="Write a note at this timestamp..."
                  className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-red-500/50"
                />

                <button
                  type="submit"
                  disabled={savingNote || !newNoteText.trim()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#BA3C3C] to-[#E04D4D] text-xs font-semibold text-white hover:opacity-90 transition disabled:opacity-50 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Note
                </button>
              </div>
            </form>

            {/* List of Timestamp Notes */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1 min-h-[200px]">
              {loadingNotes ? (
                <div className="text-center py-8 text-xs text-neutral-400">
                  Loading saved notes...
                </div>
              ) : timestampNotes.length === 0 ? (
                <div className="text-center py-10 border border-dashed border-neutral-800/80 rounded-xl text-neutral-500 text-xs">
                  No timestamp notes saved yet. Add key moments above!
                </div>
              ) : (
                timestampNotes.map((note) => (
                  <div
                    key={note._id}
                    className="bg-neutral-900/40 border border-neutral-800/80 p-3 rounded-xl flex items-start justify-between gap-3 group hover:border-neutral-700 transition"
                  >
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      {/* Jump to timestamp button */}
                      <button
                        type="button"
                        onClick={() => handleJumpTo(note.timestamp)}
                        title={`Jump to ${formatTime(note.timestamp)}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-xs font-bold hover:bg-red-500/20 transition cursor-pointer shrink-0 mt-0.5"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        {formatTime(note.timestamp)}
                      </button>

                      {editingNoteId === note._id ? (
                        <div className="flex-1 flex gap-2">
                          <input
                            type="text"
                            value={editingText}
                            onChange={(e) => setEditingText(e.target.value)}
                            className="flex-1 bg-neutral-950 border border-neutral-700 rounded-lg px-2.5 py-1 text-xs text-neutral-100"
                            autoFocus
                          />
                          <button
                            type="button"
                            onClick={() => handleSaveEdit(note._id)}
                            className="p-1.5 bg-emerald-600 rounded-lg text-white hover:bg-emerald-500 transition"
                          >
                            <Save className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <p className="text-xs text-neutral-200 leading-relaxed break-words flex-1 mt-1">
                          {note.noteText}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-1 shrink-0 opacity-80 group-hover:opacity-100">
                      <button
                        type="button"
                        onClick={() => handleStartEdit(note)}
                        title="Edit note"
                        className="p-1 rounded text-neutral-400 hover:text-white transition"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteNote(note._id)}
                        title="Delete note"
                        className="p-1 rounded text-neutral-400 hover:text-red-400 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          /* General Summary Notes */
          <div className="flex-1 flex flex-col space-y-4">
            <textarea
              rows={10}
              value={generalNotesText}
              onChange={(e) => setGeneralNotesText(e.target.value)}
              placeholder="Write summary notes for this video..."
              className="w-full flex-1 resize-none rounded-xl border border-neutral-800 bg-neutral-900 p-4 text-xs sm:text-sm text-neutral-100 outline-none focus:border-red-500/50"
            />

            <div className="flex justify-end gap-3 shrink-0">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg bg-neutral-800 px-4 py-2 text-xs font-medium text-neutral-300 hover:bg-neutral-700 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={savingGeneral}
                onClick={handleSaveGeneralNotes}
                className="rounded-lg bg-gradient-to-r from-[#BA3C3C] to-[#E04D4D] px-4 py-2 text-xs font-semibold text-white hover:opacity-90 transition disabled:opacity-50"
              >
                {savingGeneral ? "Saving..." : "Save Summary"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
