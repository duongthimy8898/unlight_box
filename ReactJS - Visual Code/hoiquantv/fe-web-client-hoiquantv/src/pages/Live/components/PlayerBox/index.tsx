import Artplayer from "artplayer";
// import artplayerPluginAds from "artplayer-plugin-ads";
import Hls from "hls.js";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import type { StreamSource } from "../../../../types/StreamSource";
import type { Commentator } from "../../../../types/Commentator";
import FlvJs from "flv.js";
import clsx from "clsx";
import { MdFullscreen } from "react-icons/md";
import { FaFacebook, FaSackDollar } from "react-icons/fa6";
import Countdown from "../Countdown";
import adButtons from "../../../../data/adButtons";
import adBanners from "../../../../data/adBanners";

type Broadcast = {
  commentator: Commentator;
  streams: StreamSource[];
};

type PlayerBoxProps = {
  poster: string;
  status: "READY" | "UPCOMING";
  broadcasts?: Broadcast[];
  startTime?: Date;
};

function playFlv(this: Artplayer, video: HTMLVideoElement, url: string, art: Artplayer) {
  const self = art as Artplayer & { flv?: FlvJs.Player };
  if (FlvJs.isSupported()) {
    if (self.flv) self.flv.destroy();
    const flv = FlvJs.createPlayer({ type: "flv", url });
    flv.attachMediaElement(video);
    flv.load();
    self.flv = flv;
    self.on("destroy", () => flv.destroy());
  } else {
    self.notice.show = "Unsupported playback format: flv";
  }
}

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

// function canPlayFlv() {
//   return FlvJs.isSupported();
// }

const PlayerBox = ({ props }: { props: PlayerBoxProps }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const playerRef = useRef<HTMLDivElement | null>(null);
  const artRef = useRef<Artplayer | null>(null);
  const [currentBroadcast, setCurrentBroadcast] = useState<Broadcast | undefined>(undefined);
  const [source, setSource] = useState<StreamSource | undefined>(props.broadcasts?.at(0)?.streams.at(0));
  const commentatorId = searchParams.get("blv");
  const serverId = searchParams.get("sv");
  useEffect(() => {
    const firstBroadcast = props.broadcasts?.[0];
    if (!commentatorId && firstBroadcast) {
      setSearchParams({ blv: commentatorId?.toString() ?? firstBroadcast.commentator.id.toString() }, { replace: true });
    }
    if (firstBroadcast && !serverId) {
      setSearchParams(
        {
          blv: commentatorId?.toString() ?? firstBroadcast.commentator.id.toString(),
          sv:
            props.broadcasts
              ?.find((b) => b.commentator.id === parseInt(commentatorId ?? "-1"))
              ?.streams.at(0)
              ?.id.toString() ?? "",
        },
        { replace: true },
      );
    }
  }, [serverId, commentatorId, props.broadcasts, setSearchParams]);

  useEffect(() => {
    setCurrentBroadcast(props.broadcasts?.find((b) => b.commentator.id === parseInt(commentatorId ?? "-1")));
  }, [commentatorId, props.broadcasts]);

  useEffect(() => {
    setSource(currentBroadcast?.streams.find((s) => s.id === parseInt(serverId ?? "-1")));
  }, [serverId, currentBroadcast]);

  useEffect(() => {
    if (playerRef.current && !artRef.current) {
      if (props.status === "READY") {
        artRef.current = new Artplayer({
          container: playerRef.current,
          type: /*canPlayFlv() && source?.sourceUrl ? "flv" : */ "m3u8",
          url: /*canPlayFlv() && source?.flv ? source.flv : */ source?.sourceUrl ?? "",
          isLive: true,
          aspectRatio: true,
          pip: true,
          fullscreen: true,
          fullscreenWeb: false,
          setting: false,
          customType: {
            flv: playFlv,
            m3u8: playM3u8,
          },
          poster: props.poster,
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
              click(this: Artplayer) {
                (this.hls as Hls).loadSource(source?.sourceUrl ?? "");
                (this.hls as Hls).startLoad();
                this.play();
              },
            },
          ],
          layers: [
            {
              name: "ad",
              html: `
                      <div id="video-overlay-bottom" style="width:100%;overflow:hidden;position:relative;">
                        <div class="w-full flex justify-between items-end px-1 mb-1 lt:px-2 lt:mb-2">
                          <div class="w-fit flex gap-1">
                             ${adButtons.OVERLAY_VIDEO.map((button) => {
                               return `<a
                                  href="${button.href}"
                                  target="_blank"
                                  class="${button.bgColor} text-white font-semibold py-0 px-1 md:py-1 md:px-2 rounded transition-colors text-[8px] md:text-[9px]"
                                >${button.text}</a>`;
                             }).join("")}
                          </div>
                          <img src="${adBanners.OVERLAY_VIDEO.CORNER.src}"
                            onclick="window.open('${adBanners.OVERLAY_VIDEO.CORNER.href}', '_blank')"
                            alt="Ad Banner"
                            class="block object-contain w-16 rounded sm:w-24 md:w-28 lg:w-32 opacity-80 hover:opacity-100 cursor-pointer"
                          />
                        </div>
                        <div class="ad-track" style="display:none;transition:transform 1.5s ease-in-out;will-change:transform"></div>
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
                const banners = adBanners.OVERLAY_VIDEO.BOTTOM;

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

          // plugins: [
          //   artplayerPluginAds({
          //     // html广告，假如是视频广告则忽略该值
          //     // html: '<img src="https://i.postimg.cc/0Q2DBwLg/photo-2025-07-11-02-19-54.jpg">',

          //     // 视频广告的地址
          //     video: "/tvc.mp4",

          //     // 广告跳转网址，为空则不跳转
          //     url: "https://www.VSBETrd.com/vi-VN/Account/Register?affiliateId=8623",

          //     // 必须观看的时长，期间不能被跳过，单位为秒
          //     // 当该值大于或等于totalDuration时，不能提前关闭广告
          //     // 当该值等于或小于0时，则随时都可以关闭广告
          //     playDuration: 3,

          //     // 广告总时长，单位为秒
          //     totalDuration: 35,

          //     // 多语言支持
          //     i18n: {
          //       close: "Đóng quảng cáo",
          //       countdown: "Tự động tắt sau %ss",
          //       detail: "Truy cập ngay",
          //       canBeClosed: "Có thể bỏ qua sau %ss",
          //     },
          //   }),
          // ],
        });
      }
    }

    if (artRef.current && props.status === "READY" && source?.sourceUrl) {
      artRef.current.switchUrl(source.sourceUrl);
    }

    // Nếu không live → destroy player
    if (props.status !== "READY" && artRef.current) {
      artRef.current.destroy();
      artRef.current = null;
    }
    // console.log(source);
    return () => {
      artRef.current?.destroy();
      artRef.current = null;
    };
  }, [source?.sourceUrl, props.status, props.poster]);

  useEffect(() => {
    if (props.status !== "READY" && artRef.current) {
      artRef.current.destroy();
      artRef.current = null;
    }
  }, [props.status]);

  // useEffect(() => {
  //   const target = document.getElementById("custom-layer");
  //   if (target) {
  //     createRoot(target).render(
  //       <VideoOverlayBottom
  //         banners={[
  //           {
  //             index: 1,
  //             src: "/ads/sv_1920x60.gif?v=202509290206",
  //             href: "https://www.sv368cpc1.vip/register?affiliateCode=football68",
  //           },
  //           {
  //             index: 2,
  //             src: "/ads/vs_1920x60.gif?v=202509290206",
  //             href: "https://6789x.site/ad9namei193",
  //           },
  //           {
  //             index: 3,
  //             src: "/ads/sv_1920x60.gif?v=202509290206",
  //             href: "https://www.sv368cpc1.vip/register?affiliateCode=football68",
  //           },
  //           {
  //             index: 4,
  //             src: "/ads/dola_1920x60.gif?v=202509290206",
  //             href: "https://6789x.site/ad9namei200",
  //           },
  //         ]}
  //       />
  //     );
  //   }
  // }, []);

  const sliderBannersRef = useRef<HTMLDivElement>(null);
  const items = adBanners.OVERLAY_VIDEO.BOTTOM.length;
  const intervalTime = 5000; // 5s
  useEffect(() => {
    const slider = sliderBannersRef.current;
    if (!slider) return;

    let index = 0;

    const interval = setInterval(() => {
      console.log("slide to", index);
      index++;
      slider.scrollTo({
        left: slider.clientWidth * index,
        behavior: "smooth",
      });

      // reset vô hạn
      if (index === items) {
        // sau khi smooth xong, nhảy về 0 (không animation)
        setTimeout(() => {
          slider.scrollTo({
            left: 0,
            behavior: "auto",
          });
          index = 0;
        }, 0); // delay nhỏ để phù hợp smooth scroll
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [items]);
  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full bg-[#1a2333] gap-2 px-2 py-2 flex justify-between items-center">
        <div className="flex-1 overflow-y-visible overflow-x-scroll flex gap-1">
          {props.broadcasts?.map((b, idx) => (
            <Link
              key={idx}
              to={`?blv=${b.commentator.id}`}
              className={clsx(
                "flex-shrink-0 pr-2 rounded-full flex items-center justify-center gap-1 transition",
                b.commentator.id === currentBroadcast?.commentator.id ? "bg-blue-400" : "bg-gray-500",
              )}
            >
              <img src={b.commentator.avatarUrl} alt="" className="rounded-full border border-white w-8 h-8 lt:w-10 lt:h-10" />
              <span className="block text-xs uppercase font-medium whitespace-nowrap">{b.commentator.nickname}</span>
            </Link>
          ))}
        </div>
        <button
          className="flex-shrink-0 py-1.5 px-2 bg-blue-500 border border-blue-500 rounded flex items-center gap-1"
          onClick={() => {
            window.open("https://www.facebook.com/share/1AaCjNYc5u", "_blank");
          }}
        >
          <FaFacebook size={20} />
          <span className="text-xs font-medium">Follow FB</span>
        </button>
      </div>
      {props.status === "READY" ? (
        <div key="player" className="aspect-video pb-[56.25%] relative -z-1" ref={playerRef}>
          React Player
        </div>
      ) : (
        <div key="poster" className="aspect-video pb-[56.25%] relative -z-1">
          <div
            className="absolute z-10 inset-0 w-full h-full bg-cover bg-no-repeat bg-center"
            style={{ backgroundImage: `url("${props.poster ?? "/assets/imgs/default-player-poster.png"}")` }}
          >
            <div className="p-4 lt:p-16 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-full">
              <Countdown targetDate={props.startTime ?? new Date()} />
            </div>
          </div>
        </div>
      )}
      <div ref={sliderBannersRef} className="w-full flex flex-row overflow-hidden snap-x snap-mandatory scroll-smooth transition duration-1000">
        {adBanners.OVERLAY_VIDEO.BOTTOM.map((banner, idx) => (
          <a key={idx} href={banner.href} target="_blank" className="w-full flex-shrink-0 h-auto aspect-[1920/60] snap-start block">
            <img src={banner.src} alt="" className="w-full h-full block" />
          </a>
        ))}
      </div>
      <div className="w-full bg-[#1a2333] px-2 py-2 flex justify-between items-center gap-2">
        <div className="flex-1 flex items-center gap-1 lt:gap-2">
          {currentBroadcast?.streams?.map((s, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSearchParams({ blv: currentBroadcast.commentator.id.toString(), sv: s.id.toString() });
              }}
              className={clsx(
                "py-1 px-3 text-[12px] font-medium rounded outline outline-1 text-white transition",
                serverId === s.id.toString() ? "bg-blue-400 outline-blue-400" : "bg-gray-500 outline-transparent",
              )}
            >
              {s.name}
            </button>
          ))}
        </div>
        <div className="flex items-center justify-end gap-1 lt:gap-2">
          <a
            href="https://www.sv368cpc1.vip/register?affiliateCode=football68"
            target="_blank"
            className="leading-none flex gap-1 items-center py-1 px-3 font-medium rounded outline outline-1 text-black bg-yellow-400 outline-transparent transition"
          >
            <FaSackDollar />
            <span className="text-[10px] tb:text-xs font-medium uppercase whitespace-nowrap">CƯỢC TRẬN NÀY</span>
          </a>
        </div>
        <button
          onClick={() => {
            navigate("clean-view");
          }}
          className="p-1 bg-transparent border border-slate-500 rounded flex items-center gap-1 px-2"
        >
          <MdFullscreen size={20} />
          <span className="hidden lt:block text-[10px]">XEM RẠP</span>
        </button>
      </div>
    </div>
  );
};

export default PlayerBox;
