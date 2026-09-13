const axios = require("axios");

const BASE_URL = "https://www.googleapis.com/youtube/v3";

// Simple in-memory cache to prevent redundant YouTube API quota consumption
const cache = new Map();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

function getCached(key) {
  const item = cache.get(key);
  if (item && Date.now() - item.timestamp < CACHE_TTL_MS) {
    return item.data;
  }
  cache.delete(key);
  return null;
}

function setCache(key, data) {
  cache.set(key, { timestamp: Date.now(), data });
}

function getApiKey() {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    throw new Error("YOUTUBE_API_KEY environment variable is not configured.");
  }
  return apiKey;
}

exports.extractPlaylistId = (url) => {
  if (!url || typeof url !== "string") return null;
  const trimmed = url.trim();

  // If passed directly as ID
  if (!trimmed.includes("http") && !trimmed.includes("youtube.com")) {
    return trimmed;
  }

  const regExp = /[&?]list=([^&]+)/;
  const match = trimmed.match(regExp);

  return match && match[1] ? match[1] : null;
};

exports.fetchPlaylistMetadata = async (playlistId) => {
  const cacheKey = `metadata_${playlistId}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const apiKey = getApiKey();
  const url = `${BASE_URL}/playlists?part=snippet,contentDetails&id=${playlistId}&key=${apiKey}`;

  try {
    const response = await axios.get(url);

    if (!response.data.items || response.data.items.length === 0) {
      throw new Error("PLAYLIST_NOT_FOUND");
    }

    const item = response.data.items[0];
    const data = {
      title: item.snippet.title,
      description: item.snippet.description,
      channelTitle: item.snippet.channelTitle,
      thumbnailUrl:
        item.snippet.thumbnails?.medium?.url ||
        item.snippet.thumbnails?.high?.url ||
        item.snippet.thumbnails?.default?.url ||
        "",
      totalVideos: item.contentDetails?.itemCount || 0,
    };

    setCache(cacheKey, data);
    return data;
  } catch (error) {
    if (error.message === "PLAYLIST_NOT_FOUND") throw error;
    if (error.response?.data?.error) {
      const errReason = error.response.data.error.errors?.[0]?.reason;
      if (errReason === "quotaExceeded") {
        throw new Error("YOUTUBE_QUOTA_EXCEEDED");
      }
      if (errReason === "keyInvalid") {
        throw new Error("YOUTUBE_KEY_INVALID");
      }
      throw new Error(error.response.data.error.message || "YOUTUBE_API_ERROR");
    }
    throw error;
  }
};

exports.fetchAllPlaylistVideos = async (playlistId) => {
  const cacheKey = `videos_${playlistId}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const apiKey = getApiKey();
  let videosArray = [];
  let nextPageToken = "";
  let hasNextPage = true;

  try {
    while (hasNextPage) {
      const pageParam = nextPageToken ? `&pageToken=${nextPageToken}` : "";
      const url = `${BASE_URL}/playlistItems?part=snippet,contentDetails&maxResults=50&playlistId=${playlistId}&key=${apiKey}${pageParam}`;

      const response = await axios.get(url);

      if (response.data.items && response.data.items.length > 0) {
        // Filter out deleted / private videos cleanly
        const validItems = response.data.items.filter((item) => {
          const title = item.snippet?.title;
          const videoId = item.snippet?.resourceId?.videoId;
          return (
            videoId &&
            title !== "Private video" &&
            title !== "Deleted video"
          );
        });
        videosArray.push(...validItems);
      }

      if (response.data.nextPageToken) {
        nextPageToken = response.data.nextPageToken;
      } else {
        hasNextPage = false;
      }
    }

    setCache(cacheKey, videosArray);
    return videosArray;
  } catch (error) {
    if (error.response?.data?.error) {
      const errReason = error.response.data.error.errors?.[0]?.reason;
      if (errReason === "quotaExceeded") {
        throw new Error("YOUTUBE_QUOTA_EXCEEDED");
      }
      throw new Error(error.response.data.error.message || "YOUTUBE_API_ERROR");
    }
    throw error;
  }
};

exports.fetchVideoDurations = async (videoIds) => {
  if (!videoIds || videoIds.length === 0) {
    return [];
  }

  const apiKey = getApiKey();
  let allVideoItems = [];

  for (let i = 0; i < videoIds.length; i += 50) {
    const chunk = videoIds.slice(i, i + 50);
    const ids = chunk.join(",");

    const url = `${BASE_URL}/videos?part=contentDetails,snippet&id=${ids}&key=${apiKey}`;
    try {
      const response = await axios.get(url);
      if (response.data.items) {
        allVideoItems.push(...response.data.items);
      }
    } catch (error) {
      console.error("[YouTube Duration Fetch Error]", error.message);
    }
  }

  return allVideoItems;
};

exports.convertDurationToSeconds = (duration) => {
  if (!duration || typeof duration !== "string") return 0;
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;

  const hours = parseInt(match[1] || 0, 10);
  const minutes = parseInt(match[2] || 0, 10);
  const seconds = parseInt(match[3] || 0, 10);

  return hours * 3600 + minutes * 60 + seconds;
};
