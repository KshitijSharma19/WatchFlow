import { Menu, ArrowLeft, Sun, Moon } from "lucide-react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

export default function TopBar({ title, showBack = false, onMenuClick }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <header className="flex items-center justify-between px-4 md:px-6 py-4 shrink-0 relative z-20">
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
            to="/sheets"
            className="px-3 py-1.5 rounded-lg transition text-slate-700 hover:text-slate-900 dark:text-neutral-200 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 font-medium"
          >
            Practice Sheets
          </Link>
          <Link
            to="/dashboard"
            className="px-3 py-1.5 rounded-lg transition text-slate-700 hover:text-slate-900 dark:text-neutral-200 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 font-medium"
          >
            Dashboard
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme mode"
          title={`Switch to ${isDark ? "light" : "dark"} mode`}
          className="p-2 rounded-lg text-slate-600 hover:text-slate-900 bg-white/80 hover:bg-slate-100 dark:bg-transparent dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-900 transition border border-slate-200 dark:border-neutral-800/60 shadow-xs dark:shadow-none cursor-pointer"
        >
          {isDark ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-slate-700" />
          )}
        </button>

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
