import { useState, useEffect } from "react";
import { X, Copy, Check, ExternalLink, Play } from "lucide-react";

export default function SolutionModal({ problem, isOpen, onClose, onOpenVideo }) {
  const [selectedLang, setSelectedLang] = useState("cpp");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSelectedLang("cpp");
      setCopied(false);
    }
  }, [isOpen, problem]);

  if (!isOpen || !problem) return null;

  const languages = [
    { id: "cpp", label: "C++" },
    { id: "java", label: "Java" },
    { id: "python", label: "Python" },
    { id: "javascript", label: "JavaScript" },
  ];

  const currentCode =
    problem.solutions?.[selectedLang] ||
    "// Solution code is being updated for this language.";

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 dark:bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-white dark:bg-[#0f0f13] border border-slate-200 dark:border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 pb-4 border-b border-slate-200 dark:border-neutral-800/80 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-1">
              {problem.title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-neutral-400">
              {problem.hint || "Optimal algorithmic approach."}
              {problem.complexity && (
                <span className="text-slate-400 dark:text-neutral-500">
                  {" "}
                  · {problem.complexity.time} time, {problem.complexity.space} space
                </span>
              )}
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close solution modal"
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-500 hover:text-slate-900 dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-800 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Language Tabs & Copy Button */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-[#0a0a0d] border-b border-slate-200 dark:border-neutral-800/60 flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 bg-slate-200/70 dark:bg-neutral-900/90 p-1 rounded-xl border border-slate-300/80 dark:border-neutral-800/70">
            {languages.map((lang) => (
              <button
                key={lang.id}
                onClick={() => setSelectedLang(lang.id)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedLang === lang.id
                    ? "bg-[#E04D4D] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/80 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-800"
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-800 dark:text-neutral-300 dark:hover:text-white text-xs font-medium transition cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-500 font-semibold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Code Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/70 dark:bg-[#07070a] font-mono text-xs sm:text-[13px] leading-relaxed text-slate-800 dark:text-neutral-300">
          <pre className="whitespace-pre overflow-x-auto selection:bg-red-500/30">
            <code>{currentCode}</code>
          </pre>
        </div>

        {/* Footer Actions */}
        <div className="p-4 px-6 bg-slate-50 dark:bg-[#0a0a0d] border-t border-slate-200 dark:border-neutral-800/80 flex items-center justify-between gap-4">
          <a
            href={problem.leetcodeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E04D4D] hover:text-[#f06161] hover:underline transition"
          >
            <span>Open on LeetCode</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {problem.hasVideo && onOpenVideo && (
            <button
              onClick={() => {
                onClose();
                onOpenVideo(problem);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-800 text-xs font-medium dark:text-neutral-300 dark:hover:text-white transition cursor-pointer"
            >
              <Play className="w-3 h-3 text-red-500" />
              <span>Watch Walkthrough</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
