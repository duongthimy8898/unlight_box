import Artplayer from "artplayer";
import Hls from "hls.js";
import { useEffect, useRef, useState } from "react";
import type { Match } from "../../../../types/Match.type";
import ChatBox from "./ChatBox";
import clsx from "clsx";
import "./customPlayer.css";
import { useInView } from "react-intersection-observer";
// import { BsTelegram } from "react-icons/bs";
import { FaTelegramPlane } from "react-icons/fa";
import livePageBanners from "../../../../data/adBanners/livePageBanners";
import adButtons from "../../../../data/adButtons";

const ViewContainer = ({ match }: { match: Match }) => {
  // const onlyTime = new Date(match.startTime).toLocaleTimeString([], {
  //   hour: "2-digit",
  //   minute: "2-digit",
  // });
  console.log("ViewContainer match", match);
  const playerRef = useRef<HTMLDivElement | null>(null);
  const artRef = useRef<Artplayer | null>(null);

  const [sourceUrl, setSourceUrl] = useState<string | null>();
  console.log(sourceUrl);
  const stickyContainer = useRef<HTMLDivElement | null>(null);
  const { ref: sentinelRef, inView } = useInView({ threshold: 0 });
  const isSticky = !inView;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    console.log(stickyContainer.current?.getBoundingClientRect());
    // Kiểm tra mobile khi mount
    const checkMobile = () => setIsMobile(window.innerWidth <= 1024);
    checkMobile();

    // Nếu resize → cập nhật lại
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    setSourceUrl(
      match.isPlaying
        ? (match?.commentator.streamSourceFhd ??
            match?.commentator.streamSourceHd ??
            match?.commentator.streamSourceSd ??
            null)
        : null,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match.id]);

  useEffect(() => {
    if (playerRef.current && !artRef.current) {
      artRef.current = new Artplayer({
        container: playerRef.current,
        url: sourceUrl ?? "",
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
        poster: "/poster.png",
        layers: [
          {
            name: "banner",
            html: `
            <div class="w-full flex flex-col gap-1 md:gap-2">
              <div class="w-full flex justify-end gap-2 px-2">
              ${adButtons.OVERLAY_VIDEO.map(
                (button) =>
                  `<a class="bg-red-500 py-0.5 px-1 md:py-1 md:px-2 rounded text-[9px] md:text-[12px] font-semibold" href="${button.href}" target="_blank">${button.text}</a>`,
              ).join("")}
              </div>
              <a class="block bottom-0 z-50 w-full" href="${livePageBanners.OVERLAY_VIDEO.href}" target="_blank" rel="noopener noreferrer">
                <img loading="lazy" class="w-full h-full" src="${livePageBanners.OVERLAY_VIDEO.src}"/>
              </a>
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
              console.log("Custom layer mounted!");
            },
          },
        ],
      });
      artRef.current.on("ready", () => {
        artRef.current?.query(".art-contextmenus").remove();
        console.log("view");
      });
    }
    console.log("change match");
    return () => {
      if (artRef.current) {
        artRef.current.destroy();
        artRef.current = null;
      }
    };
  }, [sourceUrl]);

  return (
    <>
      <div className="w-full flex flex-col lg:flex-row">
        {/* {/*isScrolledPast  isSticky && <div className="w-full" style={{ height: stickyContainer.current?.clientHeight }}></div>} */}
        {isMobile && <div ref={sentinelRef} className="absolute h-0 w-full -mt-px pointer-events-none" />}
        {isMobile && isSticky && <div style={{ height: stickyContainer.current?.getBoundingClientRect().height }} />}
        <div
          ref={stickyContainer}
          className={clsx(
            "flex-1",
            /*isScrolledPast*/ isMobile && isSticky && "fixed top-0 left-0 w-screen z-[120] lg:static",
          )}
        >
          <div className="w-full bg-[#2B2B2B] px-4 py-2">
            {/*<p className="w-full text-white font-semibold">
              {onlyTime} - {match.title}
            </p>*/}
            <a
              href="https://t.me/anhembugio"
              target="_blank"
              className="bg-cyan-500 text-white px-3 py-1 flex justify-center items-center gap-1 w-fit rounded mx-auto"
            >
              <FaTelegramPlane />
              <span className="text-sm font-semibold">Tham Gia Nhóm Telegram</span>
            </a>
          </div>
          <div className="artplayer-app flex-1 aspect-video" ref={playerRef}></div>
          <div className="w-full bg-[#2B2B2B] px-2 py-2 flex justify-between items-center gap-2">
            <div className="flex gap-1 md:gap-2">
              <button
                className={clsx(
                  "py-1 px-3 text-[12px] font-semibold rounded-[4px] border-2 border-black",
                  sourceUrl !== null && sourceUrl === match.commentator.streamSourceFhd
                    ? "text-white bg-[#2A4AE1]"
                    : "text-black bg-white",
                )}
                onClick={() => setSourceUrl(match.commentator.streamSourceFhd)}
              >
                Full HD
              </button>
              <button
                className={clsx(
                  "py-1 px-3 text-[12px] font-semibold rounded-[4px] border-2 border-black",
                  sourceUrl !== null && sourceUrl === match.commentator.streamSourceHd
                    ? "text-white bg-[#2A4AE1]"
                    : "text-black bg-white",
                )}
                onClick={() => setSourceUrl(match.commentator.streamSourceHd)}
              >
                HD
              </button>
              <button
                className={clsx(
                  "py-1 px-3 text-[12px] font-semibold rounded-[4px] border-2 border-black",
                  sourceUrl !== null && sourceUrl === match.commentator.streamSourceSd
                    ? "text-white bg-[#2A4AE1]"
                    : "text-black bg-white",
                )}
                onClick={() => setSourceUrl(match.commentator.streamSourceSd)}
              >
                SD
              </button>
            </div>
            <div className="flex gap-1 md:gap-2">
              <a
                className="bg-[green] rounded text-[yellow] px-1 py-0.5 md:px-2 md:py:1 text-[9px] md:text-[12px] font-semibold whitespace-nowrap"
                href="https://6789x.site/ad9namei81"
                target="_blank"
              >
                CƯỢC VSBET
              </a>
              <a
                className="bg-[green] rounded text-[yellow] px-1 py-0.5 md:px-2 md:py:1 text-[9px] md:text-[12px] font-semibold whitespace-nowrap"
                href="https://6789x.site/ad9namei81"
                target="_blank"
              >
                CƯỢC VSBET
              </a>
            </div>
          </div>
        </div>
        <div className="w-full h-[480px] lg:h-[auto] lg:max-w-[320px]">
          <ChatBox matchId={match.referenceId ?? -9999} />
        </div>
      </div>
    </>
  );
};

export default ViewContainer;
