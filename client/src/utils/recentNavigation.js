const PLAYLIST_KEY = "watchflow_recent_playlist";
const PLAYER_KEY = "watchflow_recent_player";

export function saveRecentPlaylist(playlist) {
  if (!playlist) return;

  localStorage.setItem(
    PLAYLIST_KEY,
    JSON.stringify({
      id: playlist._id,
      title: playlist.title,
    }),
  );
}

export function getRecentPlaylist() {
  const data = localStorage.getItem(PLAYLIST_KEY);
  return data ? JSON.parse(data) : null;
}

export function saveRecentPlayer(playlistId, video) {
  if (!video) return;

  localStorage.setItem(
    PLAYER_KEY,
    JSON.stringify({
      playlistId,
      videoId: video._id,
      title: video.title,
    }),
  );
}

export function getRecentPlayer() {
  const data = localStorage.getItem(PLAYER_KEY);
  return data ? JSON.parse(data) : null;
}
