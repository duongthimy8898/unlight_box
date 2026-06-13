import { Expand, Shrink } from "lucide-react";
import { RiTelegramFill } from "@remixicon/react";
import clsx from "clsx";
import Hls from "hls.js";
import Artplayer, { type Option, type Quality } from "artplayer";

import { useEffect, useRef } from "react";
import type { Commentator } from "../../../../shared/types/Commentator";
import type { StreamSource } from "../../../../shared/types/StreamSource";
import "./custom-art-player.css";

type Broadcast = {
  commentator: Commentator;
  streams: StreamSource[];
};

type PlayerBoxProps = {
  title: string;
  poster: string;
  status: "READY" | "UPCOMING";
  broadcasts?: Broadcast[];
  startTime?: Date;
};

// function playFlv(this: Artplayer, video: HTMLVideoElement, url: string, art: Artplayer) {
//   const self = art as Artplayer & { flv?: FlvJs.Player };
//   if (FlvJs.isSupported()) {
//     if (self.flv) self.flv.destroy();
//     const flv = FlvJs.createPlayer({ type: "flv", url });
//     flv.attachMediaElement(video);
//     flv.load();
//     self.flv = flv;
//     self.on("destroy", () => flv.destroy());
//   } else {
//     self.notice.show = "Unsupported playback format: flv";
//   }
// }

function playM3u8(this: Artplayer, video: HTMLVideoElement, url: string, art: Artplayer) {
  if (Hls.isSupported()) {
    if (art.hls) (art.hls as Hls).destroy();
    const hls = new Hls();
    hls.loadSource(url);
    hls.attachMedia(video);
    art.hls = hls;
    art.on("destroy", () => hls.destroy());
  } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
    video.src = url;
  } else {
    art.notice.show = "Unsupported playback format: m3u8";
  }
}

const PlayerBox = ({ props, state }: { props: PlayerBoxProps; state: { cleanMode: boolean; handleToggle: () => void } }) => {
  const playerRef = useRef<HTMLDivElement>(null);
  const artRef = useRef<Artplayer | null>(null);
  const source = props.broadcasts?.at(0)?.streams.at(0); // ← tính trực tiếp
  // console.log(source);
  // const broadcasts = ;

  useEffect(() => {
    if (playerRef.current && !artRef.current && props.status === "READY") {
      const quality: Quality[] = (props.broadcasts?.at(0)?.streams ?? []).map((s, idx) => ({
        default: idx === 0,
        html: s.name,
        url: s.sourceUrl ?? "",
      }));
      const option: Option = {
        container: playerRef.current ?? "#player",
        type: /*canPlayFlv() && source?.sourceUrl ? "flv" : */ "m3u8",
        url: /*canPlayFlv() && source?.flv ? source.flv : */ source?.sourceUrl ?? "",
        isLive: true,
        aspectRatio: true,
        pip: true,
        fullscreen: true,
        fullscreenWeb: false,
        setting: false,
        customType: {
          flv: () => {},
          m3u8: playM3u8,
        },
        poster: props.poster,
        quality: quality,
        layers: [
          {
            name: "ad",
            html: `
                      <div id="video-overlay-bottom" style="width:100%;overflow:hidden;position:relative;">
                        <div class="w-full flex justify-center items-center px-1 mb-1 lt:px-2 lt:mb-2">
                          <div class="w-fit flex gap-1">
                             <a href="https://39o8.com/aff/10598"
                                  target="_blank"
                                  class="bg-yellow-500 text-white font-['system-ui'] uppercase font-semibold py-0 px-1 md:py-1 md:px-2 rounded transition-colors text-[8px] md:text-[9px]"
                                >Cược o8</a>
                              <a href="https://39o8.com/aff/10598" target="_blank"
                                  class="bg-red-500 text-white font-['system-ui'] uppercase font-semibold py-0 px-1 md:py-1 md:px-2 rounded transition-colors text-[8px] md:text-[9px]"
                                >
                                  Cược Trận Này
                                  </a>
                          </div>
                        </div>
                      </div>
                    `,
            style: {
              position: "absolute",
              width: "100%",
              bottom: "0",
              zIndex: "20",
              fontFamily: "sans-serif",
            },
            mounted() {
              console.log("Ad layer mounted!");
            },
          },
        ],
        controls: [
          {
            name: "live",
            position: "right", // left | right
            index: 10,
            html: `
                      <div class="flex items-center gap-1 px-2 py-1 bg-red-600 rounded text-white text-xs font-bold">
                        <span class="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                        LIVE
                      </div>
                    `,
            tooltip: "Live stream",
            click() {
              (this.hls as Hls).loadSource(source?.sourceUrl ?? "");
              (this.hls as Hls).startLoad();
              this.play();
            },
          },
        ],
      };
      artRef.current = new Artplayer(option);
    } else {
      if (artRef.current) {
        artRef.current.destroy();
        artRef.current = null;
      }
    }

    return () => {
      console.log("cleanup");
      if (artRef.current) {
        artRef.current.destroy();
        artRef.current = null;
      }
    };
  }, [props.poster, props.broadcasts, props.status, source]);
  return (
    <div className="bg-[#171c27] flex flex-col rounded-md overflow-hidden">
      <div
        className={clsx(
          "flex justify-between items-center py-2 px-2 overflow-hidden gap-2 xl:gap-4",
          // "flex-col items-start xl:flex-row xl:items-center",
        )}
      >
        <div className="flex-1 min-w-0 flex flex-row items-center gap-1">
          <img src={props.broadcasts?.at(0)?.commentator.avatarUrl} alt="" className="w-10 h-10 rounded-full border-2 border-brand" />
          <div className="w-full flex flex-col overflow-hidden">
            <p className="text-md truncate">{props.title}</p>
            <p className="text-xs text-brand">{props.broadcasts?.at(0)?.commentator.nickname}</p>
          </div>
        </div>
        <div className="w-fit shrink-0 flex flex-row gap-2 justify-end">
          <div className="flex flex-row items-center gap-1">
            {/* <a
              href="#!"
              className={clsx(
                "overflow-hidden flex flex-row justify-center items-center",
                "font-bold uppercase tracking-wide text-yellow-200",
                "border-2 border-yellow-500/75",
                "bg-[linear-gradient(135deg,rgba(0,0,0,0.9),rgba(20,20,20,0.75),rgba(212,175,55,0.18),rgba(0,0,0,0.9))]",
                "bg-size-[200%_200%]",
                "shadow-[0_0_20px_rgba(212,175,55,0.18),inset_0_1px_0_rgba(255,215,120,0.25)]",
                "backdrop-blur-md",
                "transition-all duration-300",
                "animate-[goldShine_3.5s_ease_infinite]",
                "hover:border-yellow-500",
                "hover:shadow-[0_0_28px_rgba(212,175,55,0.35),inset_0_1px_0_rgba(255,215,120,0.35)]",
                "active:scale-[0.98]",
                "before:absolute before:inset-0",
                "before:bg-[linear-gradient(120deg,transparent_20%,rgba(255,215,120,0.22)_50%,transparent_80%)]",
                "before:bg-size-[200%_100%]",
                "before:animate-[goldSweep_2.8s_linear_infinite]",
                "before:content-['']",
                "py-1.5 px-4 rounded-full",
              )}
            >
              <span className="relative z-10 text-xs font-semibold">CƯỢC NGAY</span>
            </a> */}
            <a href="https://t.me/addlist/zHdwmR9ngCk4YmI9" target="_blank" className="flex flex-row items-center justify-center gap-1 pr-3 rounded-full font-semibold bg-cyan-500">
              <RiTelegramFill size={32} />
              <span className="text-xs">Telegram</span>
            </a>
          </div>
          <div className="flex flex-row">
            <button
              className={clsx(
                "flex items-center justify-center bg-transparent p-2 text-white/50 rounded-full aspect-square",
                "shadow-[inset_0_0_4px_rgba(255,255,255,0.5)] transition-all",
                "hover:shadow-[inset_0_0_8px_rgba(255,255,255,0.75)] focus:shadow-[inset_0_0_8px_rgba(255,255,255,1)]",
                "hover:text-white focus:text-white",
              )}
              onClick={(e) => {
                state.handleToggle();
                e.currentTarget.blur();
              }}
            >
              {state.cleanMode ? <Shrink size={20} /> : <Expand size={20} />}
            </button>
          </div>
        </div>
      </div>
      {props.status === "READY" ? (
        <div
          key="player"
          id="player"
          className={clsx("bg-black flex-1 aspect-video relative", state.cleanMode && "aspect-video lg:aspect-auto! object-contain!")}
          ref={playerRef}
        >
          React Player
        </div>
      ) : (
        <div key="poster" className={clsx("bg-black flex-1 aspect-video relative", state.cleanMode && "aspect-video lg:aspect-auto! object-contain!")}>
          <div
            className="absolute z-10 inset-0 w-full h-full bg-cover bg-no-repeat bg-center"
            style={{ backgroundImage: `url("${props.poster ?? "/default-player-poster.png"}")` }}
          >
            <div className="p-4 lt:p-16 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-full">
              {/* <Countdown targetDate={props.startTime ?? new Date()} /> */}
              <div className="w-full text-center">
                <span className="py-2 px-4 text-red-500/50 bg-white/10 rounded">Chưa phát sóng, vui lòng chờ</span>
              </div>
            </div>
          </div>
        </div>
      )}
      <a href="https://39o8.com/aff/10598" target="_blank" className="block shrink-0">
        <img className="w-full h-auto" src="/banners/o8_1920x60.gif" alt="" />
      </a>
    </div>
  );
};

export default PlayerBox;
