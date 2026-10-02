import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Play,
  Target,
  Sparkles,
  BookOpen,
} from "lucide-react";
import AppShell from "../components/layout/AppShell";
import { SHEETS_DATA } from "../data/sheetsData";
import AnimatedSheetPreview from "../components/sheets/AnimatedSheetPreview";

export default function SheetsPage() {
  const navigate = useNavigate();
  const [solvedMap, setSolvedMap] = useState({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem("watchflow_sheets_progress");
      if (saved) {
        setSolvedMap(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to read progress from storage", e);
    }
  }, []);

  const getSheetSolvedCount = (sheet) => {
    if (!sheet?.problems) return 0;
    return sheet.problems.filter((p) => solvedMap[p.id]).length;
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AppShell title="Practice Sheets">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12">
        {/* HERO WITH LIVE PRACTICE SHEET PREVIEW */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center pb-16 lg:pb-24 border-b border-slate-200 dark:border-neutral-900">
          {/* Left Column: Headline and Call to Actions */}
          <div className="lg:col-span-6 xl:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-[#E04D4D] text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Practice sheets</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
              One topic at a time, <br className="hidden sm:inline" />
              solved three ways.
            </h1>

            <p className="text-slate-600 dark:text-neutral-400 text-sm sm:text-base lg:text-lg max-w-xl leading-relaxed">
              Work through a topic end to end. Every problem links straight to LeetCode,
              opens its clean solution in C++, Java, Python and plays the video walkthrough.
            </p>

            <div className="flex items-center gap-3.5 pt-2 flex-wrap">
              <button
                type="button"
                onClick={() => scrollToSection("dsa-sheets")}
                className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-[#E04D4D] dark:text-red-400 border border-red-500/30 hover:border-red-500/50 font-semibold text-sm px-6 py-3.5 rounded-xl shadow-xs active:scale-[0.98] transition cursor-pointer"
              >
                <span>Open the sheet</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("how-a-row-works")}
                className="flex items-center gap-2 bg-white/80 dark:bg-neutral-900 hover:bg-slate-100 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800 text-slate-800 dark:text-neutral-200 font-semibold text-sm px-5 py-3.5 rounded-xl transition cursor-pointer"
              >
                <span>See what is inside</span>
              </button>
            </div>

            <p className="text-xs text-slate-400 dark:text-neutral-500 pt-1">
              Free. Track your progress, read the solutions and tick problems off.
            </p>
          </div>

          {/* Right Column: Animated Practice Sheet Box */}
          <div className="lg:col-span-6 xl:col-span-5 flex justify-center items-center">
            <AnimatedSheetPreview />
          </div>
        </section>

        {/* HOW A ROW WORKS */}
        <section id="how-a-row-works" className="py-16 lg:py-24 border-b border-slate-200 dark:border-neutral-900">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold text-[#E04D4D] uppercase tracking-wider mb-2 block">
              How a row works
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">
              Everything for one problem, on one line.
            </h2>
            <p className="text-slate-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed">
              No hunting across tabs for the question, a clean solution and an explanation. Each row carries all three.
            </p>
          </div>

          {/* Feature Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {/* Feature 1 */}
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 text-[#E04D4D] flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Solve it on LeetCode
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-neutral-400 leading-relaxed">
                Every row links straight to the problem, so you can write and submit your own code first.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 text-[#E04D4D] flex items-center justify-center">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Read it three ways
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-neutral-400 leading-relaxed">
                The solution in C++, Java and Python with the approach and its complexity in one line.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 text-[#E04D4D] flex items-center justify-center">
                <Play className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Video Walkthroughs
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-neutral-400 leading-relaxed">
                Curated video tutorials and step-by-step explanations right inside the sheet without leaving your workspace.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 text-[#E04D4D] flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Tick it off
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-neutral-400 leading-relaxed">
                Mark a problem done and the sheet keeps count, so you always know what is next.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: DSA SHEETS GRID */}
        <section id="dsa-sheets" className="pt-16 lg:pt-20">
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-slate-200 dark:border-neutral-800">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400">
              SHEETS
            </span>
            <span className="text-xs text-slate-400 dark:text-neutral-500">
              {SHEETS_DATA.length} Curated Tracks · {SHEETS_DATA.reduce((acc, s) => acc + s.problemCount, 0)} Problems
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SHEETS_DATA.map((sheet) => {
              const solvedCount = getSheetSolvedCount(sheet);
              const total = sheet.problemCount || sheet.problems.length;
              const percentage = total > 0 ? Math.round((solvedCount / total) * 100) : 0;

              return (
                <div
                  key={sheet.id}
                  onClick={() => navigate(`/sheets/${sheet.id}`)}
                  className="group relative bg-white/90 dark:bg-[#0c0c11]/85 border border-slate-200 dark:border-neutral-800/90 rounded-2xl p-7 sm:p-8 backdrop-blur-xl transition-all duration-300 hover:border-red-500/40 hover:shadow-[0_4px_30px_rgba(224,77,77,0.15)] hover:-translate-y-0.5 cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-[#E04D4D] transition-colors">
                          {sheet.title}
                        </h3>
                        {sheet.badge && (
                          <span className="inline-block mt-1 text-xs font-medium text-slate-500 dark:text-neutral-400">
                            {sheet.badge}
                          </span>
                        )}
                      </div>

                      <span className="shrink-0 px-3 py-1 rounded-full bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs font-semibold text-slate-700 dark:text-neutral-300">
                        {sheet.problemCount} problems
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-500 dark:text-neutral-400 leading-relaxed mb-6 line-clamp-3">
                      {sheet.description}
                    </p>
                  </div>

                  <div>
                    {/* Progress Bar */}
                    <div className="w-full bg-slate-100 dark:bg-neutral-900 h-1.5 rounded-full overflow-hidden mb-4">
                      <div
                        className="h-full bg-gradient-to-r from-[#BA3C3C] to-[#E04D4D] transition-all duration-500 rounded-full"
                        style={{ width: `${Math.max(percentage, 2)}%` }}
                      />
                    </div>

                    {/* Footer: Clean stats without any 'animated walkthrough' */}
                    <div className="flex items-center justify-between text-xs text-slate-400 dark:text-neutral-500 pt-3 border-t border-slate-100 dark:border-neutral-900">
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1 text-slate-600 dark:text-neutral-400 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          {solvedCount} of {total} solved
                        </span>
                      </div>

                      <div className="flex items-center gap-1 font-semibold text-slate-700 dark:text-neutral-300 group-hover:text-[#E04D4D] group-hover:translate-x-1 transition-all">
                        <span>Open sheet</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
