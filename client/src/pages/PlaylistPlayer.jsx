import { useEffect, useState, useMemo, useCallback } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import PlayerShell from "../components/layout/PlayerShell";
import api from "../api/axios";
import NotesModal from "../components/modals/NotesModal";
import Loader from "../components/common/Loader";
import VideoPlayer from "../components/playlist/VideoPlayer";
import PlayerInfoCard from "../components/playlist/PlayerInfoCard";
import QueueVideoCard from "../components/playlist/QueueVideoCard";
import {
  saveRecentPlayer,
  saveRecentPlaylist,
} from "../utils/recentNavigation";

export default function PlaylistPlayer() {
  const { playlistId, videoId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const startTime = useMemo(
    () => Number(searchParams.get("start") || 0),
    [searchParams],
  );

  const [playlist, setPlaylist] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNotes, setShowNotes] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [player, setPlayer] = useState(null);

  const currentVideo = useMemo(() => {
    return videos.find((video) => video._id === videoId) || videos[0];
  }, [videos, videoId]);

  useEffect(() => {
    if (!playlist || !currentVideo) return;

    saveRecentPlaylist(playlist);
    saveRecentPlayer(playlist._id, currentVideo);
  }, [playlist, currentVideo]);

  const currentIndex = useMemo(() => {
    return videos.findIndex((v) => v._id === currentVideo?._id);
  }, [videos, currentVideo]);

  const fetchPlaylist = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get(`/playlists/${playlistId}`);
      setPlaylist(res.data.playlist);
      setVideos(res.data.videos || []);
    } catch (error) {
      console.error(
        "[PlaylistPlayer] Fetch Playlist Error:",
        error.message || error,
      );
    } finally {
      setLoading(false);
    }
  }, [playlistId]);

  useEffect(() => {
    const init = async () => {
      await fetchPlaylist();
    };
    init();
  }, [fetchPlaylist]);

  const saveProgress = useCallback(async () => {
    if (!player || !currentVideo) return;

    try {
      const watchedSeconds = Math.floor(player.getCurrentTime());

      await api.patch(`/videos/${currentVideo._id}/progress`, {
        watchedSeconds,
      });

      const progressPercent = Math.min(
        100,
        Math.round((watchedSeconds / currentVideo.durationInSeconds) * 100),
      );

      setVideos((prev) =>
        prev.map((video) =>
          video._id === currentVideo._id
            ? {
                ...video,
                watchedSeconds,
                progressPercent,
                completed: progressPercent >= 95,
              }
            : video,
        ),
      );
    } catch (error) {
      console.error(
        "[PlaylistPlayer] Save Progress Error:",
        error.message || error,
      );
    }
  }, [player, currentVideo]);

  useEffect(() => {
    if (!player) return;

    const interval = setInterval(saveProgress, 10000);
    return () => clearInterval(interval);
  }, [player, saveProgress]);

  const handleVideoSelect = useCallback(
    (targetVideoId) => {
      navigate(`/playlist/${playlistId}/video/${targetVideoId}`);
    },
    [navigate, playlistId],
  );

  const handleNotesOpen = useCallback((video) => {
    setSelectedVideo(video);
    setShowNotes(true);
  }, []);

  const handleNotesClose = useCallback(() => {
    setShowNotes(false);
    setSelectedVideo(null);
  }, []);

  const handlePlayerReady = useCallback((ytPlayerInstance) => {
    setPlayer(ytPlayerInstance);
  }, []);

  if (loading) {
    return (
      <Loader
        text="Loading Player..."
        subtitle="Getting everything ready."
        fullscreen
      />
    );
  }

  return (
    <PlayerShell showBack title={currentVideo?.title || "Now Playing"}>
      {/* Full width wrapper, centered via mx-auto, items-center ensures exact middle alignment */}
      <div className="w-full max-w-[1500px] mx-auto flex-1 flex flex-col items-center px-3 sm:px-6 pb-6 min-h-0 font-sans">
        <div className="flex flex-col lg:flex-row gap-6 w-full flex-1 min-h-0 justify-center">
          {/* LEFT COLUMN: Video Player & Info */}
          <div className="w-full flex-1 min-w-0 flex flex-col space-y-4 lg:overflow-y-auto lg:pr-2">
            <div className="w-full aspect-video rounded-xl overflow-hidden bg-black shrink-0">
              <VideoPlayer
                videoId={currentVideo?.ytVideoId}
                startTime={startTime}
                onPlayerReady={handlePlayerReady}
              />
            </div>

            {currentVideo && (
              <div className="w-full">
                <PlayerInfoCard
                  currentVideo={currentVideo}
                  currentIndex={currentIndex}
                  totalVideos={videos.length}
                  onNotesClick={handleNotesOpen}
                />
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Queue */}
          <aside className="w-full lg:w-[380px] xl:w-[420px] shrink-0 border border-neutral-800/80 bg-neutral-950/90 rounded-xl overflow-hidden flex flex-col lg:min-h-0 shadow-xl">
            <div className="px-4 py-3.5 bg-neutral-900/50 border-b border-neutral-800 shrink-0">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-neutral-100">
                  Playlist Queue
                </h2>
                <span className="text-[10px] font-mono text-neutral-500">
                  {currentIndex + 1} / {videos.length}
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5 truncate">
                {playlist?.title}
              </p>
            </div>

            <div className="lg:flex-1 lg:overflow-y-auto p-2 space-y-1.5">
              {videos.map((video, index) => (
                <QueueVideoCard
                  key={video._id}
                  video={video}
                  index={index}
                  isActive={video._id === currentVideo?._id}
                  onVideoSelect={handleVideoSelect}
                  onNotesClick={handleNotesOpen}
                />
              ))}
            </div>
          </aside>
        </div>
      </div>

      <NotesModal
        isOpen={showNotes}
        video={selectedVideo || currentVideo}
        player={player}
        onClose={handleNotesClose}
        onSeekTimestamp={(seconds) => {
          if (player && typeof player.seekTo === "function") {
            player.seekTo(seconds, true);
          }
        }}
        onNotesSaved={(updatedVideo) =>
          setVideos((prev) =>
            prev.map((v) => (v._id === updatedVideo._id ? updatedVideo : v)),
          )
        }
      />
    </PlayerShell>
  );
}
