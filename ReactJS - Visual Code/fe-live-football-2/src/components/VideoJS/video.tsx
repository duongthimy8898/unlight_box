import * as React from "react";
import videojs from "video.js";

// Styles
import "video.js/dist/video-js.css";

interface IVideoPlayerProps {
  options: videojs.PlayerOptions;
}

const initialOptions: videojs.PlayerOptions = {
  controls: true,
  fluid: true,
  controlBar: {
    volumePanel: {
      inline: false
    }
  },
  liveui: true,
  html5: true
};

const VideoPlayer: React.FC<IVideoPlayerProps> = ({ options }) => {
  const videoNode = React.useRef<HTMLVideoElement>(null);
  const player = React.useRef<videojs.Player>(null);

  React.useEffect(() => {
    player.current = videojs(videoNode.current, {
      ...initialOptions,
      ...options
    }).ready(function() {
      // console.log('onPlayerReady', this);
    });
    return () => {
      if (player.current) {
        player.current.dispose();
      }
    };
  }, [options]);

  return <video ref={videoNode} className="video-js vjs-default-skin vjs-16-9" />;
};

export default VideoPlayer;
