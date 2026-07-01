// import clsx from "clsx";
// import { MonitorUp } from "lucide-react";
// import { useEffect, useRef, useState } from "react";
// import { Link, useSearchParams } from "react-router-dom";
// import { Match } from "../../types/Match.type";

// declare global {
//   interface Window {
//     jwplayer: (container: string | HTMLElement) => JWPlayerInstance;
//   }

//   interface JWPlayerInstance {
//     play(): unknown;
//     setup: (config: {
//       file?: string;
//       image?: string;
//       width?: string;
//       height?: string;
//       aspectratio?: string;
//       autostart?: boolean;
//       controls?: boolean;
//       mute?: boolean;
//       playinside?: boolean;
//       viewability: {
//         pauseOnViewability: boolean; // hoặc false để tắt
//       };
//     }) => JWPlayerInstance;

//     on: (event: string, callback: () => void) => void;
//     remove: () => void;
//     // Có thể mở rộng thêm tùy vào nhu cầu
//   }
// }

// type Props = {
//   match?: Match | null;
//   poster?: string | null;
//   popup: boolean;
//   setPopup: React.Dispatch<React.SetStateAction<boolean>>;
// };

// const Video = ({ match, poster, popup, setPopup }: Props) => {
//   const playerRef = useRef<HTMLDivElement>(null);
//   const [searchParams, setSearchParams] = useSearchParams();
//   const server = searchParams.get("server") ?? "FHD"; // Mặc định là HD1 nếu không có tham số
//   const [streamSource, setStreamSource] = useState<string | undefined>(undefined);
//   // const startDate = match && new Date(match.startTime).toLocaleDateString();
//   const startTime =
//     match &&
//     new Date(match.startTime).toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     });

//   useEffect(() => {
//     setStreamSource(match?.commentator.streamSourceFhd ?? match?.commentator.streamSourceHd ?? match?.commentator.streamSourceSd ?? undefined);
//     setSearchParams(
//       match?.commentator.streamSourceFhd
//         ? { server: "FHD" }
//         : match?.commentator.streamSourceHd
//         ? { server: "HD" }
//         : match?.commentator.streamSourceSd
//         ? { server: "SD" }
//         : { server: "FHD" }
//     );
//   }, [match?.id]);

//   useEffect(() => {
//     if(server === "FHD")
//       setStreamSource(match?.commentator.streamSourceFhd ?? "")
//     if(server === "HD")
//       setStreamSource(match?.commentator.streamSourceHd ?? "")
//     if(server === "SD")
//       setStreamSource(match?.commentator.streamSourceSd ?? "")
//   }, [match?.commentator, server])

//   useEffect(() => {
//     // console.log("s", match);
//     if (!playerRef.current) return;

//     const playerInstance = window.jwplayer(playerRef.current);

//     const hasValidM3u8 = streamSource;

//     const setupConfig = {
//       file: hasValidM3u8 ?? "",
//       image: poster ?? "/assets/images/poster.png",
//       width: "100%",
//       height: "100%",
//       aspectratio: "16:9",
//       // autostart: true, // 👈 kiểu boolean chuẩn
//       controls: true, // 👈 kiểu boolean chuẩn
//       mute: false,
//       repeat: false,
//       type: "hls",
//       isLive: true,
//       loop: false,
//       viewability: {
//         pauseOnViewability: false, // Tắt tính năng tự động tạm dừng khi mất focus
//       },
//     };

//     if (hasValidM3u8) {
//       playerInstance.setup(setupConfig);
//       try {
//         // playerInstance.play();
//       } catch (error) {
//         console.error("Error playing video:", error);
//       }
//     }

//     // 👇 GẮN SỰ KIỆN Ở ĐÂY
//     playerInstance.on("ready", () => {
//       console.log("Player is ready 🚀");
//       const group = document.createElement("div");
//       group.classList.add(..."w-full absolute z-[100] bottom-0 left-0 flex flex-col justify-center items-center space-y-2".split(" "));
//       const btnGroup = document.createElement("div");
//       btnGroup.classList.add(..."w-full flex flex-row justify-center items-center gap-2".split(" "));
//       const betButton1 = document.createElement("a");
//       betButton1.href = "https://6789x.site/ad9namei159";
//       betButton1.innerText = "CƯỢC VSBET";
//       betButton1.classList.add(..."bg-[#F8C32F] px-2 py-[0] md:py-[4px] text-[6px] md:text-[12px] text-black rounded-[4px] font-semibold".split(" "));
//       btnGroup.appendChild(betButton1);
//       const betButton2 = document.createElement("a");
//       betButton2.href = "#combo2link";
//       betButton2.innerText = "CƯỢC DOLA789";
//       betButton2.classList.add(..."bg-[#F8C32F] px-2 py-[0] md:py-[4px] text-[6px] md:text-[12px] text-black rounded-[4px] font-semibold".split(" "));
//       btnGroup.appendChild(betButton2);
//       group.appendChild(btnGroup);
//       // betButton.classList.add(..."absolute z-[100] bottom-0 left-1/2 -translate-x-1/2".split(" "));
//       // b
//       // banner.innerHTML = `<img loading="lazy" src="https://sv-bugio.xyz/uploads/resources/images/3115e8f168b528b3bc29144f563377ba.gif?v=201509270216"/>`;
//       // document.querySelector("#jw-player")?.appendChild(banner);
//       // document.querySelector("#jw-player .jw-controlbar")?.classList.add("!top-0");
//       // console.log(banner);
//       // console.log("01301030");
//       const banner1 = document.createElement("a");
//       banner1.href = "https://6789x.site/ad9namei159";
//       banner1.classList.add("block", "w-full");
//       banner1.innerHTML = `<img loading="lazy" class="w-full" src="/banners/vs_1920x60.gif?v=201509270216"/>`;
//       group.appendChild(banner1);
//       console.log(banner1);
//       const banner2 = document.createElement("a");
//       banner2.href = "#combo2link";
//       banner2.classList.add("hidden", "w-full");
//       banner2.innerHTML = `<img loading="lazy" class="w-full" src="/banners/dola_1920x60.gif?v=201509270216"/>`;
//       group.appendChild(banner2);
//       console.log(banner2);
//       const banner3 = document.createElement("a");
//       banner3.href = "https://www.fb88alo.com/vi-VN/Account/Register?affiliateId=8627";
//       banner3.classList.add("hidden", "w-full");
//       banner3.innerHTML = `<img loading="lazy" class="w-full" src="/banners/fb88_1920x60.gif?v=201509270216"/>`;
//       group.appendChild(banner3);
//       console.log(banner3);
//       const banner4 = document.createElement("a");
//       banner4.href = "https://ok999.me/tamquoc";
//       banner4.classList.add("hidden", "w-full");
//       banner4.innerHTML = `<img loading="lazy" class="w-full" src="https://i.postimg.cc/y87XGz4C/bwing-1920x60.gif?v=201509270216"/>`;
//       group.appendChild(banner4);
//       console.log(banner4);
//       const banner5 = document.createElement("a");
//       banner5.href = "https://bit.ly/4pHqPsO";
//       banner5.classList.add("hidden", "w-full");
//       banner5.innerHTML = `<img loading="lazy" class="w-full" src="/banners/net88_1920x60.gif?v=201509270216"/>`;
//       group.appendChild(banner5);
//       document.querySelector("#jw-player")?.appendChild(group);
//       document.querySelector("#jw-player .jw-controlbar")?.classList.add("!top-0");
//       const banners = [banner1, banner2, banner4, banner3, banner5];
//       banners.forEach((b, i) => {
//         b.classList.toggle("hidden", i !== 0);
//       });
//       let currentIndex = 0;
//       setInterval(() => {
//         banners[currentIndex].classList.add("hidden");

//         currentIndex = (currentIndex + 1) % banners.length;

//         banners[currentIndex].classList.remove("hidden");
//       }, 5000);
//     });

//     playerInstance.on("play", () => {
//       console.log("Video started playing ▶️");
//     });

//     playerInstance.on("pause", () => {
//       console.log("Video paused ⏸️");
//     });

//     playerInstance.on("complete", () => {
//       console.log("Video playback complete ✅");
//     });

//     // Clean up
//     return () => {
//       try {
//         playerInstance.remove();
//       } catch (e) {
//         console.warn("Error removing JWPlayer instance:", e);
//       }
//     };
//   }, [streamSource, poster]);

//   return (
//     <div className={clsx("w-full rounded-[12px] overflow-hidden", popup && "!flex lg:!flex-1 !flex-col")}>
//       {/* Title */}
//       <div className={clsx("w-full bg-[#333] text-[#fff] px-3 py-2", popup && "!hidden")}>
//         <span className="text-[16px] font-semibold line-clamp-2">
//           {startTime} - {match?.title}
//         </span>
//       </div>

//       {/* Video player container */}
//       <div className={clsx(popup && "!flex-1 !overflow-hidden !bg-[#333]")}>
//         <div id="jw-player" className="aspect-video" ref={playerRef}></div>
//       </div>

//       {/* Footer */}
//       <div className={clsx("w-full bg-[#F8C32F] px-2 py-2 flex gap-4 justify-between items-center", popup && "!shrink-0")}>
//         <div className="flex gap-2">
//           <Link
//             to={`?server=FHD`}
//             className={clsx("py-1 px-2 bg-white text-gray-700 text-[14px] truncate font-semibold rounded-[6px]", server === "FHD" && "!bg-[#64FF43]")}
//           >
//             Full HD
//           </Link>
//           <Link
//             to={`?server=HD`}
//             className={clsx("py-1 px-2 bg-white text-gray-700 text-[14px] truncate font-semibold rounded-[6px]", server === "HD" && "!bg-[#64FF43]")}
//           >
//             HD
//           </Link>
//           <Link
//             to={`?server=SD`}
//             className={clsx("py-1 px-2 bg-white text-gray-700 text-[14px] truncate font-semibold rounded-[6px]", server === "SD" && "!bg-[#64FF43]")}
//           >
//             SD
//           </Link>
//         </div>
//         <div className="flex flex-row space-x-2">
//           {/* <a
//             href="https://www.fb88alo.com/vi-VN/Account/Register?affiliateId=8627"
//             target="_blank"
//             className="flex justify-center truncate items-center bg-[#00b327] hover:bg-[#c0a300] text-white rounded px-2 py-1 text-xs font-semibold"
//           >
//             CƯỢC FB88
//           </a> */}
//           <button className="bg-[#fff] hover:bg-[#ddd] rounded px-2 py-1" onClick={() => setPopup(!popup)}>
//             <MonitorUp />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const ChatboxElm = ({ popup, matchId }: { popup: boolean; matchId: number }) => {
//   const [activeTab, setActiveTab] = useState("tab1");
//   return (
//     <div
//       className={clsx(
//         "bg-[#F8C32F] border-t border-[#000] w-full flex flex-col rounded-[12px] overflow-hidden lg:max-w-[320px]",
//         popup && "!flex-1 !lg:flex-none"
//       )}
//     >
//       <div className="flex space-x-2 py-2 px-2 justify-start">
//         {[
//           { id: "tab1", label: "Chung" },
//           { id: "tab2", label: "Tóm tắt" },
//           { id: "tab3", label: "Thông số" },
//         ].map((tab) => (
//           <button
//             key={tab.id}
//             onClick={() => setActiveTab(tab.id)}
//             className={`px-4 py-1.5 rounded-md text-xs font-semibold border
//               ${activeTab === tab.id ? "bg-blue-500 text-white" : "bg-white text-gray-800 border-gray-300"}`}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>
//       <div className="w-full bg-[#c39100] px-4 py-2 text-[12px] text-center flex flex-col">
//         <span>AE tham gia kênh Telegram nhé</span>
//         <a href="https://t.me/+dG3CQDx8gd4xYTNl" target="_blank" className="font-bold">
//           https://t.me/+dG3CQDx8gd4xYTNl
//         </a>
//       </div>
//       {/* Content */}
//       <div className={clsx("order rounded-md bg-gray-50 h-full", popup && "!flex-1")}>
//         {activeTab === "tab1" && (
//           <div className={clsx("w-full", popup ? "!h-full" : "h-[320px]", "lg:h-full")}>
//             <iframe width="100%" height="100%" src="https://www5.cbox.ws/box/?boxid=957825&boxtag=aSRcee" frameBorder="0"></iframe>
//           </div>
//         )}
//         {activeTab === "tab2" && (
//           <div className={clsx("w-full", popup ? "!h-full" : "h-[320px]", "lg:h-full")}>
//             <iframe src={`https://widget-events.livestats.online/?fixtureId=${matchId}`} frameBorder={0} width="100%" height="100%"></iframe>
//           </div>
//         )}
//         {activeTab === "tab3" && (
//           <div className={clsx("w-full", popup ? "!h-full" : "h-[320px]", "lg:h-full")}>
//             <iframe
//               src={`https://widget-statistics.livestats.online/?fixtureId=${matchId}&homeColor=%23F8C32F&awayColor=%2322883e`}
//               frameBorder={0}
//               width="100%"
//               height="100%"
//             ></iframe>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default function PlayerAndChatboxElm({ match }: { match: Match }) {
//   // console.log("s", match);
//   const [popup, setPopup] = useState(false);
//   return (
//     <div className={clsx("w-full flex flex-col h-auto lg:!flex-row", popup && "!fixed !h-screen !top-0 !left-0 !z-[100]", popup ? "!gap-0" : "gap-2")}>
//       {match.isPlaying ? (
//         <Video match={match} poster={"/assets/images/poster.png"} popup={popup} setPopup={setPopup} />
//       ) : (
//         <div className={clsx("w-full rounded-[12px] overflow-hidden", popup && "!flex lg:!flex-1 !flex-col")}>
//           <img loading="lazy" className="w-full h-full block" src="/assets/images/poster.png" alt="" />
//         </div>
//       )}
//       <ChatboxElm popup={popup} matchId={match.referenceId || 0} />
//     </div>
//   );
// }
