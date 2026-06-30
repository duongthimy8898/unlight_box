import { MediaPlayer, MediaProvider } from "@vidstack/react";

import { DefaultVideoLayout, defaultLayoutIcons } from "@vidstack/react/player/layouts/default";

import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";

type Props = {
  src: string;
  poster?: string;
};

export default function Player({ src, poster }: Props) {
  return (
    <MediaPlayer
      src={{
        src,
        type: "application/x-mpegurl",
      }}
      poster={poster}
      posterLoad="visible"
      playsInline
      autoPlay={false}
      streamType="unknown"
      controls={false} // 👈 QUAN TRỌNG
      className="flex!"
    >
      <MediaProvider />
      <DefaultVideoLayout icons={defaultLayoutIcons} />
    </MediaPlayer>
  );
}
