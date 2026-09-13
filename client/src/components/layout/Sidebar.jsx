import { useEffect } from "react";
import { Home, ListMusic, Settings, X, Play, FolderOpen } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
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

  navItems.push({
    name: "Settings",
    icon: Settings,
    path: "/settings",
  });

  const isItemActive = (item) => {
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
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 flex flex-col justify-between p-6 border-r border-neutral-950/60 bg-neutral-950/40 backdrop-blur-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="space-y-8">
          <div className="flex items-center justify-between px-2">
            <span className="text-sm font-bold tracking-wider text-neutral-400 uppercase">
              Navigation
            </span>

            <button
              onClick={closeSidebar}
              aria-label="Close sidebar"
              className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
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
                      ? "bg-gradient-to-r from-red-600/20 to-red-900/10 border border-red-500/30 text-red-400 shadow-lg shadow-red-950/50"
                      : "text-neutral-400 hover:text-red-300 hover:bg-red-950/20"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      active ? "text-red-500" : ""
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
