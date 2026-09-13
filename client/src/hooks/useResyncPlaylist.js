import { useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

export default function useResyncPlaylist(onResynced) {
  const [showResyncModal, setShowResyncModal] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [syncing, setSyncing] = useState(false);

  const handleResync = (playlistId) => {
    setSelectedPlaylist(playlistId);
    setShowResyncModal(true);
  };

  const confirmResync = async () => {
    if (!selectedPlaylist) return;

    try {
      setSyncing(true);

      const res = await api.post(`/playlists/${selectedPlaylist}/resync`);

      await onResynced?.(selectedPlaylist);

      const { addedVideos } = res.data;

      if (addedVideos === 0) {
        toast.success("Playlist is already up to date.");
      } else if (addedVideos === 1) {
        toast.success("1 new video added.");
      } else {
        toast.success(`${addedVideos} new videos added.`);
      }

      closeModal();
    } catch (error) {
      console.error("[Resync Playlist]", error.message);

      toast.error(
        error.response?.data?.message ?? "Failed to resync playlist.",
      );
    } finally {
      setSyncing(false);
    }
  };

  const closeModal = () => {
    if (syncing) return;

    setShowResyncModal(false);
    setSelectedPlaylist(null);
  };

  return {
    syncing,
    showResyncModal,
    handleResync,
    confirmResync,
    closeModal,
  };
}
