import { useState, useEffect, useRef } from "react";
import {
  Menu,
  ArrowLeft,
  Sun,
  Moon,
  ChevronDown,
  Settings,
  MessageSquare,
  LogOut,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";

export default function TopBar({ title, showBack = false, onMenuClick }) {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const { user, token, logout, isAuthenticated } = useAuth();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const closeTimeoutRef = useRef(null);
  const dropdownRef = useRef(null);

  // User details dynamically sourced from authenticated session
  const displayName = user?.name || user?.username || (isAuthenticated ? "User" : "");
  const displayEmail = user?.email || "";
  const initial = (displayName[0] || "U").toUpperCase();

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
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

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <header className="flex items-center justify-between px-4 md:px-6 py-4 shrink-0 relative z-30">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-900 transition cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>

        <Link to="/" className="flex items-center gap-2.5 group">
          <img
            src="/watchflow-logo.png"
            alt="WatchFlow Logo"
            className="h-6 sm:h-7 w-auto object-contain transition-transform group-hover:scale-105"
          />
          <span className="text-base sm:text-lg font-bold tracking-tight select-none">
            <span className="text-slate-900 dark:text-white">Watch</span>
            <span className="text-[#E04D4D]">Flow</span>
          </span>
        </Link>

        {/* Quick Nav Links */}
        <nav className="hidden md:flex items-center gap-1.5 ml-4 pl-4 border-l border-slate-200 dark:border-neutral-800 text-xs font-medium">
          <Link
            to="/learning"
            className="px-3 py-1.5 rounded-lg transition text-slate-700 hover:text-slate-900 dark:text-neutral-200 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 font-medium"
          >
            Learning
          </Link>
          <Link
            to="/sheets"
            className="px-3 py-1.5 rounded-lg transition text-slate-700 hover:text-slate-900 dark:text-neutral-200 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 font-medium"
          >
            Practice Sheets
          </Link>
          <Link
            to="/roadmap"
            className="px-3 py-1.5 rounded-lg transition text-slate-700 hover:text-slate-900 dark:text-neutral-200 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 font-medium"
          >
            Roadmap
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Dark / Light Theme Toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme mode"
          title={`Switch to ${isDark ? "light" : "dark"} mode`}
          className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-900 transition cursor-pointer"
        >
          {isDark ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-slate-700" />
          )}
        </button>

        {/* Profile Pill & Dropdown or Sign In */}
        {!isAuthenticated && !user ? (
          <Link
            to="/login"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/90 hover:bg-slate-100 dark:hover:bg-neutral-800 text-xs sm:text-sm font-medium text-slate-800 dark:text-neutral-200 transition"
          >
            Sign in
          </Link>
        ) : (
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              aria-label="User Profile Menu"
              aria-expanded={isDropdownOpen}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-neutral-800 bg-white/90 dark:bg-[#151518] hover:bg-slate-100 dark:hover:bg-neutral-800/80 transition cursor-pointer select-none"
            >
              {/* Initial Avatar Box */}
              <div className="w-7 h-7 rounded-lg bg-amber-100 dark:bg-[#3d2014] flex items-center justify-center text-amber-800 dark:text-[#f59e0b] font-bold text-xs shadow-xs border border-amber-200 dark:border-amber-800/40">
                {initial}
              </div>

              {/* Display Name */}
              <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-neutral-200 max-w-[100px] sm:max-w-[140px] truncate">
                {displayName}
              </span>

              {/* Downward Chevron */}
              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-400 dark:text-neutral-400 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""
                  }`}
              />
            </button>

            {/* Hover / Click Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 sm:w-60 rounded-2xl bg-white dark:bg-[#121214] border border-slate-200 dark:border-neutral-800 shadow-2xl p-3.5 text-left z-50 animate-in fade-in zoom-in-95 duration-150">
                {/* User Header */}
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

                {/* Dropdown Menu Items */}
                <div className="pt-2 space-y-1">
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
        )}

        {showBack && (
          <button
            onClick={handleBack}
            aria-label="Go back"
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-300 hover:bg-red-500/20 transition text-xs sm:text-sm font-medium cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        )}
      </div>
    </header>
  );
}
