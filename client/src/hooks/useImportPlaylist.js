import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axios";

export default function useImportPlaylist(onImported, navigateTo = "/library") {
  const [showModal, setShowModal] = useState(false);
  const [importing, setImporting] = useState(false);

  const navigate = useNavigate();

  const openModal = () => setShowModal(true);

  const closeModal = () => {
    if (!importing) {
      setShowModal(false);
    }
  };

  const handleImport = async (playlistUrl) => {
    try {
      setImporting(true);

      await api.post("/playlists/sync", {
        playlistUrl: playlistUrl.trim(),
      });

      toast.success("Playlist imported successfully!");

      await onImported?.();

      setShowModal(false);

      if (navigateTo) {
        navigate(navigateTo);
      }
    } catch (error) {
      console.error("[Import Playlist]", error.message);

      toast.error(
        error.response?.data?.message || "Failed to import playlist.",
      );
    } finally {
      setImporting(false);
    }
  };

  return {
    importing,
    showModal,
    openModal,
    closeModal,
    handleImport,
  };
}
