import Artplayer from "artplayer";
// import artplayerPluginAds from "artplayer-plugin-ads";
import clsx from "clsx";
import Hls from "hls.js";
import { useEffect, useRef, useState } from "react";

type PlayerBoxProps = {
  title: string;
  poster: string;
  isLive: boolean;
  commentator:
    | {
        nickname: string;
        avatar: string;
        streamSourceSd: string | null;
        streamSourceHd: string | null;
        streamSourceFhd: string | null;
      }
    | undefined;
  startTime: Date;
};

const PlayerBox = ({ props }: { props: PlayerBoxProps }) => {
  const playerRef = useRef<HTMLDivElement | null>(null);
  const artRef = useRef<Artplayer | null>(null);
  const [status, setStatus] = useState(props.isLive ? "READY" : "UPCOMING");
  const [sourceUrl, setSourceUrl] = useState<string | null>();

  useEffect(() => {
    setStatus(props.isLive ? "READY" : "UPCOMING");
  }, [props]);

  useEffect(() => {
    setSourceUrl(props?.commentator?.streamSourceFhd ?? props?.commentator?.streamSourceHd ?? props?.commentator?.streamSourceSd ?? null);
  }, [props.commentator]);

  useEffect(() => {
    if (playerRef.current && !artRef.current) {
      if (sourceUrl) {
        artRef.current = new Artplayer({
          container: playerRef.current,
          url: sourceUrl,
          type: "m3u8",
          isLive: true,
          aspectRatio: true,
          pip: true,
          fullscreen: true,
          fullscreenWeb: true,
          customType: {
            m3u8: function (video, url, art) {
              if (Hls.isSupported()) {
                const hls = new Hls();
                hls.loadSource(url);
                hls.attachMedia(video);
              } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
                video.src = url;
              } else {
                art.notice.show = "Unsupported playback format: m3u8";
              }
            },
          },
          poster: props.poster,
          layers: [
            {
              name: "banner",
              html: `
            <div class="w-full flex flex-col gap-1 md:gap-2 overflow-hidden">
              <div class="w-full flex justify-end gap-2 px-2">
                <a class="bg-red-500 py-0.5 px-1 md:py-1 md:px-2 rounded text-[9px] md:text-[12px] font-semibold" href="https://6789x.site/ad9namei200" target="_blank">CƯỢC VSBET</a>
                <a hidden class="bg-blue-500 py-0.5 px-1 md:py-1 md:px-2 rounded text-[9px] md:text-[12px] font-semibold" href="https://www.fb88alo.com/?affiliateId=8623" target="_blank">CƯỢC 6789 SPOT</a>
                <a class="bg-green-500 py-0.5 px-1 md:py-1 md:px-2 rounded text-[9px] md:text-[12px] font-semibold" href="https://www.fb88alo.com/?affiliateId=8623" target="_blank">CƯỢC FB88</a>
              </div>
              <div class="ad-track" style="display:flex;width:100%;transition:transform 1.5s ease-in-out;will-change:transform"></div>
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
                console.log("Custom layer mounted!");
                const banners = [
                  {
                    src: "/banners/vs_1920x60.gif",
                    href: "https://6789x.site/ad9namei200",
                  },
                  {
                    src: "/banners/fb88_1920x60.gif",
                    href: "https://www.fb88alo.com/?affiliateId=8623",
                  },
                  {
                    src: "/banners/fb88_1920x60.gif",
                    href: "https://www.fb88alo.com/?affiliateId=8623",
                  },
                ];

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
          plugins: [
            // artplayerPluginAds({
            //   // html广告，假如是视频广告则忽略该值
            //   // html: '<img src="https://i.postimg.cc/0Q2DBwLg/photo-2025-07-11-02-19-54.jpg">',
            //   // 视频广告的地址
            //   video: "/tvc.mp4",
            //   // 广告跳转网址，为空则不跳转
            //   url: "https://6789x.site/ad9namei200",
            //   // 必须观看的时长，期间不能被跳过，单位为秒
            //   // 当该值大于或等于totalDuration时，不能提前关闭广告
            //   // 当该值等于或小于0时，则随时都可以关闭广告
            //   playDuration: 3,
            //   // 广告总时长，单位为秒
            //   totalDuration: 35,
            //   // 多语言支持
            //   i18n: {
            //     close: "Đóng quảng cáo",
            //     countdown: "Tự động tắt sau %ss",
            //     detail: "Truy cập ngay",
            //     canBeClosed: "Có thể bỏ qua sau %ss",
            //   },
            // }),
          ],
        });
      }
    }

    return () => {
      artRef.current?.destroy();
      artRef.current = null;
    };
  }, [status, sourceUrl, props.poster]);
  return (
    <div className="w-full flex flex-col">
      <div className="w-full border-l-4 border-[#96C052] bg-gradient-to-r from-[#96C052]/25 to-transparent px-2 py-2">
        <span className="uppercase text-[16px] font-[500] truncate">{props.title}</span>
      </div>
      {status === "READY" ? (
        <div key="player" className="aspect-video pb-[56.25%] relative -z-1" ref={playerRef}>
          React Player
        </div>
      ) : (
        <div key="poster" className="aspect-video pb-[56.25%] relative -z-1">
          <div className="absolute z-10 inset-0 w-full h-full bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${props.poster})` }}></div>
        </div>
      )}
      <div className="w-full bg-[#2B2B2B] px-2 py-2 flex justify-between items-center gap-2">
        <div className="flex gap-1 md:gap-2">
          <button
            className={clsx(
              "py-1 px-3 text-[12px] font-semibold rounded-[4px] border-2 border-black",
              sourceUrl !== null && sourceUrl === props.commentator?.streamSourceFhd ? "text-white bg-[#2A4AE1]" : "text-black bg-white",
            )}
            onClick={() => setSourceUrl(props.commentator?.streamSourceFhd)}
          >
            Full HD
          </button>
          <button
            className={clsx(
              "py-1 px-3 text-[12px] font-semibold rounded-[4px] border-2 border-black",
              sourceUrl !== null && sourceUrl === props.commentator?.streamSourceHd ? "text-white bg-[#2A4AE1]" : "text-black bg-white",
            )}
            onClick={() => setSourceUrl(props.commentator?.streamSourceHd)}
          >
            HD
          </button>
          <button
            className={clsx(
              "py-1 px-3 text-[12px] font-semibold rounded-[4px] border-2 border-black",
              sourceUrl !== null && sourceUrl === props.commentator?.streamSourceSd ? "text-white bg-[#2A4AE1]" : "text-black bg-white",
            )}
            onClick={() => setSourceUrl(props.commentator?.streamSourceSd)}
          >
            SD
          </button>
        </div>
        <div className="flex gap-1 md:gap-2">
          <a hidden
            className="bg-[green] rounded text-[yellow] px-1 py-0.5 md:px-2 md:py:1 text-[9px] md:text-[12px] font-medium whitespace-nowrap"
            href="https://www.fb88alo.com/?affiliateId=8623"
            target="_blank"
          >
            CƯỢC 6789 SPOT
          </a>
          <a
            className="bg-[green] rounded text-[yellow] px-1 py-0.5 md:px-2 md:py:1 text-[9px] md:text-[12px] font-medium whitespace-nowrap"
            href="https://www.fb88alo.com/?affiliateId=8623"
            target="_blank"
          >
            CƯỢC FB88
          </a>
          <a
            className="hidden lg:block bg-[green] rounded text-[yellow] px-1 py-0.5 md:px-2 md:py:1 text-[9px] md:text-[12px] font-medium whitespace-nowrap"
            href="https://www.fb88alo.com/?affiliateId=8623"
            target="_blank"
          >
            CƯỢC FB88
          </a>
          <a
            className="bg-[green] rounded text-[yellow] px-1 py-0.5 md:px-2 md:py:1 text-[9px] md:text-[12px] font-medium whitespace-nowrap"
            href="https://6789x.site/ad9namei200"
            target="_blank"
          >
            CƯỢC VSBET
          </a>
          <a
            className="bg-[green] rounded text-[yellow] px-1 py-0.5 md:px-2 md:py:1 text-[9px] md:text-[12px] font-medium whitespace-nowrap"
            href="https://6789x.site/ad9namei200"
            target="_blank"
          >
            CƯỢC VSBET
          </a>
        </div>
      </div>
    </div>
  );
};

export default PlayerBox;
