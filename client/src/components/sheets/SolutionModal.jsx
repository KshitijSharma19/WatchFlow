import { useState, useEffect, useCallback } from "react";
import { X, Copy, Check, ExternalLink, Play, Sparkles, RefreshCw, Cpu, Code2 } from "lucide-react";
import api from "../../api/axios";

// Helper to clean and normalize code strings so literal \n / \t are converted into proper newlines
const formatCode = (raw) => {
  if (!raw || typeof raw !== "string") return "";
  let code = raw;
  let prev;
  let iterations = 0;
  while (code.includes("\\n") && prev !== code && iterations < 5) {
    prev = code;
    code = code.replace(/\\r\\n/g, "\n").replace(/\\n/g, "\n");
    iterations++;
  }
  if (code.includes("\\t")) {
    code = code.replace(/\\t/g, "    ");
  }
  if (code.includes('\\"')) {
    code = code.replace(/\\"/g, '"');
  }
  // Strip Markdown code fencing if AI wrapped in ```cpp ... ```
  code = code.replace(/^```[a-zA-Z]*\n?/, "").replace(/\n?```$/, "");
  return code.trim();
};

// Helper to determine if code string is just an empty stub or placeholder
const isPlaceholderCode = (code) => {
  if (!code || typeof code !== "string") return true;
  const lower = code.toLowerCase();
  return (
    lower.includes("// solution code is being updated") ||
    lower.includes("// optimal approach for") ||
    lower.includes("void solve() {") ||
    lower.includes("// optimized algorithm implementation") ||
    lower.includes("pass\n") ||
    lower.trim().endsWith("pass") ||
    lower.includes("// striver a2z optimal approach")
  );
};

export default function SolutionModal({ problem, isOpen, onClose, onOpenVideo }) {
  const [selectedLang, setSelectedLang] = useState("cpp");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [aiData, setAiData] = useState(null);

  const languages = [
    { id: "cpp", label: "C++" },
    { id: "java", label: "Java" },
    { id: "python", label: "Python" },
    { id: "javascript", label: "JavaScript" },
  ];

  // Fetch or generate solution for current problem
  const fetchSolution = useCallback(async (force = false) => {
    if (!problem?.title) return;

    const cacheKey = problem.title.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-");

    // 1. Check client-side localStorage cache first (0ms)
    if (!force) {
      try {
        const localCacheRaw = localStorage.getItem("wf_dsa_solutions_cache");
        if (localCacheRaw) {
          const localCache = JSON.parse(localCacheRaw);
          if (localCache[cacheKey]) {
            const cachedItem = localCache[cacheKey];
            if (cachedItem.solutions) {
              for (const lang of Object.keys(cachedItem.solutions)) {
                cachedItem.solutions[lang] = formatCode(cachedItem.solutions[lang]);
              }
            }
            setAiData(cachedItem);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn("Failed to read local solution cache:", err);
      }
    }

    // 2. Fetch / Generate from backend AI engine
    setLoading(true);
    setError(null);

    try {
      const response = await api.post("/dsa/solution", {
        title: problem.title,
        category: problem.category || "Algorithms",
        difficulty: problem.difficulty || "Medium",
        hint: problem.hint || "",
        forceRegenerate: force,
      });

      if (response.data?.success && response.data?.data) {
        const solutionData = response.data.data;
        if (solutionData.solutions) {
          for (const lang of Object.keys(solutionData.solutions)) {
            solutionData.solutions[lang] = formatCode(solutionData.solutions[lang]);
          }
        }
        setAiData(solutionData);

        // Save to client localStorage
        try {
          const localCacheRaw = localStorage.getItem("wf_dsa_solutions_cache");
          const localCache = localCacheRaw ? JSON.parse(localCacheRaw) : {};
          localCache[cacheKey] = solutionData;
          localStorage.setItem("wf_dsa_solutions_cache", JSON.stringify(localCache));
        } catch (storageErr) {
          console.warn("Could not save solution to localStorage:", storageErr);
        }
      } else {
        throw new Error("Invalid response from solution service");
      }
    } catch (err) {
      console.error("Failed to load DSA solution:", err);
      setError("Unable to generate solution right now. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [problem]);

  // Trigger loading when modal opens
  useEffect(() => {
    if (isOpen && problem) {
      setSelectedLang("cpp");
      setCopied(false);
      setAiData(null);
      setError(null);

      // Check if problem already has pre-filled valid code for cpp
      const existingCpp = problem.solutions?.cpp;
      const needsAi =
        isPlaceholderCode(existingCpp) ||
        isPlaceholderCode(problem.solutions?.java) ||
        isPlaceholderCode(problem.solutions?.python);

      if (needsAi) {
        fetchSolution(false);
      }
    }
  }, [isOpen, problem, fetchSolution]);

  if (!isOpen || !problem) return null;

  // Resolve code to show: AI solution > Problem hardcoded solution > Fallback
  const rawCode =
    aiData?.solutions?.[selectedLang] ||
    (!isPlaceholderCode(problem.solutions?.[selectedLang]) ? problem.solutions?.[selectedLang] : null) ||
    (loading
      ? `// Generating optimal ${languages.find((l) => l.id === selectedLang)?.label} solution...\n// Analyzing time & space complexity...`
      : `// No solution code available for this language.`);

  const currentCode = formatCode(rawCode);
  const codeLines = currentCode.split("\n");

  const complexity = aiData?.complexity || problem.complexity || { time: "O(N)", space: "O(1)" };
  const approach = aiData?.approach || problem.hint || "Optimal algorithmic strategy.";

  const handleCopy = () => {
    if (!currentCode || loading) return;
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 dark:bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-white dark:bg-[#0f0f13] border border-slate-200 dark:border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 pb-3 sm:pb-4 border-b border-slate-200 dark:border-neutral-800/80 flex items-start justify-between gap-3 sm:gap-4">
          <div className="space-y-1.5 flex-1 pr-1 sm:pr-2 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight break-words">
                {problem.title}
              </h3>
              <span
                className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                  problem.difficulty === "Easy"
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                    : problem.difficulty === "Hard"
                    ? "bg-red-500/10 text-[#E04D4D] dark:text-red-400 border border-red-500/20"
                    : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                }`}
              >
                {problem.difficulty || "Medium"}
              </span>

              {aiData?.cached && (
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-200/70 dark:bg-neutral-800 text-slate-600 dark:text-neutral-400">
                  ⚡ Cached
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-neutral-400 flex-wrap">
              <div className="flex items-center gap-1 font-mono text-[11px] sm:text-xs">
                <Cpu className="w-3.5 h-3.5 text-[#E04D4D] shrink-0" />
                <span>Time: <strong className="text-slate-800 dark:text-neutral-200">{complexity.time}</strong></span>
                <span className="mx-1">·</span>
                <span>Space: <strong className="text-slate-800 dark:text-neutral-200">{complexity.space}</strong></span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close solution modal"
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-500 hover:text-slate-900 dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-800 transition cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Approach / Intuition Banner */}
        <div className="px-4 sm:px-6 py-2 sm:py-2.5 bg-slate-100/70 dark:bg-[#131318] border-b border-slate-200/80 dark:border-neutral-800/60 text-xs text-slate-700 dark:text-neutral-300 flex items-center justify-between gap-2 sm:gap-3">
          <div className="flex items-center gap-2 overflow-hidden min-w-0">
            <Sparkles className="w-3.5 h-3.5 text-[#E04D4D] shrink-0" />
            <span className="truncate">
              <strong className="text-slate-900 dark:text-white">Approach: </strong>
              {approach}
            </span>
          </div>

          <button
            type="button"
            onClick={() => fetchSolution(true)}
            disabled={loading}
            title="Regenerate optimal solution"
            className="shrink-0 flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white transition disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw className={`w-3 h-3 ${loading ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">Regenerate</span>
          </button>
        </div>

        {/* Language Tabs & Copy Button */}
        <div className="px-4 sm:px-6 py-2.5 sm:py-3 bg-slate-50 dark:bg-[#0a0a0d] border-b border-slate-200 dark:border-neutral-800/60 flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1 sm:gap-1.5 bg-slate-200/70 dark:bg-neutral-900/90 p-1 rounded-xl border border-slate-300/80 dark:border-neutral-800/70 overflow-x-auto max-w-full">
            {languages.map((lang) => (
              <button
                key={lang.id}
                onClick={() => setSelectedLang(lang.id)}
                className={`px-2.5 sm:px-3 py-1 rounded-lg text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedLang === lang.id
                    ? "bg-[#E04D4D] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/80 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-800"
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            <span className="text-[11px] font-mono text-slate-500 dark:text-neutral-500 hidden sm:inline">
              {codeLines.length} lines
            </span>

            <button
              onClick={handleCopy}
              disabled={loading}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-800 dark:text-neutral-300 dark:hover:text-white text-xs font-medium transition cursor-pointer disabled:opacity-50"
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
        </div>

        {/* Code Content with Line Numbers & High Contrast Editor Styling */}
        <div className="relative flex-1 min-h-[320px] max-h-[55vh] overflow-y-auto bg-slate-900 dark:bg-[#07070a] border-t border-b border-slate-800/80 dark:border-neutral-800/80 font-mono text-xs sm:text-[13px] leading-6 selection:bg-red-500/30">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-3">
              <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs font-sans text-slate-300 dark:text-neutral-400 font-medium">
                Generating optimal <strong className="text-white">{languages.find((l) => l.id === selectedLang)?.label}</strong> solution with AI...
              </p>
            </div>
          ) : error ? (
            <div className="p-8 text-center space-y-3">
              <p className="text-red-400 text-xs font-semibold">{error}</p>
              <button
                onClick={() => fetchSolution(true)}
                className="px-3.5 py-1.5 rounded-lg bg-red-500 text-white font-medium text-xs hover:bg-red-600 transition cursor-pointer"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="flex min-w-full overflow-x-auto py-3">
              {/* Line Numbers Gutter */}
              <div className="select-none text-right pr-3.5 pl-3.5 text-slate-600 dark:text-neutral-600 font-mono text-xs leading-6 border-r border-slate-800 dark:border-neutral-800/60 shrink-0">
                {codeLines.map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>

              {/* Code Pre */}
              <pre className="flex-1 pl-4 pr-6 text-slate-100 dark:text-neutral-200 overflow-x-auto whitespace-pre font-mono text-xs sm:text-[13px] leading-6">
                <code>{currentCode}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-3.5 sm:p-4 px-4 sm:px-6 bg-slate-50 dark:bg-[#0a0a0d] border-t border-slate-200 dark:border-neutral-800/80 flex items-center justify-between gap-3 sm:gap-4 flex-wrap">
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
