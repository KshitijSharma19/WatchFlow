import { useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

export default function useDeletePlaylist(onDeleted) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = (playlistId) => {
    setSelectedPlaylist(playlistId);
    setShowDeleteModal(true);
  };

  const closeModal = () => {
    if (deleting) return;
    setShowDeleteModal(false);
    setSelectedPlaylist(null);
  };

  const confirmDelete = async () => {
    if (!selectedPlaylist) return;

    try {
      setDeleting(true);
      await api.delete(`/playlists/${selectedPlaylist}`);
      await onDeleted?.(selectedPlaylist);

      setShowDeleteModal(false);
      setSelectedPlaylist(null);
      toast.success("Playlist deleted successfully.");
    } catch (error) {
      console.error("[Delete Playlist]", error.message);
      toast.error(
        error.response?.data?.message ?? "Failed to delete playlist.",
      );
    } finally {
      setDeleting(false);
    }
  };

  return {
    deleting,
    showDeleteModal,
    handleDelete, 
    confirmDelete,
    closeModal,
  };
}
