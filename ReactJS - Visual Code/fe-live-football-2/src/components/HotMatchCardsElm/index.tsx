import clsx from "clsx";
import { Match } from "../../types/Match.type";
import { Gamepad2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import adButtons from "../../data/adButtons";

// const matches: Match[] = [
//   {
//     id: 1,
//     isHot: true,
//     slug: "man-utd-vs-arsenal",
//     league: "Premier League",
//     startTime: "2025-05-04T19:00:00Z",
//     status: "live",
//     homeClub: {
//       name: "Manchester United",
//       logo: "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg",
//     },
//     awayClub: {
//       name: "Arsenal",
//       logo: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
//     },
//     score: { home: 2, away: 1 },
//     m3u8: "https://example.com/streams/manutd-arsenal.m3u8",
//     commentator: "BLV Quang Huy",
//   },
//   {
//     id: 2,
//     isHot: false,
//     slug: "chelsea-vs-tottenham",
//     league: "Premier League",
//     startTime: "2025-05-04T21:00:00Z",
//     status: "upcoming",
//     homeClub: {
//       name: "Chelsea",
//       logo: "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg",
//     },
//     awayClub: {
//       name: "Tottenham Hotspur",
//       logo: "https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg",
//     },
//     score: { home: 0, away: 0 },
//     m3u8: null,
//     commentator: "BLV Anh Quân",
//   },
// ];

const HotMatchCardElm = (match: Match) => {
  const startDate = new Date(match.startTime).toLocaleDateString();
  const startTime = new Date(match.startTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const [elapsed, setElapsed] = useState(match.elapsed || 0);
  const statusText = match.isPlaying
    ? (() => {
        const status = match.status || "Đang diễn ra";

        if (match.shortStatus && match.elapsed != null) {
          if (["1H", "2H", "ET"].includes(match.shortStatus)) {
            const safeElapsed = match.shortStatus === "1H" ? (elapsed > 45 ? "45+'" : `${elapsed}'`) : elapsed > 90 ? "90+'" : `${elapsed}'`;
            return `${status} - ${safeElapsed}`;
          } else {
            return `${status}`;
          }
        }
        return `${status} - ${startTime}`;
      })()
    : "Chưa bắt đầu";
  const statusColor = match.isPlaying ? "bg-red-600" : "bg-yellow-400";
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 60000);
    return () => clearInterval(interval); // 🧹 Cleanup khi component unmount
  }, []);
  return (
    <Link
      to={`/truc-tiep/${match.slug}-I${match.id}`}
      className="w-full relative border-y-[2px] pt-[32px] pb-[40px] rounded-[12px] border-[#F8C32F] bg-[#FFFFFF75] shadow-lg border border-x"
    >
      <div className="absolute -top-[2px] h-32px flex items-center justify-between w-full h-[32px] gap-2 z-10 ">
        <div className={clsx("h-full text-white px-2.5 flex items-center text-[12px] rounded-tl-[10px] rounded-br-[10px]", statusColor)}>
          <span className={clsx(match.status === "live" && "animate-pulse")}>{statusText}</span>
        </div>
        <div className="h-full bg-gradient-to-r from-[#F8C32F] to-[#B1381A80] text-white px-2 flex items-center text-[12px] rounded-bl-[10px] rounded-tr-[12px] font-semibold">
          {match.league}
        </div>
      </div>
      <div className="w-full grid grid-cols-[1fr_auto_1fr] items-center gap-2 my-2">
        <div className="flex flex-col gap-[8px] items-center justify-center">
          <img loading="lazy" src={match.homeClub?.logo} className="w-[40px] h-[40px] lg:w-[64px] lg:h-[64px] rounded-full" />
          <span className="text-sm font-medium text-center line-clamp-1">{match.homeClub?.name}</span>
        </div>
        <div className="flex items-center h-full justify-center">
          {match.isPlaying ? (
            <div className="px-3 py-1 bg-white border border-gray-300 rounded text-lg font-bold">
              {match.score ? (
                <>
                  <span className="text-red-500">{match.score.home}</span>
                  <span className="mx-1">:</span>
                  <span className="text-gray-700">{match.score.away}</span>
                </>
              ) : (
                <span>VS</span>
              )}
            </div>
          ) : (
            <div className="text-sm font-medium text-gray-700 flex flex-col items-center">
              <span>{startTime}</span>
              <span>{startDate}</span>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-[8px] items-center justify-center">
          <img loading="lazy" src={match.awayClub?.logo} className="w-[40px] h-[40px] lg:w-[64px] lg:h-[64px] rounded-full" />
          <span className="text-sm font-medium text-center line-clamp-1">{match.awayClub?.name}</span>
        </div>
      </div>
      <div className="w-full flex justify-between h-[40px] absolute bottom-0 pb-[8px] px-[8px]">
        <div className="bg-[#616161] rounded h-full overflow-hidden flex items-center">
          <img loading="lazy" className="h-full aspect-square bg-white" src={match.commentator.avatar || "/favicon.png"} alt="" />
          <span className="text-[11px] font-semibold text-white px-2">{match.commentator.nickname}</span>
        </div>
        <button
          data-href={adButtons.GLOBAL.href}
          onClick={(e) => {
            e.preventDefault();
            window.open(e.currentTarget.dataset.href, "_blank");
          }}
          className="bg-gradient-to-r from-[#FFBF00] to-[#B1381A] text-white rounded h-full flex items-center justify-center gap-1 px-2"
        >
          <Gamepad2 />
          <span className="text-[12px] font-semibold">{adButtons.GLOBAL.text}</span>
        </button>
      </div>
    </Link>
  );
};

export default function HotMatchCardsElm({ matches }: { matches: Match[] }) {
  return (
    <div className={clsx("w-full mt-2 grid gap-1 lg:gap-2", matches.length === 1 ? "grid-cols-1 place-items-center" : "grid-cols-1 lg:grid-cols-2")}>
      {matches.map((match) => (
        <HotMatchCardElm key={`hotMatch-${match.id}`} {...match} />
      ))}
    </div>
  );
}
