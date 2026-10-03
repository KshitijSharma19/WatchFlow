import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Play,
  FileCode2,
  CalendarCheck2,
  Sun,
  Moon,
  ChevronDown,
  Settings,
  MessageSquare,
  LogOut,
  Code2,
} from "lucide-react";
import toast from "react-hot-toast";
import SpaceWarpBackground from "../components/common/SpaceWarpBackground";
import HeroProductPreview from "../components/home/HeroProductPreview";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function Home() {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const closeTimeoutRef = useRef(null);
  const dropdownRef = useRef(null);

  // Authenticated user presentation
  const displayName = user?.name || user?.username || (isAuthenticated ? "User" : "");
  const displayEmail = user?.email || "";
  const initial = (displayName[0] || "U").toUpperCase();
  const streakCount = user?.streak || 0;

  // Handle outside click to close user menu dropdown
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 180);
  };

  const handleLogout = () => {
    setIsDropdownOpen(false);
    logout();
    toast.success("Signed out successfully");
    navigate("/login");
  };

  return (
    <div className="relative min-h-screen bg-[#faf8f6] dark:bg-[#040206] text-slate-900 dark:text-white overflow-x-hidden font-sans selection:bg-red-500/30 selection:text-red-200 transition-colors duration-300">
      {/* 3D Space Warp Starfield Canvas Animation (Adaptive Dark / Light) */}
      <SpaceWarpBackground />

      {/* Top Navigation Bar */}
      <header className="relative z-20 max-w-7xl mx-auto px-4 sm:px-8 py-3.5 sm:py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <img
            src="/watchflow-logo.png"
            alt="WatchFlow Logo"
            className="h-6 sm:h-7 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
          />
          <span className="text-lg sm:text-xl font-bold tracking-tight select-none">
            <span className="text-slate-900 dark:text-white">Watch</span>
            <span className="text-[#E04D4D]">Flow</span>
          </span>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-200/60 dark:bg-white/[0.04] border border-slate-300/70 dark:border-white/10 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-md transition-colors">
          <Link
            to="/learning"
            className="px-3.5 py-1 rounded-full text-slate-700 dark:text-neutral-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-300/50 dark:hover:bg-white/10 transition"
          >
            Learning
          </Link>
          <Link
            to="/sheets"
            className="px-3.5 py-1 rounded-full text-slate-700 dark:text-neutral-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-300/50 dark:hover:bg-white/10 transition"
          >
            Practice Sheets
          </Link>
          <Link
            to="/roadmap"
            className="px-3.5 py-1 rounded-full text-slate-700 dark:text-neutral-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-300/50 dark:hover:bg-white/10 transition"
          >
            Roadmap
          </Link>
        </nav>

        {/* Right Action Items */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Theme Toggle Button (Distinct Sun / Moon Transition) */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme mode"
            title={`Switch to ${isDark ? "light" : "dark"} mode`}
            className="p-2 rounded-xl text-slate-600 hover:text-slate-950 hover:bg-slate-200/80 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-white/10 border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-white/5 transition-all duration-200 cursor-pointer shadow-xs active:scale-95"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400 transition-transform duration-200 rotate-0 hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700 transition-transform duration-200 rotate-0 hover:-rotate-12" />
            )}
          </button>

          {/* Conditional: Logged-in User Pill with Streak vs Logged-out Log in & Get started */}
          {isAuthenticated ? (
            <div className="flex items-center gap-2.5">
              {/* Streak Indicator */}
              <div
                className="flex items-center gap-1 px-2 py-1 rounded-lg text-slate-700 dark:text-neutral-300 text-xs font-semibold select-none"
                title={`${streakCount} day consistency streak`}
              >
                <span className="text-sm">🔥</span>
                <span className="font-mono">{streakCount}</span>
              </div>

              {/* User Avatar Pill & Menu Dropdown (Replaces Get Started) */}
              <div
                ref={dropdownRef}
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  aria-label="User Menu"
                  aria-expanded={isDropdownOpen}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-slate-300/80 dark:border-neutral-800 bg-white dark:bg-[#151518] hover:bg-slate-100 dark:hover:bg-neutral-800/80 transition cursor-pointer select-none shadow-xs"
                >
                  <div className="w-6 h-6 rounded-md bg-amber-100 dark:bg-[#3d2014] flex items-center justify-center text-amber-800 dark:text-[#f59e0b] font-bold text-xs shadow-xs border border-amber-200 dark:border-amber-800/40">
                    {initial}
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-neutral-200 max-w-[100px] sm:max-w-[130px] truncate">
                    {displayName}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-400 dark:text-neutral-400 transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 sm:w-60 rounded-2xl bg-white dark:bg-[#121214] border border-slate-200 dark:border-neutral-800 shadow-2xl p-3.5 text-left z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="pb-3 border-b border-slate-100 dark:border-neutral-800/80 px-1">
                      <div className="text-sm font-bold text-slate-900 dark:text-white truncate">
                        {displayName}
                      </div>
                      {displayEmail && (
                        <div className="text-xs text-slate-500 dark:text-neutral-400 truncate mt-0.5">
                          {displayEmail}
                        </div>
                      )}
                    </div>

                    <div className="pt-2 space-y-1">
                      <Link
                        to="/sheets"
                        onClick={() => setIsDropdownOpen(false)}
                        className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-sm font-medium text-slate-700 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-neutral-800/60 transition cursor-pointer text-left"
                      >
                        <Code2 className="w-4 h-4 text-slate-500 dark:text-neutral-400" />
                        <span>Practice Sheets</span>
                      </Link>

                      <Link
                        to="/learning"
                        onClick={() => setIsDropdownOpen(false)}
                        className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-sm font-medium text-slate-700 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-neutral-800/60 transition cursor-pointer text-left"
                      >
                        <Play className="w-4 h-4 text-slate-500 dark:text-neutral-400" />
                        <span>Workspace</span>
                      </Link>

                      <Link
                        to="/settings"
                        onClick={() => setIsDropdownOpen(false)}
                        className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-sm font-medium text-slate-700 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-neutral-800/60 transition cursor-pointer text-left"
                      >
                        <Settings className="w-4 h-4 text-slate-500 dark:text-neutral-400" />
                        <span>Settings</span>
                      </Link>

                      <Link
                        to="/feedback"
                        onClick={() => setIsDropdownOpen(false)}
                        className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-sm font-medium text-slate-700 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-neutral-800/60 transition cursor-pointer text-left"
                      >
                        <MessageSquare className="w-4 h-4 text-slate-500 dark:text-neutral-400" />
                        <span>Feedback</span>
                      </Link>

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-sm font-medium text-slate-700 dark:text-neutral-300 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-500/10 transition cursor-pointer text-left"
                      >
                        <LogOut className="w-4 h-4 text-slate-500 dark:text-neutral-400" />
                        <span>Sign out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="px-3 py-1.5 text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-950 dark:text-neutral-300 dark:hover:text-white transition"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100 text-xs sm:text-sm font-semibold transition duration-200 shadow-sm active:scale-[0.98]"
              >
                Get started
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Main Hero Section: Compact and Scaled to fit 100% desktop viewport */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-4 sm:py-6 lg:min-h-[calc(100vh-80px)] flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center my-auto">
          {/* Left Column: Headline, Subtitle & Original Red Theme CTAs */}
          <div className="lg:col-span-5 xl:col-span-5 text-left space-y-4 sm:space-y-5">
            {/* Main Headline without the removed pill badge */}
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight leading-[1.12] text-slate-900 dark:text-white">
              Master Tech from{" "}
              <span className="bg-gradient-to-r from-[#FF7A7A] via-[#E04D4D] to-[#BA3C3C] bg-clip-text text-transparent">
                YouTube
              </span>
              .
              <br />
              <span className="text-slate-800 dark:text-slate-100">
                Zero Distractions.
              </span>
            </h1>

            {/* Minimal Sub-copy */}
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-lg leading-relaxed font-normal">
              Transform open YouTube courses into structured workspaces with distraction-free playback, timestamped markdown notes, AI roadmaps, and LeetCode consistency tracking.
            </p>

            {/* Dual CTA Buttons (Start free in original WatchFlow red button theme) */}
            <div className="flex items-center flex-wrap gap-3.5 pt-1">
              <Link
                to={isAuthenticated ? "/sheets" : "/signup"}
                className="group px-6 py-2.5 sm:py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-[#E04D4D] dark:text-red-400 border border-red-500/30 hover:border-red-500/50 text-sm sm:text-base font-bold shadow-xs hover:shadow-[0_0_24px_rgba(224,77,77,0.22)] active:scale-[0.98] transition-all duration-200 inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Start free</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/roadmap"
                className="px-5 py-2.5 sm:py-3 rounded-xl bg-slate-200/50 hover:bg-slate-200/80 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] border border-slate-300 dark:border-white/10 text-slate-800 dark:text-neutral-200 text-sm sm:text-base font-semibold transition active:scale-[0.98] cursor-pointer"
              >
                Explore Roadmaps
              </Link>
            </div>

            {/* Minimalist Proof Line */}
            <div className="flex items-center gap-5 sm:gap-7 pt-2 text-xs text-slate-500 dark:text-neutral-400 font-medium">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                <span>100% Free Forever</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>No Ads or Noise</span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span>LeetCode & DSA Sync</span>
              </div>
            </div>
          </div>

          {/* Right Column: Mac Window Preview fitted into current window */}
          <div className="lg:col-span-7 xl:col-span-7 w-full flex justify-center">
            <HeroProductPreview />
          </div>
        </div>

        {/* 3 Minimal Pillars (Uncluttered, responsive to theme) */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-slate-200 dark:border-white/10 grid grid-cols-1 md:grid-cols-3 gap-5 text-left">
          <div className="p-4 sm:p-5 rounded-2xl bg-white/70 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/5 hover:border-red-500/20 transition-colors shadow-xs">
            <div className="w-8 h-8 rounded-xl bg-red-500/10 border border-red-500/20 text-[#E04D4D] flex items-center justify-center mb-2.5">
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
              Distraction-Free Player
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Curated playlist queues without algorithm feeds, autoplay traps, or comment distractions.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white/70 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/5 hover:border-red-500/20 transition-colors shadow-xs">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center mb-2.5">
              <FileCode2 className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
              Timestamped Notes Hub
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Pin code snippets and takeaways to exact video timestamps for instant revision.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white/70 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/5 hover:border-red-500/20 transition-colors shadow-xs">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center mb-2.5">
              <CalendarCheck2 className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
              AI Roadmaps & Heatmap
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Generate tailored day-by-day curriculums and visualize your real LeetCode consistency.
            </p>
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="relative z-10 border-t border-slate-200 dark:border-white/5 py-5 text-center text-xs text-slate-500 dark:text-neutral-500 select-none">
        <span>© 2026 WatchFlow · Built for focused learning ✦</span>
      </footer>
    </div>
  );
}
