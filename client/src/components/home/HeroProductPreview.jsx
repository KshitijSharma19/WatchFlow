import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Play,
  Pause,
  CheckCircle2,
  Lock,
  ArrowRight,
  Code2,
  Compass,
  FileText,
  Sparkles,
  Flame,
  Clock,
  Check,
  Download,
} from "lucide-react";

export default function HeroProductPreview() {
  const [activeTab, setActiveTab] = useState("player");
  const [activeVideo, setActiveVideo] = useState(3);
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState("1.25x");
  const [currentTimeSec, setCurrentTimeSec] = useState(868); // 14:28
  const totalDurationSec = 2535; // 42:15

  // Interactive Sheets state
  const [sheetProblems, setSheetProblems] = useState([
    { id: 1, title: "Two Sum", diff: "Easy", topic: "Arrays & Hash Table", solved: true },
    { id: 2, title: "3Sum & Two Pointers", diff: "Medium", topic: "Two Pointers", solved: true },
    { id: 3, title: "Sliding Window Maximum", diff: "Hard", topic: "Monotonic Queue", solved: true },
    { id: 4, title: "LRU Cache Design", diff: "Medium", topic: "Linked List", solved: false },
    { id: 5, title: "Trapping Rain Water", diff: "Hard", topic: "Prefix & Suffix", solved: false },
  ]);

  // Playlist episodes
  const [queueItems] = useState([
    { id: 0, title: "01. Architecture & Core Container", duration: "28m", status: "done", lengthSec: 1680 },
    { id: 1, title: "02. Dependency Injection Flow", duration: "34m", status: "done", lengthSec: 2040 },
    { id: 2, title: "03. REST API Controllers", duration: "42m", status: "done", lengthSec: 2520 },
    { id: 3, title: "04. Spring Data JPA (Playing)", duration: "42m", status: "playing", lengthSec: 2535 },
    { id: 4, title: "05. DTO Pattern & Validation", duration: "31m", status: "upcoming", lengthSec: 1860 },
  ]);

  // Active episode title
  const currentEpisode = queueItems[activeVideo] || queueItems[3];

  // Live timer tick animation when playing
  useEffect(() => {
    if (!isPlaying || activeTab !== "player") return;

    const speed = parseFloat(playbackSpeed) || 1.25;
    const interval = setInterval(() => {
      setCurrentTimeSec((prev) => (prev >= totalDurationSec ? 0 : prev + 1));
    }, 1000 / speed);

    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, activeTab, totalDurationSec]);

  // Format seconds to mm:ss
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const progressPercent = Math.min(
    Math.max(((currentTimeSec / totalDurationSec) * 100), 1),
    100
  ).toFixed(1);

  // Toggle problem completion in Practice Sheets tab
  const toggleProblemSolved = (id) => {
    setSheetProblems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, solved: !p.solved } : p))
    );
  };

  const solvedCount = sheetProblems.filter((p) => p.solved).length;

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Ambient Red Glow behind Mac Window */}
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-red-600/10 via-[#E04D4D]/15 to-red-900/10 blur-xl opacity-75 pointer-events-none" />

      {/* Mac Window Container: Responsive to Light & Dark Theme */}
      <div className="relative rounded-2xl bg-white/95 dark:bg-[#0c0810]/95 border border-slate-200/90 dark:border-white/10 shadow-xl shadow-slate-300/30 dark:shadow-red-950/25 backdrop-blur-xl overflow-hidden text-left transition-all duration-300 hover:border-red-500/30">
        {/* macOS Top Bar */}
        <div className="flex items-center justify-between px-3.5 sm:px-4 py-2 sm:py-2.5 border-b border-slate-200/80 dark:border-white/10 bg-slate-100/80 dark:bg-white/[0.03]">
          {/* Traffic Light Dots */}
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] shadow-xs" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] shadow-xs" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] shadow-xs" />
          </div>

          {/* Centered URL Address Pill */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white dark:bg-black/40 border border-slate-200 dark:border-white/5 text-[11px] text-slate-600 dark:text-neutral-400 font-mono select-none shadow-2xs">
            <Lock className="w-3 h-3 text-emerald-500 dark:text-emerald-400" />
            <span>watchflow.app/workspace</span>
          </div>

          {/* Right Status Indicator */}
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
            <span className="hidden sm:inline">Zero Distractions</span>
          </div>
        </div>

        {/* Feature Tab Bar */}
        <div className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 border-b border-slate-200/80 dark:border-white/10 bg-slate-50 dark:bg-black/30 overflow-x-auto scrollbar-none text-xs">
          <button
            type="button"
            onClick={() => setActiveTab("player")}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg font-semibold transition cursor-pointer ${
              activeTab === "player"
                ? "bg-red-500/10 border border-[#E04D4D]/30 text-[#E04D4D] dark:text-red-400 shadow-2xs"
                : "text-slate-600 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white"
            }`}
          >
            <Play className="w-3 h-3 fill-current" />
            <span>Focus Player</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("sheets")}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg font-semibold transition cursor-pointer ${
              activeTab === "sheets"
                ? "bg-red-500/10 border border-[#E04D4D]/30 text-[#E04D4D] dark:text-red-400 shadow-2xs"
                : "text-slate-600 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white"
            }`}
          >
            <Code2 className="w-3 h-3" />
            <span>Practice Sheets</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("roadmap")}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg font-semibold transition cursor-pointer ${
              activeTab === "roadmap"
                ? "bg-red-500/10 border border-[#E04D4D]/30 text-[#E04D4D] dark:text-red-400 shadow-2xs"
                : "text-slate-600 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white"
            }`}
          >
            <Compass className="w-3 h-3" />
            <span>AI Roadmap</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("notes")}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg font-semibold transition cursor-pointer ${
              activeTab === "notes"
                ? "bg-red-500/10 border border-[#E04D4D]/30 text-[#E04D4D] dark:text-red-400 shadow-2xs"
                : "text-slate-600 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white"
            }`}
          >
            <FileText className="w-3 h-3" />
            <span>Notes & Streaks</span>
          </button>
        </div>

        {/* Main Workspace Body */}
        <div className="p-3 sm:p-3.5">
          {/* TAB 1: FOCUS PLAYER */}
          {activeTab === "player" && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-3.5 items-stretch">
              {/* Left Column: Player Box */}
              <div className="md:col-span-7 flex flex-col justify-between space-y-2">
                {/* Video Title Header & Playback Speed Pills */}
                <div className="flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-800 dark:text-white font-semibold truncate min-w-0">
                    <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                    <span className="truncate text-[11px] sm:text-[12px]">
                      {currentEpisode.title}
                    </span>
                  </div>

                  {/* Speed Controls */}
                  <div className="flex items-center gap-1 shrink-0 text-[10px] font-mono">
                    {["1x", "1.25x", "1.5x", "2x"].map((speed) => (
                      <button
                        key={speed}
                        type="button"
                        onClick={() => setPlaybackSpeed(speed)}
                        className={`px-1.5 py-0.5 rounded cursor-pointer transition ${
                          playbackSpeed === speed
                            ? "bg-red-500/20 text-[#E04D4D] font-bold border border-red-500/40"
                            : "text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white"
                        }`}
                      >
                        {speed}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Video Player Canvas Card (Responsive: White in light mode, Dark in dark mode) */}
                <div className="relative rounded-xl bg-white dark:bg-[#0a050d] text-slate-800 dark:text-white border border-slate-200 dark:border-white/5 aspect-video sm:aspect-16/10 flex flex-col justify-between p-3 overflow-hidden shadow-xs dark:shadow-inner group transition-colors">
                  {/* Top Bar inside Player */}
                  <div className="flex items-center justify-between z-10">
                    <span className="px-2 py-0.5 rounded bg-red-500/10 dark:bg-red-500/20 border border-red-500/30 text-[9px] font-bold uppercase tracking-wider text-[#E04D4D] dark:text-red-400">
                      Focus Mode
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 dark:text-neutral-300">
                      {formatTime(currentTimeSec)} / 42:15
                    </span>
                  </div>

                  {/* Center Pause/Play Button & Subtitle */}
                  <div className="flex flex-col items-center justify-center my-auto z-10 text-center space-y-1.5">
                    <button
                      type="button"
                      onClick={() => setIsPlaying((p) => !p)}
                      title={isPlaying ? "Pause video" : "Play video"}
                      className="w-10 h-10 rounded-full bg-red-500/10 hover:bg-red-500/20 text-[#E04D4D] dark:text-red-400 border border-red-500/30 hover:border-red-500/50 flex items-center justify-center shadow-xs transition-transform active:scale-95 cursor-pointer"
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4 fill-current" />
                      ) : (
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      )}
                    </button>
                    <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-neutral-400 font-medium select-none">
                      Zero ads · Zero recommended clickbait · Full focus
                    </p>
                  </div>

                  {/* Bottom Animated Timeline Bar */}
                  <div className="z-10 space-y-1">
                    <div className="w-full h-1 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#E04D4D] to-[#BA3C3C] rounded-full transition-all duration-300"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Course Queue */}
              <div className="md:col-span-5 flex flex-col justify-between bg-slate-100/90 dark:bg-black/40 rounded-xl p-3 border border-slate-200/80 dark:border-white/5 space-y-2">
                {/* Queue Header */}
                <div className="flex items-center justify-between text-[11px] pb-1.5 border-b border-slate-200 dark:border-white/5 font-semibold">
                  <span className="text-slate-600 dark:text-neutral-400 uppercase tracking-wider text-[10px]">
                    Course Queue (4/18)
                  </span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-mono text-[10px]">
                    22% Complete
                  </span>
                </div>

                {/* Queue List Items */}
                <div className="space-y-1.5 overflow-y-auto max-h-[160px] pr-0.5 scrollbar-thin scrollbar-thumb-neutral-400 dark:scrollbar-thumb-neutral-800">
                  {queueItems.map((item) => {
                    const isCurrent = activeVideo === item.id;
                    const isDone = item.status === "done";

                    return (
                      <div
                        key={item.id}
                        onClick={() => {
                          setActiveVideo(item.id);
                          setCurrentTimeSec(0);
                          setIsPlaying(true);
                        }}
                        className={`flex items-center justify-between gap-2 p-1.5 sm:p-2 rounded-lg text-xs transition cursor-pointer border ${
                          isCurrent
                            ? "bg-red-500/10 border-red-500/40 text-red-600 dark:text-white shadow-2xs font-semibold"
                            : "bg-transparent border-transparent text-slate-700 dark:text-neutral-400 hover:bg-slate-200/60 dark:hover:bg-white/[0.04]"
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          {isDone ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0" />
                          ) : isCurrent ? (
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping shrink-0" />
                          ) : (
                            <span className="w-3.5 h-3.5 rounded-full border border-slate-400 dark:border-neutral-700 shrink-0" />
                          )}
                          <span className="truncate text-[11px]">
                            {item.title}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-500 dark:text-neutral-500 font-mono shrink-0">
                          {item.duration}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Action CTA */}
                <Link
                  to="/sheets"
                  className="w-full py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-[#E04D4D] dark:text-red-400 border border-red-500/30 hover:border-red-500/50 font-bold text-xs text-center transition shadow-xs flex items-center justify-center gap-1.5 active:scale-[0.98]"
                >
                  <span>Open in Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* TAB 2: PRACTICE SHEETS PREVIEW */}
          {activeTab === "sheets" && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs pb-1.5 border-b border-slate-200 dark:border-white/5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 dark:text-white">
                    Striver SDE Sheet · 450 Problems
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-red-500/10 text-[#E04D4D] border border-red-500/20">
                    DSA & LeetCode
                  </span>
                </div>
                <span className="text-emerald-600 dark:text-emerald-400 font-mono text-[11px]">
                  {solvedCount} / {sheetProblems.length} Solved
                </span>
              </div>

              {/* Interactive Problem Rows */}
              <div className="space-y-1.5 max-h-[175px] overflow-y-auto pr-0.5">
                {sheetProblems.map((prob) => {
                  const badgeColor =
                    prob.diff === "Easy"
                      ? "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                      : prob.diff === "Medium"
                      ? "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20"
                      : "text-red-600 dark:text-red-400 bg-red-500/10 border-red-500/20";

                  return (
                    <div
                      key={prob.id}
                      onClick={() => toggleProblemSolved(prob.id)}
                      className="flex items-center justify-between p-2 rounded-lg bg-slate-100/80 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 hover:border-red-500/30 transition cursor-pointer text-xs group"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <button
                          type="button"
                          className="shrink-0"
                          title="Click to toggle status"
                        >
                          {prob.solved ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                          ) : (
                            <span className="w-4 h-4 rounded-full border border-slate-400 dark:border-neutral-600 inline-block group-hover:border-red-400" />
                          )}
                        </button>
                        <span
                          className={`font-medium truncate ${
                            prob.solved
                              ? "text-slate-500 dark:text-neutral-400 line-through"
                              : "text-slate-800 dark:text-white"
                          }`}
                        >
                          {prob.title}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] text-slate-500 dark:text-neutral-400 hidden sm:inline">
                          {prob.topic}
                        </span>
                        <span
                          className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${badgeColor}`}
                        >
                          {prob.diff}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Sheet CTA */}
              <div className="pt-1 flex items-center justify-between gap-3">
                <span className="text-[11px] text-slate-500 dark:text-neutral-400">
                  Every problem includes C++, Java, Python code & YouTube walkthroughs.
                </span>
                <Link
                  to="/sheets"
                  className="px-4 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-[#E04D4D] dark:text-red-400 border border-red-500/30 hover:border-red-500/50 font-bold text-xs flex items-center gap-1.5 shrink-0 transition active:scale-[0.98]"
                >
                  <span>Open 500+ Sheets</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* TAB 3: AI ROADMAP PREVIEW */}
          {activeTab === "roadmap" && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs pb-1.5 border-b border-slate-200 dark:border-white/5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 dark:text-white">
                    Full Stack Microservices & Spring AI Roadmap
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-red-500/10 text-[#E04D4D] border border-red-500/20">
                    4-Week AI Track
                  </span>
                </div>
                <span className="text-amber-500 text-[11px] font-mono flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Groq AI Sync</span>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-100/90 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-bold">
                    <span className="text-slate-900 dark:text-white">Week 1: Core Spring & Containers</span>
                    <span className="text-emerald-500 text-[10px]">100% Done</span>
                  </div>
                  <p className="text-[10px] text-slate-600 dark:text-neutral-400">
                    IoC containers, bean lifecycles, REST controllers, and Dockerizing apps.
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-100/90 dark:bg-white/[0.03] border border-red-500/30 space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-bold">
                    <span className="text-red-600 dark:text-red-400">Week 2: Microservices & Kafka</span>
                    <span className="text-red-500 text-[10px] font-mono">In Progress</span>
                  </div>
                  <p className="text-[10px] text-slate-600 dark:text-neutral-400">
                    Eureka service discovery, API Gateway routing, and asynchronous messaging.
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-100/90 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-bold">
                    <span className="text-slate-900 dark:text-white">Week 3: Distributed Cache</span>
                    <span className="text-slate-400 text-[10px]">Upcoming</span>
                  </div>
                  <p className="text-[10px] text-slate-600 dark:text-neutral-400">
                    Redis caching patterns, cache-aside, write-through, and eviction policies.
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-100/90 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-bold">
                    <span className="text-slate-900 dark:text-white">Week 4: Mock System Design</span>
                    <span className="text-slate-400 text-[10px]">Locked</span>
                  </div>
                  <p className="text-[10px] text-slate-600 dark:text-neutral-400">
                    Design URL shortener, Instagram feed, and rate limiters with trade-offs.
                  </p>
                </div>
              </div>

              {/* Bottom Roadmap CTA */}
              <div className="pt-1 flex items-center justify-between gap-3">
                <span className="text-[11px] text-slate-500 dark:text-neutral-400">
                  Custom AI curriculums generated in seconds based on your target role.
                </span>
                <Link
                  to="/roadmap"
                  className="px-4 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-[#E04D4D] dark:text-red-400 border border-red-500/30 hover:border-red-500/50 font-bold text-xs flex items-center gap-1.5 shrink-0 transition active:scale-[0.98]"
                >
                  <span>Build AI Roadmap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* TAB 4: NOTES & STREAKS PREVIEW */}
          {activeTab === "notes" && (
            <div className="space-y-3">
              {/* Top Row: Clean Note Preview & Streak Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* Note Card */}
                <div className="p-3 rounded-xl bg-slate-100/90 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-red-500/10 border border-red-500/20 text-[#BA3C3C] dark:text-red-400 font-mono text-[11px] font-semibold">
                      <Clock className="w-3 h-3" />
                      <span>14:28</span>
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-neutral-400 font-medium">
                      Spring Data JPA
                    </span>
                  </div>

                  <div className="text-[11px] font-bold text-slate-900 dark:text-white">
                    Distributed Caching Strategy
                  </div>

                  <p className="text-[10.5px] text-slate-600 dark:text-neutral-400 leading-relaxed">
                    • Cache-aside with 5m TTL prevents database load spikes.<br />
                    • Click timestamp to jump straight to this explanation.
                  </p>
                </div>

                {/* Consistency Streak Card */}
                <div className="p-3 rounded-xl bg-slate-100/90 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 flex flex-col justify-between space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-900 dark:text-white">
                      Learning Streak
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center gap-1">
                      <Flame className="w-3 h-3 fill-current text-amber-500" />
                      <span>7 Days Active</span>
                    </span>
                  </div>

                  {/* 7-Day Consistency visual pills */}
                  <div className="flex items-center justify-between gap-1 pt-0.5">
                    {["M", "T", "W", "T", "F", "S", "S"].map((day, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-1 flex-1">
                        <div className="w-full h-6 rounded-md bg-emerald-500/15 dark:bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                          <Check className="w-3 h-3" />
                        </div>
                        <span className="text-[9px] font-medium text-slate-500 dark:text-neutral-400">{day}</span>
                      </div>
                    ))}
                  </div>

                  <div className="text-[10px] text-slate-500 dark:text-neutral-400 text-center font-medium">
                    🔥 42m completed today · Daily goal achieved!
                  </div>
                </div>
              </div>

              {/* What We Offer Segment */}
              <div className="p-2.5 rounded-xl bg-slate-50/80 dark:bg-black/20 border border-slate-200/80 dark:border-white/5">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400 mb-2">
                  What WatchFlow Offers In Notes & Streaks
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="flex items-start gap-2 p-2 rounded-lg bg-white dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/5">
                    <Clock className="w-3.5 h-3.5 text-[#BA3C3C] dark:text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[11px] font-bold text-slate-800 dark:text-neutral-200">Video-Synced Notes</div>
                      <div className="text-[9.5px] text-slate-500 dark:text-neutral-400">1-click jump to exact moments</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 p-2 rounded-lg bg-white dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/5">
                    <FileText className="w-3.5 h-3.5 text-[#BA3C3C] dark:text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[11px] font-bold text-slate-800 dark:text-neutral-200">Markdown & Code</div>
                      <div className="text-[9.5px] text-slate-500 dark:text-neutral-400">Syntax blocks & cheat-sheets</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 p-2 rounded-lg bg-white dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/5">
                    <Download className="w-3.5 h-3.5 text-[#BA3C3C] dark:text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[11px] font-bold text-slate-800 dark:text-neutral-200">Search & Export</div>
                      <div className="text-[9.5px] text-slate-500 dark:text-neutral-400">Export to Markdown anytime</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="pt-0.5 flex items-center justify-between gap-3">
                <span className="text-[11px] text-slate-500 dark:text-neutral-400">
                  Build habits that stick with distraction-free note taking.
                </span>
                <Link
                  to="/notes"
                  className="px-4 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-[#E04D4D] dark:text-red-400 border border-red-500/30 hover:border-red-500/50 font-bold text-xs flex items-center gap-1.5 shrink-0 transition active:scale-[0.98]"
                >
                  <span>Open Notes Hub</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
