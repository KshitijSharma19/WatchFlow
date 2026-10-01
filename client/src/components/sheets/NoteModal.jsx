import { useState, useEffect } from "react";
import { X, Save, Check } from "lucide-react";

export default function NoteModal({ problem, isOpen, onClose, onSaveNote, initialNote = "" }) {
  const [note, setNote] = useState(initialNote);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setNote(initialNote);
      setSaved(false);
    }
  }, [isOpen, initialNote]);

  if (!isOpen || !problem) return null;

  const handleSave = () => {
    onSaveNote(problem.id, note);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-[#0f0f13] border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-neutral-800/80 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Personal Notes: {problem.title}
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Jot down intuition, edge cases, or revision takeaways.
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close note modal"
            className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Text Area */}
        <div className="p-5">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="E.g., Used two pointers starting at opposite ends. Watch out for integer overflow on large sums..."
            rows={7}
            className="w-full bg-[#07070a] border border-neutral-800 focus:border-red-500/50 focus:ring-1 focus:ring-red-500/30 rounded-xl p-3.5 text-sm text-neutral-200 placeholder:text-neutral-600 outline-none resize-none"
            autoFocus
          />
        </div>

        {/* Footer */}
        <div className="p-4 px-5 bg-[#0a0a0d] border-t border-neutral-800/80 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-neutral-400 hover:text-white transition cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#BA3C3C] to-[#E04D4D] text-xs font-semibold text-white shadow-md hover:brightness-110 active:scale-98 transition cursor-pointer"
          >
            {saved ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>Saved!</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Save Notes</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
