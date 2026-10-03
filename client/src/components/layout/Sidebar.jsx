import { useEffect } from "react";
import { Home, ListMusic, Settings, X, Play, FolderOpen, Code2, Compass, BookOpen } from "lucide-react";
import { NavLink, useLocation, Link } from "react-router-dom";
import {
  getRecentPlaylist,
  getRecentPlayer,
} from "../../utils/recentNavigation.js";

export default function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation();

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const recentPlaylist = getRecentPlaylist();
  const recentPlayer = getRecentPlayer();

  const navItems = [
    {
      name: "Dashboard",
      icon: Home,
      path: "/dashboard",
    },
    {
      name: "Notes Hub",
      icon: BookOpen,
      path: "/notes",
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
    if (item.name === "Notes Hub") {
      return location.pathname.startsWith("/notes");
    }

    if (item.name === "Practice Sheets") {
      return location.pathname.startsWith("/sheets");
    }

    if (item.name === "Roadmap") {
      return location.pathname.startsWith("/roadmap");
    }

    if (item.name === "Player") {
      return location.pathname.includes("/video/");
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
        className={`fixed inset-y-0 left-0 z-50 w-72 sm:w-80 flex flex-col justify-between p-5 sm:p-6 border-r border-slate-200 dark:border-neutral-900 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-2xl transition-transform duration-300 ease-in-out shadow-2xl ${
          isOpen ? "translate-x-0" : "-translate-x-full"
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
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    active
                      ? "bg-red-500/10 dark:bg-red-950/30 border border-red-500/20 dark:border-red-500/30 text-[#E04D4D] dark:text-red-400 shadow-xs dark:shadow-lg dark:shadow-red-950/50"
                      : "text-slate-600 hover:text-[#E04D4D] hover:bg-red-500/5 dark:text-neutral-400 dark:hover:text-red-300 dark:hover:bg-red-950/20"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      active
                        ? "text-red-600 dark:text-red-500"
                        : "text-slate-500 dark:text-neutral-400"
                    }`}
                  />

                  {item.name}
                </NavLink>
              );
            })}
          </div>
        </div>
      </aside>
    </>
  );
}
