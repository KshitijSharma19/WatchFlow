import { useEffect } from "react";
import { ListMusic, Settings, X, Play, FolderOpen, Code2, Compass, BookOpen, MessageSquare } from "lucide-react";
import { NavLink, useLocation, Link } from "react-router-dom";
import {
  getRecentPlaylist,
  getRecentPlayer,
} from "../../utils/recentNavigation.js";

const YoutubeIcon = ({ className = "w-4 h-4", ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <rect width="20" height="15" x="2" y="4.5" rx="4" />
    <polygon points="10 9 15 12 10 15 10 9" />
  </svg>
);

export default function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation();

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const recentPlaylist = getRecentPlaylist();
  const recentPlayer = getRecentPlayer();

  const navItems = [
    {
      name: "Learning",
      icon: YoutubeIcon,
      path: "/learning",
    },
    {
      name: "Practice Sheets",
      icon: Code2,
      path: "/sheets",
    },
    {
      name: "Roadmap",
      icon: Compass,
      path: "/roadmap",
    },
    {
      name: "Notes Hub",
      icon: BookOpen,
      path: "/notes",
    },
  ];

  if (recentPlayer) {
    navItems.push({
      name: "Player",
      icon: Play,
      path: `/playlist/${recentPlayer.playlistId}/video/${recentPlayer.videoId}`,
    });
  }

  navItems.push({
    name: "Library",
    icon: ListMusic,
    path: "/library",
  });

  if (recentPlaylist) {
    navItems.push({
      name: "Playlist",
      icon: FolderOpen,
      path: `/playlist/${recentPlaylist.id}`,
    });
  }

  const isItemActive = (item) => {
    if (item.name === "Learning") {
      return location.pathname === "/learning" || location.pathname === "/dashboard";
    }

    if (item.name === "Practice Sheets") {
      return location.pathname.startsWith("/sheets");
    }

    if (item.name === "Roadmap") {
      return location.pathname.startsWith("/roadmap");
    }

    if (item.name === "Notes Hub") {
      return location.pathname.startsWith("/notes");
    }

    if (item.name === "Player") {
      return location.pathname.includes("/video/");
    }

    if (item.name === "Library") {
      return location.pathname.startsWith("/library");
    }

    if (item.name === "Playlist") {
      return location.pathname === item.path;
    }

    return location.pathname === item.path;
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, setIsOpen]);

  return (
    <>
      {isOpen && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-40 bg-black/40 dark:bg-black/60 backdrop-blur-xs"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 sm:w-80 flex flex-col justify-between p-5 sm:p-6 border-r border-slate-200 dark:border-neutral-900 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-2xl transition-transform duration-300 ease-in-out shadow-2xl ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-neutral-800/70">
            <Link
              to="/"
              onClick={closeSidebar}
              className="flex items-center group"
            >
              <img
                src="/watchflow-logo.png"
                alt="WatchFlow Logo"
                className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </Link>

            <button
              onClick={closeSidebar}
              aria-label="Close navigation menu"
              className="p-1 text-slate-500 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white rounded-md hover:bg-slate-100 dark:hover:bg-neutral-800/60 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5 stroke-[2]" />
            </button>
          </div>

          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isItemActive(item);

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={closeSidebar}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${active
                      ? "bg-red-500/10 dark:bg-red-950/30 border border-red-500/20 dark:border-red-500/30 text-slate-900 dark:text-white font-semibold shadow-xs dark:shadow-lg dark:shadow-red-950/50"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-900/60"
                    }`}
                >
                  <Icon
                    className={`w-4 h-4 transition-colors ${active
                        ? "text-slate-900 dark:text-white"
                        : "text-slate-500 dark:text-neutral-400"
                      }`}
                  />

                  {item.name}
                </NavLink>
              );
            })}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 dark:border-neutral-800/70 space-y-1">
          <NavLink
            to="/settings"
            onClick={closeSidebar}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
              location.pathname === "/settings"
                ? "bg-red-500/10 dark:bg-red-950/30 border border-red-500/20 dark:border-red-500/30 text-slate-900 dark:text-white font-semibold"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-900/60"
            }`}
          >
            <Settings className="w-4 h-4 text-slate-500 dark:text-neutral-400" />
            Settings
          </NavLink>

          <NavLink
            to="/feedback"
            onClick={closeSidebar}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
              location.pathname === "/feedback"
                ? "bg-red-500/10 dark:bg-red-950/30 border border-red-500/20 dark:border-red-500/30 text-slate-900 dark:text-white font-semibold"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-900/60"
            }`}
          >
            <MessageSquare className="w-4 h-4 text-slate-500 dark:text-neutral-400" />
            Feedback
          </NavLink>
        </div>
      </aside>
    </>
  );
}
