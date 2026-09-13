import { useEffect, useState, useCallback } from "react";
import { ListMusic, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AppShell from "../components/layout/AppShell";
import PlaylistCard from "../components/playlist/PlaylistCard";
import api from "../api/axios";
import CreatePlaylistModal from "../components/modals/CreatePlaylistModal";
import ConfirmModal from "../components/modals/ConfirmModal";
import useDeletePlaylist from "../hooks/useDeletePlaylist";
import useResyncPlaylist from "../hooks/useResyncPlaylist";
import useImportPlaylist from "../hooks/useImportPlaylist";
import Loader from "../components/common/Loader";
import EmptyState from "../components/common/EmptyState";

export default function Library() {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchPlaylists = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get("/playlists");
      setPlaylists(res.data.playlists || []);
    } catch (err) {
      console.error("[Library] Fetch Playlists Error:", err?.message || err);
    } finally {
      setLoading(false);
    }
  }, []);

  const {
    syncing,
    showResyncModal,
    handleResync,
    confirmResync,
    closeModal: closeResyncModal,
  } = useResyncPlaylist(useCallback(() => fetchPlaylists(), [fetchPlaylists]));

  const {
    importing,
    showModal,
    openModal,
    closeModal: closeImportModal,
    handleImport,
  } = useImportPlaylist(
    useCallback(() => fetchPlaylists(), [fetchPlaylists]),
    "/library",
  );

  const { deleting, showDeleteModal, handleDelete, confirmDelete, closeModal } =
    useDeletePlaylist(useCallback(() => fetchPlaylists(), [fetchPlaylists]));

  useEffect(() => {
    const initFetch = async () => {
      await fetchPlaylists();
    };
    initFetch();
  }, [fetchPlaylists]);

  const hasPlaylists = playlists.length > 0;
  const playlistCount = playlists.length;

  if (loading) {
    return (
      <Loader
        text="Loading Library..."
        subtitle="Fetching your playlists."
        fullscreen
      />
    );
  }

  return (
    <AppShell title="My Library">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Library</h1>

            <p className="text-neutral-400 mt-2 text-sm">
              {playlistCount} {playlistCount === 1 ? "playlist" : "playlists"}{" "}
              in your learning collection
            </p>
          </div>

          <button
            type="button"
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#BA3C3C] to-[#E04D4D] font-medium hover:opacity-90 active:scale-[0.99] transition outline-none focus-visible:ring-2 focus-visible:ring-red-500/30"
            onClick={openModal}
          >
            <Plus className="w-5 h-5" />
            Import Playlist
          </button>
        </div>

        {!hasPlaylists ? (
          <EmptyState
            icon={ListMusic}
            title="Your Library is Empty"
            description="Import your first YouTube playlist and start tracking your learning journey."
            onClick={openModal}
          />
        ) : (
          <div className="space-y-4">
            {playlists.map((playlist) => (
              <PlaylistCard
                key={playlist._id}
                playlist={playlist}
                onClick={() => navigate(`/playlist/${playlist._id}`)}
                onDelete={handleDelete}
                onResync={handleResync}
              />
            ))}
          </div>
        )}
      </div>

      <CreatePlaylistModal
        isOpen={showModal}
        onClose={closeImportModal}
        onImport={handleImport}
        importing={importing}
      />

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
    </AppShell>
  );
}
