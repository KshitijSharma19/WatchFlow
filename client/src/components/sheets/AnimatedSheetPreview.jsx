import { useState, useEffect } from "react";
import { Check, Code2, Play, Sparkles } from "lucide-react";

export default function AnimatedSheetPreview() {
  const [activeLang, setActiveLang] = useState("python");
  const [activeProblem, setActiveProblem] = useState(2); // Merge Sorted Array
  const [checkedItems, setCheckedItems] = useState({ 0: true, 1: true });

  const problems = [
    {
      id: 0,
      title: "Remove Duplicates from Sorted Array",
    },
    {
      id: 1,
      title: "Search Insert Position",
    },
    {
      id: 2,
      title: "Merge Sorted Array",
      complexity: "O(m + n) time, O(1) space.",
      solutions: {
        cpp: `void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {
    int p1 = m - 1, p2 = n - 1, p = m + n - 1;
    while (p2 >= 0) nums1[p--] = (p1 >= 0 && nums1[p1] > nums2[p2]) ? nums1[p1--] : nums2[p2--];
}`,
        java: `public void merge(int[] nums1, int m, int[] nums2, int n) {
    int p1 = m - 1, p2 = n - 1, p = m + n - 1;
    while (p2 >= 0) nums1[p--] = (p1 >= 0 && nums1[p1] > nums2[p2]) ? nums1[p1--] : nums2[p2--];
}`,
        python: `def merge(nums1: list[int], m: int, nums2: list[int], n: int) -> None:
    p1, p2, p = m - 1, n - 1, m + n - 1
    while p2 >= 0:
        if p1 >= 0 and nums1[p1] > nums2[p2]:
            nums1[p] = nums1[p1]; p1 -= 1
        else:
            nums1[p] = nums2[p2]; p2 -= 1
        p -= 1`,
      },
    },
    {
      id: 3,
      title: "Plus One",
    },
    {
      id: 4,
      title: "Best Time to Buy and Sell Stock",
    },
  ];

  // Auto-cycle language tabs subtly every 3 seconds for continuous micro-animation
  useEffect(() => {
    const langs = ["python", "cpp", "java"];
    const timer = setInterval(() => {
      setActiveLang((prev) => {
        const nextIdx = (langs.indexOf(prev) + 1) % langs.length;
        return langs[nextIdx];
      });
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const toggleCheck = (id, e) => {
    e.stopPropagation();
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;

  return (
    <div className="relative w-full max-w-[420px] mx-auto animate-subtle-float hover:[animation-play-state:paused]">
      {/* Dynamic ambient pulsing glow */}
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-red-500/15 via-orange-400/10 to-red-500/15 dark:from-red-600/25 dark:via-red-500/15 dark:to-orange-600/20 opacity-70 blur-lg pointer-events-none animate-pulse" />

      {/* Main Preview Card */}
      <div className="relative bg-white/95 dark:bg-[#0d0d12]/95 border border-slate-200/90 dark:border-neutral-800/90 rounded-2xl p-4 sm:p-5 shadow-xl dark:shadow-2xl backdrop-blur-md transition-all duration-300">
        {/* Top Header */}
        <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-neutral-400 mb-1 select-none">
          <span className="font-medium tracking-wide">Practice sheet</span>
          <span className="font-mono text-slate-500 dark:text-neutral-400">
            {completedCount} of 29 done
          </span>
        </div>

        {/* Title & Accent Underline */}
        <div className="mb-3.5 select-none">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            Array
          </h3>
          <div className="w-10 h-0.5 bg-[#E04D4D] rounded-full mt-1" />
        </div>

        {/* Problem List */}
        <div className="space-y-2 font-sans">
          {problems.map((problem) => {
            const isChecked = !!checkedItems[problem.id];
            const isExpanded = activeProblem === problem.id;

            return (
              <div
                key={problem.id}
                onClick={() => setActiveProblem(problem.id)}
                className={`rounded-xl transition-all duration-200 cursor-pointer ${
                  isExpanded
                    ? "bg-slate-100/90 dark:bg-[#15151c]/90 border border-slate-200 dark:border-neutral-700/80 p-3 shadow-xs dark:shadow-md"
                    : "hover:bg-slate-100/60 dark:hover:bg-white/5 p-1.5 rounded-lg"
                }`}
              >
                {/* Row Header */}
                <div className="flex items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2.5 min-w-0">
                    {/* Checkbox button */}
                    <button
                      type="button"
                      onClick={(e) => toggleCheck(problem.id, e)}
                      aria-label="Toggle completed"
                      className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border transition-all shrink-0 cursor-pointer ${
                        isChecked
                          ? "bg-[#E04D4D] border-[#E04D4D] text-white"
                          : "border-slate-300 hover:border-slate-400 dark:border-neutral-600 dark:hover:border-neutral-400 bg-transparent"
                      }`}
                    >
                      {isChecked && <Check className="w-2 h-2 stroke-[3]" />}
                    </button>

                    <span
                      className={`text-xs truncate select-none ${
                        isChecked && !isExpanded
                          ? "text-slate-400 dark:text-neutral-500 line-through decoration-slate-300 dark:decoration-neutral-600"
                          : "text-slate-800 dark:text-neutral-200 font-medium"
                      }`}
                    >
                      {problem.title}
                    </span>
                  </div>

                  {/* Micro action indicators */}
                  <div className="flex items-center gap-1.5 text-slate-400 dark:text-neutral-500 shrink-0">
                    <Code2 className="w-3 h-3" />
                    <Play className="w-3 h-3" />
                  </div>
                </div>

                {/* Expanded Code & Solution Box Preview */}
                {isExpanded && (
                  <div className="mt-2.5 pt-2 border-t border-slate-200 dark:border-neutral-800/80 animate-in fade-in duration-200">
                    {/* Language Selector Tabs */}
                    <div className="flex items-center gap-3 text-[10px] font-semibold mb-2">
                      {["python", "cpp", "java"].map((lang) => (
                        <button
                          key={lang}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveLang(lang);
                          }}
                          className={`relative pb-0.5 uppercase tracking-wider text-[10px] transition-colors cursor-pointer ${
                            activeLang === lang
                              ? "text-slate-900 dark:text-white font-bold"
                              : "text-slate-400 hover:text-slate-700 dark:text-neutral-500 dark:hover:text-neutral-300"
                          }`}
                        >
                          {lang === "cpp" ? "C++" : lang === "java" ? "Java" : "Python"}
                          {activeLang === lang && (
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E04D4D] rounded-full animate-in fade-in" />
                          )}
                        </button>
                      ))}
                    </div>

                    {/* Code Container */}
                    <div className="bg-slate-50 dark:bg-[#08080c] border border-slate-200 dark:border-neutral-900 rounded-lg p-2.5 font-mono text-[10px] text-slate-800 dark:text-neutral-300 leading-relaxed overflow-x-auto shadow-xs dark:shadow-inner max-h-28">
                      <pre className="whitespace-pre">
                        <code>{problem.solutions?.[activeLang] || problems[2].solutions[activeLang]}</code>
                      </pre>
                      <div className="mt-1.5 text-[#E04D4D] text-[10px] font-sans font-semibold">
                        {problem.complexity || problems[2].complexity}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
