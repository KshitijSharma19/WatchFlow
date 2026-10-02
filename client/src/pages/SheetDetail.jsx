import { useState, useEffect, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Search,
  Check,
  Code,
  Play,
  ExternalLink,
  Star,
  FileText,
  Plus,
  ArrowLeft,
  Filter,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import AppShell from "../components/layout/AppShell";
import { SHEETS_DATA } from "../data/sheetsData";
import SolutionModal from "../components/sheets/SolutionModal";
import VideoModal from "../components/sheets/VideoModal";
import NoteModal from "../components/sheets/NoteModal";

export default function SheetDetailPage() {
  const { sheetId } = useParams();
  const navigate = useNavigate();

  const sheet = useMemo(() => {
    return (
      SHEETS_DATA.find(
        (s) => s.id === sheetId || (sheetId === "leetcode-75" && s.id === "blind-75")
      ) || SHEETS_DATA[0]
    );
  }, [sheetId]);

  // Local storage state for solved, starred, custom video links, and notes
  const [solvedMap, setSolvedMap] = useState({});
  const [starredMap, setStarredMap] = useState({});
  const [notesMap, setNotesMap] = useState({});
  const [customVideoMap, setCustomVideoMap] = useState({});

  // Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("All Topics");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [filterSolved, setFilterSolved] = useState("all"); // "all", "solved", "unsolved", "starred"

  // Modals state
  const [activeSolutionProblem, setActiveSolutionProblem] = useState(null);
  const [activeVideoProblem, setActiveVideoProblem] = useState(null);
  const [activeNoteProblem, setActiveNoteProblem] = useState(null);

  // Load from localStorage
  useEffect(() => {
    try {
      const savedSolved = localStorage.getItem("watchflow_sheets_progress");
      if (savedSolved) setSolvedMap(JSON.parse(savedSolved));

      const savedStarred = localStorage.getItem("watchflow_sheets_starred");
      if (savedStarred) setStarredMap(JSON.parse(savedStarred));

      const savedNotes = localStorage.getItem("watchflow_sheets_notes");
      if (savedNotes) setNotesMap(JSON.parse(savedNotes));

      const savedVideos = localStorage.getItem("watchflow_sheets_custom_videos");
      if (savedVideos) setCustomVideoMap(JSON.parse(savedVideos));
    } catch (e) {
      console.error("Storage load error:", e);
    }
  }, []);

  // Save to localStorage
  const toggleSolved = (problemId) => {
    setSolvedMap((prev) => {
      const updated = { ...prev, [problemId]: !prev[problemId] };
      localStorage.setItem("watchflow_sheets_progress", JSON.stringify(updated));
      return updated;
    });
  };

  const toggleStarred = (problemId, e) => {
    e.stopPropagation();
    setStarredMap((prev) => {
      const updated = { ...prev, [problemId]: !prev[problemId] };
      localStorage.setItem("watchflow_sheets_starred", JSON.stringify(updated));
      return updated;
    });
  };

  const handleSaveNote = (problemId, noteText) => {
    setNotesMap((prev) => {
      const updated = { ...prev, [problemId]: noteText };
      localStorage.setItem("watchflow_sheets_notes", JSON.stringify(updated));
      return updated;
    });
  };

  const handleAddCustomVideo = (problemId) => {
    const existing = customVideoMap[problemId] || "";
    const url = prompt(
      "Paste custom YouTube URL or Video ID for this problem:",
      existing,
    );
    if (url !== null) {
      setCustomVideoMap((prev) => {
        const updated = { ...prev, [problemId]: url.trim() };
        localStorage.setItem(
          "watchflow_sheets_custom_videos",
          JSON.stringify(updated),
        );
        return updated;
      });
    }
  };

  // Filter problems
  const filteredProblems = useMemo(() => {
    if (!sheet?.problems) return [];

    return sheet.problems.filter((problem) => {
      const matchesSearch =
        problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        problem.number.includes(searchQuery) ||
        problem.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTopic =
        selectedTopic === "All Topics" || problem.category === selectedTopic;

      const matchesDifficulty =
        selectedDifficulty === "All" ||
        problem.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();

      let matchesStatus = true;
      if (filterSolved === "solved") {
        matchesStatus = !!solvedMap[problem.id];
      } else if (filterSolved === "unsolved") {
        matchesStatus = !solvedMap[problem.id];
      } else if (filterSolved === "starred") {
        matchesStatus = !!starredMap[problem.id];
      }

      return matchesSearch && matchesTopic && matchesDifficulty && matchesStatus;
    });
  }, [
    sheet,
    searchQuery,
    selectedTopic,
    selectedDifficulty,
    filterSolved,
    solvedMap,
    starredMap,
  ]);

  const totalProblems = sheet.problems?.length || 0;
  const solvedCount = sheet.problems
    ? sheet.problems.filter((p) => solvedMap[p.id]).length
    : 0;
  const percentage =
    totalProblems > 0 ? Math.round((solvedCount / totalProblems) * 100) : 0;

  const topicsList = useMemo(() => {
    return sheet.topics || ["All Topics"];
  }, [sheet]);

  return (
    <AppShell title={sheet.title}>
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 py-6 sm:py-10">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-neutral-400 mb-4">
          <Link
            to="/sheets"
            className="hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Practice sheets
          </Link>
          <span>/</span>
          <span className="text-slate-800 dark:text-neutral-200 font-medium">
            {sheet.title}
          </span>
        </div>

        {/* Header with Title and Stats Summary */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
              {sheet.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-neutral-400 max-w-xl leading-relaxed">
              {sheet.description}
            </p>
          </div>

          {/* Stats Badges */}
          <div className="flex items-center gap-6 sm:gap-8 shrink-0 bg-white/60 dark:bg-neutral-900/60 p-3 px-5 rounded-2xl border border-slate-200 dark:border-neutral-800">
            <div className="text-center">
              <span className="block text-[11px] text-slate-400 dark:text-neutral-500 uppercase tracking-wider">
                Problems
              </span>
              <span className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                {totalProblems}
              </span>
            </div>

            <div className="text-center">
              <span className="block text-[11px] text-slate-400 dark:text-neutral-500 uppercase tracking-wider">
                Remaining
              </span>
              <span className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                {Math.max(totalProblems - solvedCount, 0)}
              </span>
            </div>

            <div className="text-center">
              <span className="block text-[11px] text-slate-400 dark:text-neutral-500 uppercase tracking-wider">
                Done
              </span>
              <span className="text-xl sm:text-2xl font-bold text-[#E04D4D]">
                {solvedCount}/{totalProblems}
              </span>
            </div>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="w-full bg-slate-200 dark:bg-neutral-900 h-1.5 rounded-full overflow-hidden mb-8">
          <div
            className="h-full bg-gradient-to-r from-[#BA3C3C] to-[#E04D4D] transition-all duration-500 rounded-full"
            style={{ width: `${Math.max(percentage, 1)}%` }}
          />
        </div>

        {/* Topic Filter Pills (if multiple topics available) */}
        {topicsList.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-5 scrollbar-none">
            {topicsList.map((topic) => (
              <button
                key={topic}
                onClick={() => setSelectedTopic(topic)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition cursor-pointer ${
                  selectedTopic === topic
                    ? "bg-[#E04D4D] text-white shadow-sm"
                    : "bg-white/80 dark:bg-neutral-900/60 border border-slate-200 dark:border-neutral-800 text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-neutral-800"
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
        )}

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-neutral-500" />
            <input
              type="text"
              placeholder="Search problems..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-[#0c0c11] border border-slate-200 dark:border-neutral-800 focus:border-red-500/50 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder-neutral-600 outline-none transition"
            />
          </div>

          {/* Difficulty & Status Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="bg-white dark:bg-[#0c0c11] border border-slate-200 dark:border-neutral-800 text-slate-700 dark:text-neutral-300 text-xs rounded-xl px-3 py-2.5 outline-none cursor-pointer"
            >
              <option value="All">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>

            <select
              value={filterSolved}
              onChange={(e) => setFilterSolved(e.target.value)}
              className="bg-white dark:bg-[#0c0c11] border border-slate-200 dark:border-neutral-800 text-slate-700 dark:text-neutral-300 text-xs rounded-xl px-3 py-2.5 outline-none cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="solved">Solved</option>
              <option value="unsolved">Unsolved</option>
              <option value="starred">⭐ Revision List</option>
            </select>
          </div>
        </div>

        {/* Problems Table */}
        <div className="w-full bg-white/95 dark:bg-[#0c0c11]/90 border border-slate-200 dark:border-neutral-800/80 rounded-2xl overflow-hidden shadow-sm dark:shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-neutral-800/80 bg-slate-50/70 dark:bg-neutral-950/60 text-[11px] uppercase tracking-wider text-slate-400 dark:text-neutral-500 font-semibold select-none">
                  <th className="py-3 px-4 w-12 text-center">Status</th>
                  <th className="py-3 px-3 w-12 text-center">#</th>
                  <th className="py-3 px-4">Problem</th>
                  <th className="py-3 px-4 text-center w-28">Solution</th>
                  <th className="py-3 px-4 text-center w-40">Video</th>
                  <th className="py-3 px-4 text-center w-28">LeetCode</th>
                  <th className="py-3 px-4 text-center w-24">Notes</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 dark:divide-neutral-800/60 text-xs sm:text-sm">
                {filteredProblems.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-slate-400 dark:text-neutral-500">
                      No problems match your current search and filters.
                    </td>
                  </tr>
                ) : (
                  filteredProblems.map((problem, index) => {
                    const isSolved = !!solvedMap[problem.id];
                    const isStarred = !!starredMap[problem.id];
                    const hasNote = !!notesMap[problem.id];
                    const hasCustomVideo = !!customVideoMap[problem.id];
                    const hasPlayableVideo = hasCustomVideo || (problem.hasVideo && !!problem.youtubeId);

                    return (
                      <tr
                        key={problem.id}
                        className={`transition-colors duration-150 ${
                          isSolved
                            ? "bg-slate-50/40 dark:bg-neutral-900/20"
                            : "hover:bg-slate-50/80 dark:hover:bg-neutral-900/40"
                        }`}
                      >
                        {/* Checkbox */}
                        <td className="py-3.5 px-4 text-center">
                          <button
                            type="button"
                            onClick={() => toggleSolved(problem.id)}
                            className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all cursor-pointer mx-auto ${
                              isSolved
                                ? "bg-[#E04D4D] border-[#E04D4D] text-white shadow-xs"
                                : "border-slate-300 dark:border-neutral-700 hover:border-red-400 dark:hover:border-neutral-500 bg-transparent"
                            }`}
                          >
                            {isSolved && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </button>
                        </td>

                        {/* Number */}
                        <td className="py-3.5 px-3 text-center text-xs font-mono text-slate-400 dark:text-neutral-500">
                          {problem.number || String(index + 1).padStart(2, "0")}
                        </td>

                        {/* Problem Title & Badges */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2.5 flex-wrap">
                            <span
                              className={`font-medium transition-colors ${
                                isSolved
                                  ? "text-slate-400 dark:text-neutral-400 line-through decoration-slate-400/50"
                                  : "text-slate-900 dark:text-white hover:text-[#E04D4D]"
                              }`}
                            >
                              {problem.title}
                            </span>

                            {/* Difficulty Badge */}
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded-md font-semibold uppercase tracking-wider ${
                                problem.difficulty === "Easy"
                                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                                  : problem.difficulty === "Medium"
                                  ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                                  : "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20"
                              }`}
                            >
                              {problem.difficulty}
                            </span>

                            {/* Star Revision Bookmark */}
                            <button
                              type="button"
                              onClick={(e) => toggleStarred(problem.id, e)}
                              className="p-1 rounded text-slate-400 hover:text-amber-400 dark:text-neutral-600 dark:hover:text-amber-400 transition cursor-pointer"
                              title={isStarred ? "Remove from revision" : "Bookmark for revision"}
                            >
                              <Star
                                className={`w-3.5 h-3.5 ${
                                  isStarred
                                    ? "fill-amber-400 text-amber-400"
                                    : "stroke-[1.5]"
                                }`}
                              />
                            </button>
                          </div>
                        </td>

                        {/* Solution Column */}
                        <td className="py-3.5 px-4 text-center">
                          <button
                            type="button"
                            onClick={() => setActiveSolutionProblem(problem)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800 text-slate-700 dark:text-neutral-300 text-xs font-mono transition cursor-pointer"
                          >
                            <span>&#123; &#125;</span>
                            <span>code</span>
                          </button>
                        </td>

                        {/* Video Column */}
                        <td className="py-3.5 px-4 text-center">
                          <div className="inline-flex items-center gap-1.5">
                            {hasPlayableVideo ? (
                              <button
                                type="button"
                                onClick={() => {
                                  const activeProb = hasCustomVideo
                                    ? { ...problem, youtubeId: customVideoMap[problem.id] }
                                    : problem;
                                  setActiveVideoProblem(activeProb);
                                }}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800 text-slate-700 dark:text-neutral-300 text-xs font-medium transition cursor-pointer"
                              >
                                <Play className="w-3 h-3 text-[#E04D4D] fill-[#E04D4D]" />
                                <span>Watch</span>
                              </button>
                            ) : (
                              <span className="text-xs text-slate-400 dark:text-neutral-600 px-2 select-none">
                                —
                              </span>
                            )}

                            <button
                              type="button"
                              onClick={() => handleAddCustomVideo(problem.id)}
                              className={`p-1.5 rounded-lg border text-xs transition cursor-pointer ${
                                hasCustomVideo
                                  ? "bg-red-500/10 border-red-500/30 text-[#E04D4D]"
                                  : "bg-slate-100 dark:bg-neutral-900 border-slate-200 dark:border-neutral-800 text-slate-500 dark:text-neutral-500 hover:text-slate-900 dark:hover:text-white"
                              }`}
                              title={hasCustomVideo ? "Edit custom video" : "Add custom video"}
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </td>

                        {/* LeetCode Column */}
                        <td className="py-3.5 px-4 text-center">
                          <a
                            href={problem.leetcodeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800 text-slate-700 dark:text-neutral-300 text-xs font-medium hover:text-[#E04D4D] transition"
                          >
                            <span>Solve</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </td>

                        {/* Notes Column (Strivers feature) */}
                        <td className="py-3.5 px-4 text-center">
                          <button
                            type="button"
                            onClick={() => setActiveNoteProblem(problem)}
                            className={`p-1.5 rounded-lg border text-xs transition cursor-pointer inline-flex items-center justify-center ${
                              hasNote
                                ? "bg-amber-500/10 border-amber-500/30 text-amber-500"
                                : "bg-slate-100 dark:bg-neutral-900 border-slate-200 dark:border-neutral-800 text-slate-400 dark:text-neutral-500 hover:text-slate-700 dark:hover:text-white"
                            }`}
                            title={hasNote ? "View/edit notes" : "Add personal note"}
                          >
                            <FileText className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Solution Modal */}
      <SolutionModal
        problem={activeSolutionProblem}
        isOpen={!!activeSolutionProblem}
        onClose={() => setActiveSolutionProblem(null)}
        onOpenVideo={(prob) => setActiveVideoProblem(prob)}
      />

      {/* Video Modal */}
      <VideoModal
        problem={activeVideoProblem}
        isOpen={!!activeVideoProblem}
        onClose={() => setActiveVideoProblem(null)}
      />

      {/* Note Modal */}
      <NoteModal
        problem={activeNoteProblem}
        isOpen={!!activeNoteProblem}
        onClose={() => setActiveNoteProblem(null)}
        onSaveNote={handleSaveNote}
        initialNote={activeNoteProblem ? notesMap[activeNoteProblem.id] || "" : ""}
      />
    </AppShell>
  );
}
