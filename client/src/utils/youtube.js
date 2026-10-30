/**
 * Extracts a clean 11-character YouTube video ID from various URL formats or raw ID strings.
 * Supports:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://www.youtube.com/shorts/VIDEO_ID
 * - https://www.youtube.com/live/VIDEO_ID
 * - Raw 11-character video ID
 */
export function extractYouTubeId(urlOrId) {
  if (!urlOrId || typeof urlOrId !== "string") return null;

  const trimmed = urlOrId.trim();
  if (!trimmed) return null;

  // 1. Direct 11-character video ID match
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  // 2. Standard URL formats (watch, embed, shorts, live, youtu.be, etc.)
  const regExp = /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|v\/|shorts\/|live\/|watch\?v=|watch\?.+?&v=))([\w-]{11})/;
  const match = trimmed.match(regExp);
  if (match && match[1]) {
    return match[1];
  }

  // 3. Fallback: URL search params
  try {
    const url = new URL(trimmed.startsWith("http") ? trimmed : `https://${trimmed}`);
    const v = url.searchParams.get("v");
    if (v && /^[a-zA-Z0-9_-]{11}$/.test(v)) {
      return v;
    }
  } catch {
    // Ignore URL parse errors
  }

  return null;
}

