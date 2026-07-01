import VideoPlayer from "./video";

export const VideoJS = () => {
  const videoJsOptions = {
    sources: [
      {
        src: "//vjs.zencdn.net/v/oceans.mp4",
        type: "video/mp4",
      },
    ],
  };
  return <VideoPlayer options={videoJsOptions} />;
};
