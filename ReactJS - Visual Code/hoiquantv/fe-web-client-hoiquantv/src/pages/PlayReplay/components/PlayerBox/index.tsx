import Artplayer from "artplayer";
// import artplayerPluginAds from "artplayer-plugin-ads";

import { useEffect, useRef } from "react";

import { MdFullscreen } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";
import adBanners from "../../../../data/adBanners";
import adButtons from "../../../../data/adButtons";

type PlayerBoxProps = {
  title: string;
  poster: string;
  source: string | undefined;
};

const PlayerBox = ({ props }: { props: PlayerBoxProps }) => {
  const playerRef = useRef<HTMLDivElement | null>(null);
  const artRef = useRef<Artplayer | null>(null);

  useEffect(() => {
    if (props.source && playerRef.current && !artRef.current) {
      artRef.current = new Artplayer({
        container: playerRef.current,
        type: "mp4",
        url: props.source,
        isLive: false,
        aspectRatio: true,
        pip: true,
        fullscreen: true,
        fullscreenWeb: false,
        setting: false,
        miniProgressBar: true,
        poster: props.poster,
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
      });
    }

    if (artRef.current && props.source) {
      artRef.current.switchUrl(props.source);
    }

    // Nếu không live → destroy player
    if (!props.source) {
      artRef.current?.destroy();
      artRef.current = null;
    }
    // console.log(source);
    return () => {
      artRef.current?.destroy();
      artRef.current = null;
    };
  }, [props.poster, props.source]);

  useEffect(() => {
    if (!props.source) {
      artRef.current?.destroy();
      artRef.current = null;
    }
  }, [props.source]);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full bg-[#1a2333] gap-2 px-2 py-2 flex justify-between items-center">
        <div className="flex-1 overflow-y-visible overflow-x-scroll flex gap-1">
          {/* {props.broadcasts?.map((b, idx) => (
            <Link
              key={idx}
              to={`?blv=${b.commentator.id}`}
              className={clsx(
                "flex-shrink-0 pr-2 rounded-full flex items-center justify-center gap-1 transition",
                b.commentator.id === currentBroadcast?.commentator.id ? "bg-blue-400" : "bg-gray-500"
              )}
            >
              <img src={b.commentator.avatarUrl} alt="" className="rounded-full border border-white w-8 h-8 lt:w-10 lt:h-10" />
              <span className="block text-xs uppercase font-medium whitespace-nowrap">{b.commentator.nickname}</span>
            </Link>
          ))} */}
          {props.title}
        </div>
        {/* <button className="flex-shrink-0 py-1.5 px-2 bg-gray-800 border border-blue-500 rounded flex items-center gap-1">
          <FaGamepad size={20} />
        </button> */}
      </div>

      <div key="player" className="aspect-video pb-[56.25%] relative -z-1" ref={playerRef}>
        React Player
      </div>

      <div className="w-full bg-[#1a2333] px-2 py-2 flex justify-between items-center gap-2">
        {/* <div className="flex-1 flex items-center gap-1 lt:gap-2">
          {currentBroadcast?.streams?.map((s, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSearchParams({ blv: currentBroadcast.commentator.id.toString(), sv: s.id.toString() });
              }}
              className={clsx(
                "py-1 px-3 text-[12px] font-medium rounded outline outline-1 text-white transition",
                serverId === s.id.toString() ? "bg-blue-400 outline-blue-400" : "bg-gray-500 outline-transparent"
              )}
            >
              {s.name}
            </button>
          ))}
        </div> */}
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
            /* screen zoom **/
          }}
          className="p-1 bg-transparent border border-slate-500 rounded"
        >
          <MdFullscreen size={24} />
        </button>
      </div>
    </div>
  );
};

export default PlayerBox;
