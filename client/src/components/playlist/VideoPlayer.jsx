import { memo } from "react";
import YouTube from "react-youtube";

const VideoPlayer = memo(({ videoId, startTime, onPlayerReady, onStateChange }) => {
  return (
    <div className="w-full aspect-video bg-black border border-neutral-800/60 md:rounded-xl overflow-hidden shadow-2xl shrink-0">
      <YouTube
        key={videoId}
        videoId={videoId}
        opts={{
          width: "100%",
          height: "100%",
          playerVars: {
            autoplay: 1,
            start: startTime,
          },
        }}
        className="w-full h-full"
        onReady={(event) => {
          const ytPlayer = event.target;
          onPlayerReady(ytPlayer);

          if (startTime > 0) {
            ytPlayer.seekTo(startTime, true);
          }
        }}
        onStateChange={onStateChange}
      />
    </div>
  );
});

VideoPlayer.displayName = "VideoPlayer";
export default VideoPlayer;
