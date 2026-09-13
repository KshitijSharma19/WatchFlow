import { useState, useEffect, useMemo, useCallback } from "react";
import { ListMusic, Tv, CheckCircle2 } from "lucide-react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import AppShell from "../components/layout/AppShell";
import PlaylistCard from "../components/playlist/PlaylistCard";
import useDeletePlaylist from "../hooks/useDeletePlaylist";
import useResyncPlaylist from "../hooks/useResyncPlaylist";
import ConfirmModal from "../components/modals/ConfirmModal";
import Loader from "../components/common/Loader";
import EmptyState from "../components/common/EmptyState";
import CreatePlaylistModal from "../components/modals/CreatePlaylistModal";
import useImportPlaylist from "../hooks/useImportPlaylist";
import formatTime from "../utils/formatTime";
import Heatmap from "../components/playlist/Heatmap";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [streakData, setStreakData] = useState(null);
  const [continueData, setContinueData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // 1. Declare data fetch handler
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const [dashboardRes, streakRes, continueRes] = await Promise.allSettled([
        api.get("/dashboard"),
        api.get("/streak"),
        api.get("/dashboard/continue"),
      ]);

      if (dashboardRes.status === "fulfilled") {
        setDashboardData(dashboardRes.value.data);
      } else {
        throw new Error("Core dashboard data rejected");
      }

      if (streakRes.status === "fulfilled") {
        setStreakData(streakRes.value.data);
      }

      if (continueRes.status === "fulfilled") {
        setContinueData(continueRes.value.data);
      } else {
        setContinueData(null);
      }

      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  }, []);

  // 2. Safely synchronize data mounting frame asynchronously
  useEffect(() => {
    const init = async () => {
      await fetchData();
    };
    init();
  }, [fetchData]);

  //Register custom action hooks using wrapped callbacks to preserve memoization boundaries
  const { deleting, showDeleteModal, handleDelete, confirmDelete, closeModal } =
    useDeletePlaylist(useCallback(() => fetchData(), [fetchData]));

  const {
    syncing,
    showResyncModal,
    handleResync,
    confirmResync,
    closeModal: closeResyncModal,
  } = useResyncPlaylist(useCallback(() => fetchData(), [fetchData]));

  const {
    importing,
    showModal,
    openModal,
    closeModal: closeImportModal,
    handleImport,
  } = useImportPlaylist(
    useCallback(() => fetchData(), [fetchData]),
    "/library",
  );

  const stats = useMemo(() => {
    if (!dashboardData?.stats) return [];

    return [
      {
        title: "Total Playlists",
        value: dashboardData.stats.totalPlaylists,
        icon: ListMusic,
        color: "text-red-400",
      },
      {
        title: "Total Videos",
        value: dashboardData.stats.totalVideos,
        icon: Tv,
        color: "text-neutral-300",
      },
      {
        title: "Completed Videos",
        value: dashboardData.stats.completedVideos,
        icon: CheckCircle2,
        color: "text-emerald-400",
      },
    ];
  }, [dashboardData]);

  if (loading) {
    return (
      <Loader
        text="Loading Dashboard..."
        subtitle="Preparing your learning insights."
        fullscreen
      />
    );
  }

  if (error) {
    return (
      <AppShell title="Dashboard" showBack={false}>
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
          <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 mb-4">
            ⚠️
          </div>
          <h2 className="text-lg font-bold text-neutral-100 mb-2">
            Failed to load dashboard
          </h2>
          <p className="text-xs text-neutral-400 max-w-sm mb-6">
            We couldn't connect to the WatchFlow API server or fetch your learning data. Please check your network or try again.
          </p>
          <button
            type="button"
            onClick={fetchData}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#BA3C3C] to-[#E04D4D] text-xs font-semibold text-white hover:opacity-90 transition cursor-pointer"
          >
            Try Again
          </button>
        </div>
      </AppShell>
    );
  }

  const recentPlaylists = dashboardData?.recentPlaylists || [];
  const hasPlaylists = (dashboardData?.stats?.totalPlaylists ?? 0) > 0;

  return (
    <AppShell title="Dashboard" showBack={false}>
      {!hasPlaylists ? (
        <EmptyState
          icon={ListMusic}
          title="Welcome to WatchFlow"
          description="Import your first YouTube playlist to unlock progress tracking, notes, streaks, analytics, and distraction-free learning."
          buttonText="Import Playlist"
          onClick={openModal}
        />
      ) : (
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-5 pb-6">
          {/* Stats */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className="bg-neutral-900/40 border border-neutral-800/60 p-4 rounded-xl backdrop-blur-md flex items-center justify-between"
                >
                  <div>
                    <p className="text-[10px] font-medium text-neutral-400 uppercase tracking-wider">
                      {stat.title}
                    </p>

                    <p className="text-2xl font-bold mt-1 text-gray-100">
                      {stat.value}
                    </p>
                  </div>

                  <div
                    className={`w-9 h-9 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-center ${stat.color}`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
              );
            })}

            {streakData && (
              <div className="bg-gradient-to-br from-[#BA3C3C]/15 to-neutral-900 border border-red-500/15 rounded-xl p-4 backdrop-blur-md flex flex-col justify-between">
                <div>
                  <p className="text-[10px] text-neutral-400 uppercase tracking-wider">
                    Current Streak
                  </p>

                  <h2 className="text-2xl font-bold mt-1 flex items-center gap-1">
                    {streakData.currentStreak}
                    <span className="text-xl">🔥</span>
                  </h2>
                </div>

                <p className="text-[10px] text-neutral-500 mt-1">
                  Longest streak: {streakData.longestStreak} days
                </p>
              </div>
            )}
          </section>

          {/* Heatmap + Continue Learning */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
            {streakData && <Heatmap heatmap={streakData.heatmap} />}

            <div className="bg-neutral-900/30 border border-neutral-800 rounded-xl p-5">
              <p className="text-xs uppercase tracking-wider text-neutral-400 mb-4">
                Continue Learning
              </p>

              {continueData ? (
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="w-full sm:w-44 aspect-video rounded-xl overflow-hidden shrink-0 bg-neutral-900">
                    <img
                      src={continueData.video.thumbnailUrl}
                      alt={continueData.video.title}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500&auto=format&fit=crop&q=60";
                      }}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      <h2 className="text-lg font-bold">
                        {continueData.playlist.title}
                      </h2>

                      <p className="text-red-400 text-sm mt-2">
                        ▶ {continueData.video.title}
                      </p>

                      <p className="text-xs text-neutral-500 mt-2">
                        Resume at{" "}
                        {formatTime(continueData.video.watchedSeconds)}
                      </p>
                    </div>

                    <div className="mt-4">
                      <div className="h-1.5 rounded-full bg-neutral-800 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#BA3C3C] to-[#E04D4D]"
                          style={{
                            width: `${continueData.video.progressPercent}%`,
                          }}
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          navigate(
                            `/playlist/${continueData.playlist._id}/video/${continueData.video._id}?start=${continueData.video.watchedSeconds}`,
                          )
                        }
                        className="w-full sm:w-fit mt-5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#BA3C3C] to-[#E04D4D] font-semibold hover:opacity-90 transition outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                      >
                        Resume Learning
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-neutral-500 text-sm">
                  Nothing to continue yet.
                </p>
              )}
            </div>
          </section>

          {/* Recent Playlists */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold">Recent Playlists</h2>

              <button
                type="button"
                onClick={() => navigate("/library")}
                className="text-xs text-red-400 hover:text-red-300 transition outline-none focus-visible:underline"
              >
                See All →
              </button>
            </div>

            <div className="space-y-2">
              {recentPlaylists.map((playlist) => (
                <PlaylistCard
                  key={playlist._id}
                  playlist={playlist}
                  onClick={() => navigate(`/playlist/${playlist._id}`)}
                  onDelete={handleDelete}
                  onResync={handleResync}
                />
              ))}
            </div>
          </section>
        </div>
      )}

      {/* Always mounted */}
      <ConfirmModal
        variant="primary"
        isOpen={showResyncModal}
        title="Resync Playlist?"
        message="WatchFlow will check YouTube for newly added videos. Your progress, notes, and completed videos will be preserved."
        loading={syncing}
        loadingText="Syncing..."
        confirmText="Resync Playlist"
        onCancel={closeResyncModal}
        onConfirm={confirmResync}
      />

      <ConfirmModal
        variant="danger"
        isOpen={showDeleteModal}
        title="Delete Playlist?"
        message="This will permanently delete this playlist, all progress, and all notes. This action cannot be undone."
        loading={deleting}
        loadingText="Deleting..."
        confirmText="Delete Playlist"
        onCancel={closeModal}
        onConfirm={confirmDelete}
      />

      <CreatePlaylistModal
        isOpen={showModal}
        onClose={closeImportModal}
        onImport={handleImport}
        importing={importing}
      />
    </AppShell>
  );
}
