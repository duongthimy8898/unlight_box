import clsx from "clsx";
import { MonitorUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Match } from "../../types/Match.type";
import Artplayer from "artplayer";
import Hls from "hls.js";
import "./custom-artplayer.css";
import liveBanners from "../../data/adBanners/liveBanners";
import adButtons from "../../data/adButtons";

function playM3u8(this: Artplayer, video: HTMLVideoElement, url: string, art: Artplayer) {
  const self = art as Artplayer & { hls?: Hls };

  if (Hls.isSupported()) {
    self.hls?.destroy();
    const hls = new Hls();
    hls.loadSource(url);
    hls.attachMedia(video);
    self.hls = hls;

    self.on("destroy", () => hls.destroy());
  } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
    video.src = url;
  } else {
    art.notice.show = "Unsupported playback format: m3u8";
  }
}

type Props = {
  match?: Match | null;
  poster?: string | null;
  popup: boolean;
  setPopup: React.Dispatch<React.SetStateAction<boolean>>;
};

const Video = ({ match, poster, popup, setPopup }: Props) => {
  const playerRef = useRef<HTMLDivElement | null>(null);
  const artRef = useRef<Artplayer | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const server = searchParams.get("server") ?? "FHD"; // Mặc định là HD1 nếu không có tham số
  const [streamSource, setStreamSource] = useState<string | undefined>(undefined);
  // const startDate = match && new Date(match.startTime).toLocaleDateString();
  const startTime =
    match &&
    new Date(match.startTime).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  useEffect(() => {
    setStreamSource(match?.commentator.streamSourceFhd ?? match?.commentator.streamSourceHd ?? match?.commentator.streamSourceSd ?? undefined);
    setSearchParams(
      match?.commentator.streamSourceFhd
        ? { server: "FHD" }
        : match?.commentator.streamSourceHd
        ? { server: "HD" }
        : match?.commentator.streamSourceSd
        ? { server: "SD" }
        : { server: "FHD" }
    );
  }, [match?.id]);

  useEffect(() => {
    if (server === "FHD") setStreamSource(match?.commentator.streamSourceFhd ?? "");
    if (server === "HD") setStreamSource(match?.commentator.streamSourceHd ?? "");
    if (server === "SD") setStreamSource(match?.commentator.streamSourceSd ?? "");
  }, [match?.commentator, server]);

  useEffect(() => {
    if (playerRef.current && !artRef.current) {
      if (match?.isPlaying) {
        console.log("Initializing Artplayer with stream:", streamSource);
        artRef.current = new Artplayer({
          container: playerRef.current,
          type: /*canPlayFlv() && source?.sourceUrl ? "flv" : */ "m3u8",
          url: /*canPlayFlv() && source?.flv ? source.flv : */ streamSource ?? "",
          // url: "https://content.jwplatform.com/manifests/yp34SRmf.m3u8",
          isLive: true,
          aspectRatio: true,
          pip: true,
          fullscreen: true,
          fullscreenWeb: false,
          setting: false,
          customType: {
            m3u8: playM3u8,
          },
          poster: poster ?? "/assets/images/poster.png",
          //     controls: [
          //       {
          //         position: "top",
          //         html: `
          //   <div class="flex items-center space-x-2 w-28">
          //     <button class="mute-btn text-white">🔊</button>
          //     <input
          //       type="range" min="0" max="1" step="0.01" value="1"
          //       class="w-full accent-blue-500 h-1 bg-gray-700 rounded-lg cursor-pointer"
          //     >
          //   </div>
          // `,
          //         mounted: function ($el) {
          //           const $btn = $el.querySelector(".mute-btn") as HTMLButtonElement;
          //           const $input = $el.querySelector("input") as HTMLInputElement;

          //           // kéo slider đổi volume
          //           $input.addEventListener("input", () => {
          //             if (artRef.current) {
          //               artRef.current.volume = Number($input.value);
          //               $btn.textContent = $input.value === "0" ? "🔇" : "🔊";
          //             }
          //           });

          //           // sync khi volume thay đổi ở chỗ khác
          //           if (artRef.current) {
          //             artRef.current!.on("volume", (v: unknown) => {
          //               const volume = v as number;
          //               $input.value = String(volume);
          //               $btn.textContent = volume === 0 ? "🔇" : "🔊";
          //             });
          //           }

          //           // click icon mute/unmute
          //           $btn.addEventListener("click", () => {
          //             if (artRef.current) {
          //               artRef.current.volume = artRef.current.volume > 0 ? 0 : 1;
          //             }
          //           });
          //         },
          //       },
          //     ],
          layers: [
            {
              name: "ad",
              html: `
                      <div id="video-overlay-bottom" style="width:100%;overflow:hidden;position:relative;">
                        <div class="w-full flex justify-center items-end px-1 mb-1 lt:px-2 lt:mb-2">
                          <div class="w-fit flex justify-center gap-1">
                            ${adButtons.OVERLAY_VIDEO.map(
                              (ad) => `
                              <a 
                              href="${ad.href}"
                              target="_blank"
                              class="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-0.5 px-1 md:py-1 md:px-2 rounded transition-colors text-[8px] md:text-[9px]"
                            >${ad.text}</a>`
                            ).join('')}
                          </div>
                          <img style="display: none" src="/banners/sv_185x57.gif"
                            onclick="window.open('https://www.sv368c1.net/register?affiliateCode=football68', '_blank')"
                            alt="Ad Banner"
                            class="block object-contain w-16 rounded sm:w-24 md:w-28 lg:w-32 opacity-80 hover:opacity-100 cursor-pointer"
                          />
                        </div>
                        <div class="ad-track" style="display:flex;transition:transform 1.5s ease-in-out;will-change:transform"></div>
                      </div>
                    `,
              style: {
                position: "absolute",
                width: "100%",
                bottom: "0",
                zIndex: "20",
                fontFamily: "sans-serif",
              },
              mounted(el) {
                console.log("Ad layer mounted!");
                const banners = liveBanners.OVERLAY_VIDEO;

                const track = el.querySelector(".ad-track") as HTMLDivElement;
                if (!track) return;

                // Render banners
                track.style.width = `${banners.length * 100}%`;
                banners.forEach((b) => {
                  const img = document.createElement("img");
                  img.src = b.src;
                  img.style.width = `${100 / banners.length}%`;
                  img.style.cursor = "pointer";
                  img.style.objectFit = "cover";
                  img.onclick = () => window.open(b.href, "_blank");
                  track.appendChild(img);
                });

                // Auto-slide
                let index = 0;
                setInterval(() => {
                  index = (index + 1) % banners.length;
                  track.style.transform = `translateX(-${index * (100 / banners.length)}%)`;
                }, 5000);
              },
            },
          ],

          /*
          plugins: [
            artplayerPluginAds({
              // html广告，假如是视频广告则忽略该值
              // html: '<img src="https://i.postimg.cc/0Q2DBwLg/photo-2025-07-11-02-19-54.jpg">',

              // 视频广告的地址
              video: "/tvc.mp4",

              // 广告跳转网址，为空则不跳转
              url: "https://www.fb88rd.com/vi-VN/Account/Register?affiliateId=8623",

              // 必须观看的时长，期间不能被跳过，单位为秒
              // 当该值大于或等于totalDuration时，不能提前关闭广告
              // 当该值等于或小于0时，则随时都可以关闭广告
              playDuration: 3,

              // 广告总时长，单位为秒
              totalDuration: 35,

              // 多语言支持
              i18n: {
                close: "Đóng quảng cáo",
                countdown: "Tự động tắt sau %ss",
                detail: "Truy cập ngay",
                canBeClosed: "Có thể bỏ qua sau %ss",
              },
            }),
          ],
          */
        });
      }
    }

    if (artRef.current && match?.isPlaying && streamSource) {
      artRef.current.switchUrl(streamSource);
      // artRef.current.switchUrl("https://content.jwplatform.com/manifests/yp34SRmf.m3u8");
    }

    // Nếu không live → destroy player
    if (!match?.isPlaying && artRef.current) {
      artRef.current.destroy();
      artRef.current = null;
    }
    // console.log(source);
    return () => {
      artRef.current?.destroy();
      artRef.current = null;
    };
  }, [streamSource, match?.isPlaying, poster]);

  useEffect(() => {
    if (match?.isPlaying && artRef.current) {
      artRef.current.destroy();
      artRef.current = null;
    }
  }, [match?.isPlaying]);

  return (
    <div className={clsx("w-full rounded-[12px] overflow-hidden", popup && "!flex lg:!flex-1 !flex-col")}>
      {/* Title */}
      <div className={clsx("w-full bg-[#333] text-[#fff] px-3 py-2", popup && "!hidden")}>
        <span className="text-[16px] font-semibold line-clamp-2">
          {startTime} - {match?.title}
        </span>
      </div>

      {/* Video player container */}
      <div className={clsx("w-full h-auto", popup && "!flex-1 !overflow-hidden !bg-[#333]")}>
        <div key={"player"} className="w-full aspect-video overflow-hidden" ref={playerRef}>
          React Player
        </div>
      </div>

      {/* Footer */}
      <div className={clsx("w-full bg-[#F8C32F] px-2 py-2 flex gap-4 justify-between items-center", popup && "!shrink-0")}>
        <div className="flex gap-2">
          <Link
            to={`?server=FHD`}
            className={clsx("py-1 px-2 bg-white text-gray-700 text-[14px] truncate font-semibold rounded-[6px]", server === "FHD" && "!bg-[#64FF43]")}
          >
            Full HD
          </Link>
          <Link
            to={`?server=HD`}
            className={clsx("py-1 px-2 bg-white text-gray-700 text-[14px] truncate font-semibold rounded-[6px]", server === "HD" && "!bg-[#64FF43]")}
          >
            HD
          </Link>
          <Link
            to={`?server=SD`}
            className={clsx("py-1 px-2 bg-white text-gray-700 text-[14px] truncate font-semibold rounded-[6px]", server === "SD" && "!bg-[#64FF43]")}
          >
            SD
          </Link>
        </div>
        <div className="flex flex-row space-x-2">
          {/* <a
            href="https://www.fb88alo.com/vi-VN/Account/Register?affiliateId=8627"
            target="_blank"
            className="flex justify-center truncate items-center bg-[#00b327] hover:bg-[#c0a300] text-white rounded px-2 py-1 text-xs font-semibold"
          >
            CƯỢC FB88
          </a> */}
          <button className="bg-[#fff] hover:bg-[#ddd] rounded px-2 py-1" onClick={() => setPopup(!popup)}>
            <MonitorUp />
          </button>
        </div>
      </div>
    </div>
  );
};

const ChatboxElm = ({ popup, matchId }: { popup: boolean; matchId: number }) => {
  const [activeTab, setActiveTab] = useState("tab1");
  return (
    <div
      className={clsx(
        "bg-[#F8C32F] border-t border-[#000] w-full flex flex-col rounded-[12px] overflow-hidden lg:max-w-[320px]",
        popup && "!flex-1 !lg:flex-none"
      )}
    >
      <div className="flex space-x-2 py-2 px-2 justify-start">
        {[
          { id: "tab1", label: "Chung" },
          { id: "tab2", label: "Tóm tắt" },
          { id: "tab3", label: "Thông số" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-1.5 rounded-md text-xs font-semibold border
              ${activeTab === tab.id ? "bg-blue-500 text-white" : "bg-white text-gray-800 border-gray-300"}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="w-full bg-[#c39100] px-4 py-2 text-[12px] text-center flex flex-col">
        <span>AE tham gia kênh Telegram nhé</span>
        <a href="https://t.me/+jbN3FCFIp_0xNmFl" target="_blank" className="font-bold">
          https://t.me/+jbN3FCFIp_0xNmFl
        </a>
      </div>
      {/* Content */}
      <div className={clsx("order rounded-md bg-gray-50 h-full", popup && "!flex-1")}>
        {activeTab === "tab1" && (
          <div className={clsx("w-full", popup ? "!h-full" : "h-[320px]", "lg:h-full")}>
            <iframe width="100%" height="100%" src="https://www5.cbox.ws/box/?boxid=957825&boxtag=aSRcee" frameBorder="0"></iframe>
          </div>
        )}
        {activeTab === "tab2" && (
          <div className={clsx("w-full", popup ? "!h-full" : "h-[320px]", "lg:h-full")}>
            <iframe src={`https://widget-events.livestats.online/?fixtureId=${matchId}`} frameBorder={0} width="100%" height="100%"></iframe>
          </div>
        )}
        {activeTab === "tab3" && (
          <div className={clsx("w-full", popup ? "!h-full" : "h-[320px]", "lg:h-full")}>
            <iframe
              src={`https://widget-statistics.livestats.online/?fixtureId=${matchId}&homeColor=%23F8C32F&awayColor=%2322883e`}
              frameBorder={0}
              width="100%"
              height="100%"
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default function PlayerAndChatboxElm({ match }: { match: Match }) {
  // console.log("s", match);
  const [popup, setPopup] = useState(false);
  return (
    <div className={clsx("w-full flex flex-col h-auto lg:!flex-row", popup && "!fixed !h-screen !top-0 !left-0 !z-[100]", popup ? "!gap-0" : "gap-2")}>
      {match.isPlaying ? (
        <Video match={match} poster={"/assets/images/poster.png"} popup={popup} setPopup={setPopup} />
      ) : (
        <div className={clsx("w-full rounded-[12px] overflow-hidden", popup && "!flex lg:!flex-1 !flex-col")}>
          <img loading="lazy" className="w-full h-full block" src="/assets/images/poster.png" alt="" />
        </div>
      )}
      <ChatboxElm popup={popup} matchId={match.referenceId || 0} />
    </div>
  );
}
