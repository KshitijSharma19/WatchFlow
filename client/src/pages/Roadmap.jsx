import { useState, useEffect, useMemo, useCallback } from "react";
import {
  Compass,
  Sparkles,
  Calendar,
  Clock,
  Target,
  ArrowRight,
  CheckCircle2,
  Play,
  RotateCcw,
  BookOpen,
  Code2,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Layers,
  Search,
  Check,
  Zap,
  ListMusic,
  User,
} from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import AppShell from "../components/layout/AppShell";
import api from "../api/axios";
import { SHEETS_DATA } from "../data/sheetsData";
import {
  PRESET_VIDEO_COURSES,
  generateDsaRoadmap,
  generateVideoRoadmap,
  generateAiRoadmap,
} from "../utils/roadmapGenerator";
import RoadmapPlayerModal from "../components/roadmap/RoadmapPlayerModal";

export default function RoadmapPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Route-synced view state: solves Chrome browser back button issue!
  const viewingRoadmap = searchParams.get("view") === "active";

  // Active top-level mode: "build" | "video"
  const [mainMode, setMainMode] = useState("build");

  // Subcategory for "build your own": "dsa" | "ai"
  const [buildCategory, setBuildCategory] = useState("dsa");

  // Common Question Options
  const [currentLevel, setCurrentLevel] = useState("Know the basics");
  const [goal, setGoal] = useState("Interview soon");
  const [timePerDay, setTimePerDay] = useState("1 hour");
  const [durationPreset, setDurationPreset] = useState("1 month");
  const [customDays, setCustomDays] = useState("");

  // DSA specific state
  const [selectedSheetId, setSelectedSheetId] = useState("leetcode-top-150");

  // AI "Learn Anything" specific state
  const [aiTopic, setAiTopic] = useState("Docker & Kubernetes");
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  // Video Roadmap state
  const [videoPace, setVideoPace] = useState("1 hour a day");
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [loadingPlaylists, setLoadingPlaylists] = useState(false);
  const [videoSourceTab, setVideoSourceTab] = useState("library"); // "library" | "presets"
  const [isBuildingVideoRoadmap, setIsBuildingVideoRoadmap] = useState(false);

  // In-app video player modal for preset courses
  const [modalVideo, setModalVideo] = useState(null);

  // Active generated roadmap stored in state and localStorage
  const [activeRoadmap, setActiveRoadmap] = useState(null);
  const [expandedDays, setExpandedDays] = useState({ 1: true });

  // Popular tech suggestions for "Learn anything"
  const popularTopics = [
    "Docker & Kubernetes",
    "System Design",
    "Spring Boot",
    "Next.js 15 Fullstack",
    "DevOps & CI/CD",
    "Rust for Beginners",
    "Golang Microservices",
    "Generative AI & LLMs",
  ];

  // Load saved roadmap from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("watchflow_active_roadmap");
      if (saved) {
        const parsed = JSON.parse(saved);
        setActiveRoadmap(parsed);
      }
    } catch (e) {
      console.error("Failed to load saved roadmap", e);
    }
  }, []);

  // Fetch user playlists from library for video roadmap
  useEffect(() => {
    const fetchLibraryPlaylists = async () => {
      try {
        setLoadingPlaylists(true);
        const res = await api.get("/playlists");
        if (res.data?.playlists) {
          setUserPlaylists(res.data.playlists);
        }
      } catch (err) {
        console.error("Failed to fetch user playlists for video roadmap", err);
      } finally {
        setLoadingPlaylists(false);
      }
    };

    fetchLibraryPlaylists();
  }, []);

  // Persist roadmap changes to localStorage
  const saveRoadmapState = (updated) => {
    setActiveRoadmap(updated);
    try {
      localStorage.setItem("watchflow_active_roadmap", JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to persist roadmap", e);
    }
  };

  // Convert duration preset to total days count
  const effectiveDays = useMemo(() => {
    if (customDays && parseInt(customDays, 10) > 0) {
      return parseInt(customDays, 10);
    }
    switch (durationPreset) {
      case "2 weeks":
        return 14;
      case "3 weeks":
        return 21;
      case "1 month":
        return 30;
      case "6 weeks":
        return 42;
      default:
        return 30;
    }
  }, [durationPreset, customDays]);

  // Handler: Build DSA Roadmap
  const handleBuildDsaRoadmap = () => {
    const roadmap = generateDsaRoadmap({
      sheetId: selectedSheetId,
      currentLevel,
      goal,
      timePerDay,
      durationDays: effectiveDays,
    });

    saveRoadmapState(roadmap);
    setSearchParams({ view: "active" });
    setExpandedDays({ 1: true });
  };

  // Handler: Build AI "Learn Anything" Roadmap
  const handleBuildAiRoadmap = async () => {
    if (!aiTopic.trim()) return;

    try {
      setIsGeneratingAi(true);
      const roadmap = await generateAiRoadmap({
        topic: aiTopic.trim(),
        currentLevel,
        goal,
        timePerDay,
        durationDays: effectiveDays,
      });

      saveRoadmapState(roadmap);
      setSearchParams({ view: "active" });
      setExpandedDays({ 1: true });
    } catch (e) {
      console.error("AI Roadmap generation failed", e);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  // Handler: Build Video Roadmap (with full API fetch if videos array missing)
  const handleBuildVideoRoadmap = async (playlist) => {
    try {
      setIsBuildingVideoRoadmap(true);
      let targetPlaylist = playlist;

      // If it's a library playlist and videos array is missing or empty, fetch playlist details from API
      if (playlist._id && (!playlist.videos || playlist.videos.length === 0)) {
        try {
          const res = await api.get(`/playlists/${playlist._id}`);
          if (res.data?.videos && res.data.videos.length > 0) {
            targetPlaylist = {
              ...playlist,
              videos: res.data.videos,
            };
          }
        } catch (err) {
          console.error("Failed to fetch full playlist videos", err);
        }
      }

      const roadmap = generateVideoRoadmap({
        playlist: targetPlaylist,
        timePerDay: videoPace,
      });

      saveRoadmapState(roadmap);
      setSearchParams({ view: "active" });
      setExpandedDays({ 1: true });
    } finally {
      setIsBuildingVideoRoadmap(false);
    }
  };

  // Handle Play/Watch video: opens in WatchFlow player or in-app modal
  const handleWatchVideo = (vid) => {
    // If it's a saved library playlist, navigate to the WatchFlow player route
    if (vid.isLibrary && vid.playlistId && vid.videoId) {
      navigate(`/playlist/${vid.playlistId}/video/${vid.videoId}`);
    } else {
      // For preset courses, open in the in-app player modal right inside WatchFlow
      setModalVideo(vid);
    }
  };

  // Toggle Day completion
  const toggleDayCompletion = (dayNum, e) => {
    e?.stopPropagation();
    if (!activeRoadmap) return;

    const completed = { ...(activeRoadmap.completedDays || {}) };
    completed[dayNum] = !completed[dayNum];

    saveRoadmapState({
      ...activeRoadmap,
      completedDays: completed,
    });
  };

  // Toggle item / problem / task completion
  const toggleItemCompletion = (itemId, e) => {
    e?.stopPropagation();
    if (!activeRoadmap) return;

    const completedItems = { ...(activeRoadmap.completedItems || {}) };
    completedItems[itemId] = !completedItems[itemId];

    saveRoadmapState({
      ...activeRoadmap,
      completedItems,
    });
  };

  // Toggle accordion expand
  const toggleExpandDay = (dayNum) => {
    setExpandedDays((prev) => ({
      ...prev,
      [dayNum]: !prev[dayNum],
    }));
  };

  // Calculate overall progress percentage
  const progressPercent = useMemo(() => {
    if (!activeRoadmap?.days || activeRoadmap.days.length === 0) return 0;
    const completedCount = Object.values(activeRoadmap.completedDays || {}).filter(
      Boolean
    ).length;
    return Math.round((completedCount / activeRoadmap.days.length) * 100);
  }, [activeRoadmap]);

  return (
    <AppShell title="Roadmap">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* ============================================================== */}
        {/* VIEW 1: ACTIVE ROADMAP INTERACTIVE TIMELINE VIEW */}
        {/* ============================================================== */}
        {viewingRoadmap && activeRoadmap ? (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Top Navigation & Action Controls */}
            <div className="flex items-center justify-between flex-wrap gap-4 pb-4 border-b border-slate-200 dark:border-neutral-900">
              <button
                type="button"
                onClick={() => setSearchParams({}, { replace: true })}
                className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-neutral-400 hover:text-red-600 dark:hover:text-red-400 transition cursor-pointer"
              >
                ← Back to Roadmap Builder
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm("Are you sure you want to reset all checked progress?")) {
                      saveRoadmapState({
                        ...activeRoadmap,
                        completedDays: {},
                        completedItems: {},
                      });
                    }
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-neutral-800 text-xs font-medium text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white transition cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Progress</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSearchParams({}, { replace: true })}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#BA3C3C] to-[#E04D4D] text-white text-xs font-semibold hover:brightness-110 shadow-xs transition cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>New Roadmap</span>
                </button>
              </div>
            </div>

            {/* Active Roadmap Hero Header Card */}
            <div className="relative bg-white dark:bg-neutral-950/90 border border-slate-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-[#E04D4D] text-xs font-semibold tracking-wide mb-2.5">
                    <Compass className="w-3.5 h-3.5" />
                    <span>
                      {activeRoadmap.type === "dsa"
                        ? "DSA Sheet Roadmap"
                        : activeRoadmap.type === "video"
                        ? "Video Series Roadmap"
                        : "AI Custom Roadmap"}
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {activeRoadmap.title}
                  </h1>

                  <p className="text-xs sm:text-sm text-slate-500 dark:text-neutral-400 mt-1 max-w-2xl leading-relaxed">
                    {activeRoadmap.subtitle}
                  </p>
                </div>

                <div className="flex sm:flex-col items-end justify-between sm:justify-center gap-1 shrink-0">
                  <span className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                    {progressPercent}%
                  </span>
                  <span className="text-xs text-slate-500 dark:text-neutral-400">
                    {Object.values(activeRoadmap.completedDays || {}).filter(Boolean).length} of{" "}
                    {activeRoadmap.days.length} days done
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="h-2 w-full bg-slate-100 dark:bg-neutral-900 rounded-full overflow-hidden border border-slate-200/60 dark:border-neutral-800">
                <div
                  className="h-full bg-gradient-to-r from-[#BA3C3C] to-[#E04D4D] transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Meta Chips */}
              <div className="flex items-center gap-4 sm:gap-6 mt-5 text-xs text-slate-600 dark:text-neutral-400 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#E04D4D]" />
                  <span>{activeRoadmap.totalDays} Days Curriculum</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#E04D4D]" />
                  <span>{activeRoadmap.timePerDay || "1 hour"}/day</span>
                </div>
                {activeRoadmap.goal && (
                  <div className="flex items-center gap-1.5">
                    <Target className="w-4 h-4 text-[#E04D4D]" />
                    <span>Goal: {activeRoadmap.goal}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Day-by-Day Timeline List */}
            <div className="space-y-3">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400 pb-1">
                Day-by-Day Syllabus
              </h2>

              {activeRoadmap.days.map((dayItem) => {
                const isDayDone = !!activeRoadmap.completedDays?.[dayItem.day];
                const isExpanded = !!expandedDays[dayItem.day];

                return (
                  <div
                    key={dayItem.day}
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                      isDayDone
                        ? "bg-slate-50/60 dark:bg-neutral-950/40 border-slate-200 dark:border-neutral-900 opacity-80"
                        : "bg-white dark:bg-neutral-950/80 border-slate-200 dark:border-neutral-800 shadow-xs"
                    }`}
                  >
                    {/* Day Row Header */}
                    <div
                      onClick={() => toggleExpandDay(dayItem.day)}
                      className="p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 dark:hover:bg-neutral-900/40 transition select-none"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        {/* Day Completion Checkbox */}
                        <button
                          type="button"
                          onClick={(e) => toggleDayCompletion(dayItem.day, e)}
                          aria-label={`Mark day ${dayItem.day} complete`}
                          className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all shrink-0 cursor-pointer ${
                            isDayDone
                              ? "bg-[#E04D4D] border-[#E04D4D] text-white"
                              : "border-slate-300 dark:border-neutral-600 hover:border-[#E04D4D] dark:hover:border-[#E04D4D] bg-transparent"
                          }`}
                        >
                          {isDayDone && <Check className="w-3 h-3 stroke-[3]" />}
                        </button>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[#E04D4D] uppercase tracking-wide">
                              Day {dayItem.day}
                            </span>
                            {dayItem.durationMinutes && (
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-neutral-900 text-slate-500 dark:text-neutral-400">
                                ~{dayItem.durationMinutes} mins
                              </span>
                            )}
                          </div>

                          <h3
                            className={`text-sm sm:text-base font-semibold truncate ${
                              isDayDone
                                ? "text-slate-400 dark:text-neutral-500 line-through"
                                : "text-slate-900 dark:text-white"
                            }`}
                          >
                            {dayItem.title}
                          </h3>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-slate-400 dark:text-neutral-500 shrink-0">
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    </div>

                    {/* Expanded Day Content */}
                    {isExpanded && (
                      <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-slate-100 dark:border-neutral-900 text-xs sm:text-sm space-y-3">
                        {dayItem.note && (
                          <p className="text-slate-500 dark:text-neutral-400 italic">
                            💡 {dayItem.note}
                          </p>
                        )}

                        {/* CASE A: DSA PROBLEMS */}
                        {dayItem.problems && dayItem.problems.length > 0 && (
                          <div className="space-y-2 pt-1">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-neutral-500 block">
                              Assigned Problems:
                            </span>

                            {dayItem.problems.map((prob) => {
                              const isItemDone = !!activeRoadmap.completedItems?.[prob.id];

                              return (
                                <div
                                  key={prob.id}
                                  className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-200/80 dark:border-neutral-800"
                                >
                                  <div className="flex items-center gap-2.5 min-w-0">
                                    <button
                                      type="button"
                                      onClick={(e) => toggleItemCompletion(prob.id, e)}
                                      className={`w-4 h-4 rounded-full flex items-center justify-center border transition-all shrink-0 cursor-pointer ${
                                        isItemDone
                                          ? "bg-[#E04D4D] border-[#E04D4D] text-white"
                                          : "border-slate-300 dark:border-neutral-600 bg-transparent"
                                      }`}
                                    >
                                      {isItemDone && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                                    </button>

                                    <span
                                      className={`font-medium truncate ${
                                        isItemDone
                                          ? "text-slate-400 dark:text-neutral-500 line-through"
                                          : "text-slate-800 dark:text-neutral-200"
                                      }`}
                                    >
                                      {prob.title}
                                    </span>

                                    <span
                                      className={`text-[10px] px-2 py-0.5 rounded-md font-semibold shrink-0 ${
                                        prob.difficulty === "Easy"
                                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                                          : prob.difficulty === "Medium"
                                          ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                                          : "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20"
                                      }`}
                                    >
                                      {prob.difficulty}
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-2 shrink-0">
                                    <Link
                                      to={`/sheets/${activeRoadmap.sheetId || "leetcode-top-150"}`}
                                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 text-xs font-semibold text-slate-700 dark:text-neutral-200 hover:text-[#E04D4D] dark:hover:text-white transition"
                                    >
                                      <span>Solve</span>
                                      <Code2 className="w-3 h-3" />
                                    </Link>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* CASE B: VIDEO LESSONS */}
                        {dayItem.videos && dayItem.videos.length > 0 && (
                          <div className="space-y-2 pt-1">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-neutral-500 block">
                              Today's Video Lessons:
                            </span>

                            {dayItem.videos.map((vid) => {
                              const isItemDone = !!activeRoadmap.completedItems?.[vid.id];
                              const minutes = Math.round(vid.durationSeconds / 60);

                              return (
                                <div
                                  key={vid.id}
                                  className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-200/80 dark:border-neutral-800"
                                >
                                  <div className="flex items-center gap-2.5 min-w-0">
                                    <button
                                      type="button"
                                      onClick={(e) => toggleItemCompletion(vid.id, e)}
                                      className={`w-4 h-4 rounded-full flex items-center justify-center border transition-all shrink-0 cursor-pointer ${
                                        isItemDone
                                          ? "bg-[#E04D4D] border-[#E04D4D] text-white"
                                          : "border-slate-300 dark:border-neutral-600 bg-transparent"
                                      }`}
                                    >
                                      {isItemDone && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                                    </button>

                                    <span
                                      className={`font-medium truncate ${
                                        isItemDone
                                          ? "text-slate-400 dark:text-neutral-500 line-through"
                                          : "text-slate-800 dark:text-neutral-200"
                                      }`}
                                    >
                                      {vid.title}
                                    </span>

                                    {minutes > 0 && (
                                      <span className="text-[10px] text-slate-400 dark:text-neutral-500 shrink-0">
                                        ({minutes}m)
                                      </span>
                                    )}
                                  </div>

                                  <button
                                    type="button"
                                    onClick={() => handleWatchVideo(vid)}
                                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-gradient-to-r from-[#BA3C3C] to-[#E04D4D] text-white text-xs font-semibold hover:brightness-110 transition cursor-pointer shrink-0"
                                  >
                                    <Play className="w-3 h-3 fill-current" />
                                    <span>Watch</span>
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* CASE C: AI "LEARN ANYTHING" CONCEPTS & TASKS */}
                        {dayItem.concepts && (
                          <div className="space-y-3 pt-1">
                            <div>
                              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-neutral-500 block mb-1">
                                Core Concepts:
                              </span>
                              <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-neutral-300">
                                {dayItem.concepts.map((concept, idx) => (
                                  <li key={idx}>{concept}</li>
                                ))}
                              </ul>
                            </div>

                            {dayItem.task && (
                              <div className="p-3 rounded-xl bg-red-500/5 dark:bg-red-950/20 border border-red-500/20">
                                <span className="text-[11px] font-bold uppercase tracking-wider text-[#E04D4D] block mb-1">
                                  Actionable Task:
                                </span>
                                <p className="text-slate-800 dark:text-neutral-200 font-medium">
                                  {dayItem.task}
                                </p>
                              </div>
                            )}

                            {dayItem.resourceQuery && (
                              <div className="pt-1">
                                <a
                                  href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                                    dayItem.resourceQuery
                                  )}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E04D4D] hover:underline"
                                >
                                  <span>Find curated video tutorial on YouTube</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* ============================================================== */
          /* VIEW 2: ROADMAP BUILDER FORM (MATCHING REFERENCE SCREENSHOTS) */
          /* ============================================================== */
          <div className="space-y-10 animate-in fade-in duration-300">
            {/* Hero Header matching Screenshot 1 */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#E04D4D]">
                roadmap
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                A roadmap built around{" "}
                <span className="text-[#E04D4D]">your days.</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
                Four taps. We'll draft the syllabus, order it so nothing depends
                on what you haven't learnt yet, and hand you one honest list each
                morning.
              </p>

              {/* Main Mode Tabs Switcher */}
              <div className="flex items-center gap-2 pt-3 flex-wrap">
                <button
                  type="button"
                  onClick={() => setMainMode("build")}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
                    mainMode === "build"
                      ? "bg-gradient-to-r from-[#BA3C3C] to-[#E04D4D] text-white shadow-md shadow-red-500/20"
                      : "bg-white/80 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-700 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  Build your own
                </button>

                <button
                  type="button"
                  onClick={() => setMainMode("video")}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
                    mainMode === "video"
                      ? "bg-gradient-to-r from-[#BA3C3C] to-[#E04D4D] text-white shadow-md shadow-red-500/20"
                      : "bg-white/80 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-700 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  Video roadmap
                </button>

                {/* If active roadmap exists, show quick resume button */}
                {activeRoadmap && (
                  <button
                    type="button"
                    onClick={() => setSearchParams({ view: "active" }, { replace: true })}
                    className="ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-red-500/30 bg-red-500/10 text-xs font-semibold text-[#E04D4D] hover:bg-red-500/20 transition cursor-pointer"
                  >
                    <span>View Active Roadmap ({progressPercent}%)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* ============================================================ */}
            {/* SUB-MODE A: BUILD YOUR OWN (DSA OR LEARN ANYTHING) */}
            {/* ============================================================ */}
            {mainMode === "build" && (
              <div className="space-y-8 animate-in fade-in duration-200">
                {/* 2 Category Selection Cards (Screenshot 1) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Card 1: DSA & Interviews */}
                  <div
                    onClick={() => setBuildCategory("dsa")}
                    className={`p-6 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                      buildCategory === "dsa"
                        ? "bg-red-500/5 dark:bg-red-950/20 border-red-500/40 ring-1 ring-red-500/40 shadow-sm"
                        : "bg-white dark:bg-neutral-900/60 border-slate-200 dark:border-neutral-800 hover:border-slate-300 dark:hover:border-neutral-700"
                    }`}
                  >
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-1.5 flex items-center justify-between">
                        <span>DSA & interviews</span>
                        <Code2 className="w-4 h-4 text-[#E04D4D]" />
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-neutral-400 leading-relaxed">
                        Built from our own sheets, so every step opens in the sheet with clean code and video solutions.
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-neutral-800/80 flex items-center justify-between text-xs font-semibold text-[#E04D4D]">
                      <span>{buildCategory === "dsa" ? "Selected" : "Select DSA"}</span>
                      {buildCategory === "dsa" && <Check className="w-4 h-4" />}
                    </div>
                  </div>

                  {/* Card 2: Learn anything (Gemini Powered) */}
                  <div
                    onClick={() => setBuildCategory("ai")}
                    className={`p-6 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                      buildCategory === "ai"
                        ? "bg-red-500/5 dark:bg-red-950/20 border-red-500/40 ring-1 ring-red-500/40 shadow-sm"
                        : "bg-white dark:bg-neutral-900/60 border-slate-200 dark:border-neutral-800 hover:border-slate-300 dark:hover:border-neutral-700"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                          Learn anything
                        </h3>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/20 text-[#E04D4D] text-[10px] font-bold">
                          <Sparkles className="w-3 h-3" />
                          <span>Gemini AI</span>
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-neutral-400 leading-relaxed">
                        DevOps, Spring Boot, system design, Rust, you name it, we'll draft the complete curriculum.
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-neutral-800/80 flex items-center justify-between text-xs font-semibold text-[#E04D4D]">
                      <span>{buildCategory === "ai" ? "Selected" : "Select Topic"}</span>
                      {buildCategory === "ai" && <Check className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* IF DSA: Which Sheet Selector */}
                {buildCategory === "dsa" && (
                  <div className="space-y-3 pt-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-neutral-400 block">
                      Which DSA sheet?
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {SHEETS_DATA.map((sheet) => (
                        <div
                          key={sheet.id}
                          onClick={() => setSelectedSheetId(sheet.id)}
                          className={`p-4 rounded-xl border transition-all cursor-pointer ${
                            selectedSheetId === sheet.id
                              ? "bg-red-500/10 border-[#E04D4D] text-[#E04D4D]"
                              : "bg-white dark:bg-neutral-900/60 border-slate-200 dark:border-neutral-800 text-slate-700 dark:text-neutral-300 hover:border-slate-300 dark:hover:border-neutral-700"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-sm">{sheet.title}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-neutral-800 text-slate-500 dark:text-neutral-400">
                              {sheet.problemCount} Qs
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-neutral-400 line-clamp-2">
                            {sheet.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* IF LEARN ANYTHING: Topic Input & Suggestions */}
                {buildCategory === "ai" && (
                  <div className="space-y-4 pt-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-neutral-400 block">
                      What technology or skill do you want to learn?
                    </label>

                    <div className="relative">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={aiTopic}
                        onChange={(e) => setAiTopic(e.target.value)}
                        placeholder="e.g. Docker & Kubernetes, Spring Boot, System Design, Rust..."
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-neutral-500 focus:outline-none focus:border-[#E04D4D] focus:ring-1 focus:ring-[#E04D4D] transition"
                      />
                    </div>

                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-xs text-slate-400 dark:text-neutral-500 mr-1">
                        Popular:
                      </span>
                      {popularTopics.map((top) => (
                        <button
                          key={top}
                          type="button"
                          onClick={() => setAiTopic(top)}
                          className={`text-xs px-2.5 py-1 rounded-lg border transition cursor-pointer ${
                            aiTopic === top
                              ? "bg-red-500/10 border-red-500/30 text-[#E04D4D] font-semibold"
                              : "bg-white dark:bg-neutral-900 border-slate-200 dark:border-neutral-800 text-slate-600 dark:text-neutral-400 hover:border-slate-300 dark:hover:border-neutral-700"
                          }`}
                        >
                          {top}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* QUESTION 1: Where are you now? (Screenshot 1) */}
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-neutral-400 block">
                    Where are you now?
                  </label>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    {[
                      "Never started",
                      "Know the basics",
                      "Solved 50+",
                      "Interview-ready",
                    ].map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setCurrentLevel(lvl)}
                        className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer ${
                          currentLevel === lvl
                            ? "bg-red-500/10 border border-[#E04D4D] text-[#E04D4D] font-semibold shadow-xs"
                            : "bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-700 dark:text-neutral-300 hover:border-slate-300 dark:hover:border-neutral-700"
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                {/* QUESTION 2: What are you aiming for? (Screenshot 1) */}
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-neutral-400 block">
                    What are you aiming for?
                  </label>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    {[
                      "Interview soon",
                      "Strong fundamentals",
                      "A specific company",
                      "Just curious",
                    ].map((targetGoal) => (
                      <button
                        key={targetGoal}
                        type="button"
                        onClick={() => setGoal(targetGoal)}
                        className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer ${
                          goal === targetGoal
                            ? "bg-red-500/10 border border-[#E04D4D] text-[#E04D4D] font-semibold shadow-xs"
                            : "bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-700 dark:text-neutral-300 hover:border-slate-300 dark:hover:border-neutral-700"
                        }`}
                      >
                        {targetGoal}
                      </button>
                    ))}
                  </div>
                </div>

                {/* QUESTION 3: Time per day (Screenshot 3) */}
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-neutral-400 block">
                    Time per day
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { value: "30 min", caption: "a focused session" },
                      { value: "1 hour", caption: "the sweet spot" },
                      { value: "2 hr+", caption: "going hard" },
                    ].map((item) => (
                      <div
                        key={item.value}
                        onClick={() => setTimePerDay(item.value)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                          timePerDay === item.value
                            ? "bg-red-500/10 border-[#E04D4D] text-[#E04D4D]"
                            : "bg-white dark:bg-neutral-900 border-slate-200 dark:border-neutral-800 text-slate-700 dark:text-neutral-300 hover:border-slate-300 dark:hover:border-neutral-700"
                        }`}
                      >
                        <span className="block font-bold text-sm sm:text-base">
                          {item.value}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-neutral-400">
                          {item.caption}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* QUESTION 4: How long have you got? (Screenshot 3) */}
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-neutral-400 block">
                    How long have you got?
                  </label>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    {["2 weeks", "3 weeks", "1 month", "6 weeks"].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => {
                          setDurationPreset(preset);
                          setCustomDays("");
                        }}
                        className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer ${
                          durationPreset === preset && !customDays
                            ? "bg-red-500/10 border border-[#E04D4D] text-[#E04D4D] font-semibold shadow-xs"
                            : "bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-700 dark:text-neutral-300 hover:border-slate-300 dark:hover:border-neutral-700"
                        }`}
                      >
                        {preset}
                      </button>
                    ))}

                    <div className="inline-flex items-center">
                      <input
                        type="number"
                        min="3"
                        max="90"
                        placeholder="or type days"
                        value={customDays}
                        onChange={(e) => setCustomDays(e.target.value)}
                        className="w-32 px-3 py-2 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs sm:text-sm text-slate-800 dark:text-neutral-200 placeholder:text-slate-400 focus:outline-none focus:border-[#E04D4D]"
                      />
                    </div>
                  </div>
                </div>

                {/* Action Trigger Button (Screenshot 3) */}
                <div className="pt-4 flex items-center gap-4 flex-wrap">
                  <button
                    type="button"
                    disabled={isGeneratingAi}
                    onClick={
                      buildCategory === "dsa"
                        ? handleBuildDsaRoadmap
                        : handleBuildAiRoadmap
                    }
                    className="flex items-center gap-2 bg-gradient-to-r from-[#BA3C3C] to-[#E04D4D] hover:brightness-110 text-white font-semibold text-sm sm:text-base px-8 py-3.5 rounded-xl shadow-lg hover:shadow-red-500/20 active:scale-[0.98] transition cursor-pointer disabled:opacity-50"
                  >
                    {isGeneratingAi ? (
                      <>
                        <Sparkles className="w-4 h-4 animate-spin" />
                        <span>Drafting with Gemini AI...</span>
                      </>
                    ) : (
                      <>
                        <span>Build my roadmap</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <span className="text-xs text-slate-400 dark:text-neutral-500">
                    Takes about half a minute · customized around your {timePerDay}/day pace
                  </span>
                </div>
              </div>
            )}

            {/* ============================================================ */}
            {/* SUB-MODE B: VIDEO ROADMAP (SCREENSHOT 2 & 4) */}
            {/* ============================================================ */}
            {mainMode === "video" && (
              <div className="space-y-8 animate-in fade-in duration-200">
                {/* Header & Pace selector */}
                <div className="space-y-3 pb-2 border-b border-slate-200 dark:border-neutral-900">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    Video roadmaps
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-neutral-400 max-w-2xl leading-relaxed">
                    A full video series, split into days for you. No AI involved, the order is the author's, we just pace it.
                  </p>

                  <div className="flex items-center gap-2 pt-2">
                    {["30 mins a day", "1 hour a day", "2 hours a day"].map((pace) => (
                      <button
                        key={pace}
                        type="button"
                        onClick={() => setVideoPace(pace)}
                        className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
                          videoPace === pace
                            ? "bg-red-500/10 border border-[#E04D4D] text-[#E04D4D]"
                            : "bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-700 dark:text-neutral-300 hover:border-slate-300 dark:hover:border-neutral-700"
                        }`}
                      >
                        {pace}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Source switcher: User's Library Playlists vs Preset Courses */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setVideoSourceTab("library")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                      videoSourceTab === "library"
                        ? "bg-[#E04D4D] text-white"
                        : "bg-slate-100 dark:bg-neutral-900 text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    From Your Library ({userPlaylists.length})
                  </button>

                  <button
                    type="button"
                    onClick={() => setVideoSourceTab("presets")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                      videoSourceTab === "presets"
                        ? "bg-[#E04D4D] text-white"
                        : "bg-slate-100 dark:bg-neutral-900 text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    Popular YouTube Series ({PRESET_VIDEO_COURSES.length})
                  </button>
                </div>

                {/* Video Playlists Grid */}
                <div className="space-y-4">
                  {videoSourceTab === "library" ? (
                    userPlaylists.length === 0 ? (
                      <div className="text-center p-8 rounded-2xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800">
                        <ListMusic className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                          No Playlists in Library Yet
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-neutral-400 mb-4 max-w-sm mx-auto">
                          Import a YouTube playlist in your Library or pick from the popular courses below to generate a video schedule.
                        </p>
                        <div className="flex items-center justify-center gap-3">
                          <Link
                            to="/library"
                            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#BA3C3C] to-[#E04D4D] text-white text-xs font-semibold hover:brightness-110 transition"
                          >
                            Go to Library
                          </Link>
                          <button
                            type="button"
                            onClick={() => setVideoSourceTab("presets")}
                            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-neutral-900 text-slate-700 dark:text-neutral-300 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-neutral-800 transition"
                          >
                            Explore Popular Series
                          </button>
                        </div>
                      </div>
                    ) : (
                      userPlaylists.map((pl) => {
                        // Calculate days based on pace
                        const hours = videoPace.includes("30")
                          ? 0.5
                          : videoPace.includes("2")
                          ? 2
                          : 1;
                        const totalHours = pl.totalDuration
                          ? Math.round(pl.totalDuration / 3600)
                          : Math.round((pl.videos?.length || 10) * 0.4);
                        const daysRequired = Math.max(1, Math.ceil(totalHours / hours));

                        return (
                          <div
                            key={pl._id}
                            className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-neutral-950/80 border border-slate-200 dark:border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs"
                          >
                            <div className="space-y-1">
                              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                                {pl.title}
                              </h3>
                              <p className="text-xs text-slate-500 dark:text-neutral-400">
                                {pl.videos?.length || 0} videos · about {totalHours} hours.
                              </p>
                            </div>

                            <div className="flex items-center gap-4 self-end sm:self-center">
                              <div className="text-right">
                                <span className="text-base font-bold text-[#E04D4D] block">
                                  {daysRequired} days
                                </span>
                                <span className="text-[10px] text-slate-400 dark:text-neutral-500">
                                  at this pace
                                </span>
                              </div>

                              <button
                                type="button"
                                disabled={isBuildingVideoRoadmap}
                                onClick={() => handleBuildVideoRoadmap(pl)}
                                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#BA3C3C] to-[#E04D4D] hover:brightness-110 text-white font-semibold text-xs sm:text-sm shadow-xs transition cursor-pointer disabled:opacity-50"
                              >
                                {isBuildingVideoRoadmap ? "Drafting..." : "Start this"}
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )
                  ) : (
                    // PRESET POPULAR COURSES (Featuring multiple creators)
                    PRESET_VIDEO_COURSES.map((course) => {
                      const hours = videoPace.includes("30")
                        ? 0.5
                        : videoPace.includes("2")
                        ? 2
                        : 1;
                      const daysRequired = Math.max(
                        1,
                        Math.ceil(course.approxHours / hours)
                      );

                      return (
                        <div
                          key={course.id}
                          className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-neutral-950/80 border border-slate-200 dark:border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs"
                        >
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-2">
                              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                                {course.title}
                              </h3>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-neutral-400">
                              {course.description}
                            </p>
                            <p className="text-xs text-slate-400 dark:text-neutral-500 flex items-center gap-2">
                              <span className="font-semibold text-slate-700 dark:text-neutral-300">
                                by {course.instructor}
                              </span>
                              <span>·</span>
                              <span>{course.totalVideos} videos</span>
                              <span>·</span>
                              <span>~{course.approxHours} hours</span>
                            </p>
                          </div>

                          <div className="flex items-center gap-4 self-end sm:self-center shrink-0">
                            <div className="text-right">
                              <span className="text-base font-bold text-[#E04D4D] block">
                                {daysRequired} days
                              </span>
                              <span className="text-[10px] text-slate-400 dark:text-neutral-500">
                                at this pace
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleBuildVideoRoadmap(course)}
                              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#BA3C3C] to-[#E04D4D] hover:brightness-110 text-white font-semibold text-xs sm:text-sm shadow-xs transition cursor-pointer"
                            >
                              Start this
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* In-app Video Player Modal for Preset Roadmap Videos */}
      <RoadmapPlayerModal
        isOpen={!!modalVideo}
        video={modalVideo}
        courseTitle={activeRoadmap?.title}
        isCompleted={modalVideo && !!activeRoadmap?.completedItems?.[modalVideo.id]}
        onToggleComplete={(id) => toggleItemCompletion(id)}
        onClose={() => setModalVideo(null)}
      />
    </AppShell>
  );
}
