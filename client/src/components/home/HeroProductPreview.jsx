import { useState } from "react";
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
  Volume2,
} from "lucide-react";

export default function HeroProductPreview() {
  const [activeTab, setActiveTab] = useState("player");
  const [activeVideo, setActiveVideo] = useState(3); // 04. Spring Data JPA is active
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState("1.25x");

  const queueItems = [
    {
      id: 0,
      title: "01. Architecture & Core Container",
      duration: "28m",
      status: "done",
    },
    {
      id: 1,
      title: "02. Dependency Injection Flow",
      duration: "34m",
      status: "done",
    },
    {
      id: 2,
      title: "03. REST API Controllers",
      duration: "42m",
      status: "done",
    },
    {
      id: 3,
      title: "04. Spring Data JPA (Playing)",
      duration: "42m",
      status: "playing",
    },
    {
      id: 4,
      title: "05. DTO Pattern & Validation",
      duration: "31m",
      status: "upcoming",
    },
  ];

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Subtle Ambient Red Glow behind Mac Window */}
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-red-600/15 via-[#E04D4D]/20 to-red-900/10 blur-xl opacity-70 pointer-events-none" />

      {/* Mac Window Container */}
      <div className="relative rounded-2xl bg-[#0d0911]/95 dark:bg-[#0c0810]/95 border border-slate-300/80 dark:border-white/10 shadow-2xl shadow-slate-900/10 dark:shadow-red-950/25 backdrop-blur-xl overflow-hidden text-left transition-all duration-300 hover:border-red-500/30">
        {/* macOS Top Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5 bg-white/[0.02]">
          {/* Traffic Light Dots */}
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
          </div>

          {/* Centered URL Address Pill */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-black/40 border border-white/5 text-[11px] text-neutral-400 font-mono select-none">
            <Lock className="w-3 h-3 text-emerald-400" />
            <span>watchflow.app/workspace</span>
          </div>

          {/* Right Status */}
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-400 select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="hidden sm:inline">Zero Distractions</span>
          </div>
        </div>

        {/* Workspace Feature Tab Bar */}
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-white/5 bg-black/20 overflow-x-auto scrollbar-none text-xs">
          <button
            type="button"
            onClick={() => setActiveTab("player")}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg font-semibold transition cursor-pointer ${
              activeTab === "player"
                ? "bg-red-500/10 border border-red-500/30 text-[#E04D4D] shadow-xs"
                : "text-neutral-400 hover:text-white"
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
                ? "bg-red-500/10 border border-red-500/30 text-[#E04D4D] shadow-xs"
                : "text-neutral-400 hover:text-white"
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
                ? "bg-red-500/10 border border-red-500/30 text-[#E04D4D] shadow-xs"
                : "text-neutral-400 hover:text-white"
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
                ? "bg-red-500/10 border border-red-500/30 text-[#E04D4D] shadow-xs"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <FileText className="w-3 h-3" />
            <span>Notes & Streaks</span>
          </button>
        </div>

        {/* Main Workspace Body */}
        <div className="p-3.5 sm:p-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-stretch">
            {/* Left Side: Focus Video Player Box */}
            <div className="md:col-span-7 flex flex-col justify-between space-y-2.5">
              {/* Video Title Header & Speed Controls */}
              <div className="flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-1.5 text-white font-semibold truncate min-w-0">
                  <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                  <span className="truncate text-[12px] sm:text-[13px]">
                    Spring Boot 3 & Microservices Architecture · Episode 04
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
                          : "text-neutral-400 hover:text-white"
                      }`}
                    >
                      {speed}
                    </button>
                  ))}
                </div>
              </div>

              {/* Video Player Canvas Card */}
              <div className="relative rounded-xl bg-black/85 border border-white/5 aspect-video sm:aspect-16/10 flex flex-col justify-between p-3 overflow-hidden shadow-inner group">
                {/* Top Info Bar inside Player */}
                <div className="flex items-center justify-between z-10">
                  <span className="px-2 py-0.5 rounded bg-red-500/20 border border-red-500/30 text-[9px] font-bold uppercase tracking-wider text-red-400">
                    Focus Mode
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400">
                    14:28 / 42:15
                  </span>
                </div>

                {/* Center Pause/Play Button & Subtitle */}
                <div className="flex flex-col items-center justify-center my-auto z-10 text-center space-y-1.5">
                  <button
                    type="button"
                    onClick={() => setIsPlaying((p) => !p)}
                    className="w-10 h-10 rounded-full bg-red-600/90 hover:bg-red-500 text-white flex items-center justify-center shadow-lg shadow-red-950/60 transition-transform active:scale-95 cursor-pointer"
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4 fill-white" />
                    ) : (
                      <Play className="w-4 h-4 fill-white ml-0.5" />
                    )}
                  </button>
                  <p className="text-[10px] sm:text-[11px] text-neutral-400 font-medium select-none">
                    Zero ads · Zero recommended clickbait · Full focus
                  </p>
                </div>

                {/* Bottom Timeline Bar */}
                <div className="z-10 space-y-1">
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#BA3C3C] to-[#E04D4D] rounded-full w-[35%]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Course Queue */}
            <div className="md:col-span-5 flex flex-col justify-between bg-black/40 rounded-xl p-3 border border-white/5 space-y-2.5">
              {/* Queue Header */}
              <div className="flex items-center justify-between text-[11px] pb-1.5 border-b border-white/5 font-semibold">
                <span className="text-neutral-400 uppercase tracking-wider">
                  Course Queue (4/18)
                </span>
                <span className="text-emerald-400 font-mono">22% Complete</span>
              </div>

              {/* Queue List Items */}
              <div className="space-y-1.5 overflow-y-auto max-h-[170px] pr-0.5 scrollbar-thin scrollbar-thumb-neutral-800">
                {queueItems.map((item) => {
                  const isCurrent = activeVideo === item.id;
                  const isDone = item.status === "done";

                  return (
                    <div
                      key={item.id}
                      onClick={() => setActiveVideo(item.id)}
                      className={`flex items-center justify-between gap-2 p-2 rounded-lg text-xs transition cursor-pointer border ${
                        isCurrent
                          ? "bg-red-500/10 border-red-500/40 text-white shadow-xs"
                          : "bg-transparent border-transparent text-neutral-400 hover:bg-white/[0.03] hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        {isDone ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        ) : isCurrent ? (
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping shrink-0" />
                        ) : (
                          <span className="w-3.5 h-3.5 rounded-full border border-neutral-700 shrink-0" />
                        )}
                        <span className="truncate font-medium text-[11px] sm:text-xs">
                          {item.title}
                        </span>
                      </div>
                      <span className="text-[10px] text-neutral-500 font-mono shrink-0">
                        {item.duration}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Action Button to Open Workspace */}
              <Link
                to="/sheets"
                className="w-full py-2 rounded-xl bg-gradient-to-r from-[#BA3C3C] to-[#E04D4D] hover:from-[#c23f3f] hover:to-[#eb5e5e] text-white font-bold text-xs text-center transition shadow-md shadow-red-950/40 flex items-center justify-center gap-1.5 active:scale-[0.98]"
              >
                <span>Open in Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
