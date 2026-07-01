import clsx from "clsx";
import type { Match } from "../../../../types/Match.type";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
const Match = ({ match }: { match: Match }) => {
  const onlyDate = new Date(match.startTime).toLocaleDateString("vi-VN", {
    year: "numeric", // 2025
    month: "numeric", // Tháng Năm
    day: "numeric", // 4
  });
  const onlyTime = new Date(match.startTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const [elapsed, setElapsed] = useState(match.elapsed || 0);
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 60000);
    return () => clearInterval(interval); // 🧹 Cleanup khi component unmount
  }, []);
  const statusText = match.isPlaying
    ? (() => {
        const status = "● " + (match.status || "Đang diễn ra");

        if (match.shortStatus && match.elapsed != null) {
          if (["1H", "2H", "ET"].includes(match.shortStatus)) {
            const safeElapsed =
              match.shortStatus === "1H" ? (elapsed > 45 ? "45+'" : `${elapsed}'`) : elapsed > 90 ? "90+'" : `${elapsed}'`;
            return `${status} - ${safeElapsed}`;
          } else {
            return `${status}`;
          }
        }
        return `${status} - ${onlyTime}`;
      })()
    : "Chưa bắt đầu";
  return (
    <Link
      to={`/truc-tiep/${match.slug}-I${match.id}`}
      className="w-full relative bg-[url('/bg-match-card.png')] bg-cover bg-center bg-no-repeat rounded-[12px] border-2 border-white overflow-hidden"
    >
      <div className="absolute top-0 w-full h-[32px]">
        <div
          className={clsx(
            "absolute top-0 left-0 h-full flex items-center px-2 text-[14px] rounded-tl-[8px] rounded-br-[8px] border-r-2 border-b-2 border-white",
            match.isPlaying ? "bg-red-500" : "bg-yellow-500"
          )}
        >
          {match.isPlaying ? <span className="break-all line-clamp-1 animate-pulse">{statusText}</span> : <span>{statusText}</span>}
        </div>
        <div
          className={clsx(
            "absolute top-0 right-0 h-full flex items-center px-2 text-[14px] rounded-tr-[8px] rounded-bl-[8px] border-l-2 border-b-2 border-white",
            "justify-center min-w-[96px] bg-gradient-to-r from-[#080247] to-[#2A4AE1]"
          )}
        >
          <span className="break-all line-clamp-1">{match.league}</span>
        </div>
      </div>
      <div className="w-full py-[calc(32px+8px)] md:py-[calc(32px+16px)] px-[8px] grid grid-cols-[1fr_auto_1fr]">
        <div className="flex flex-col gap-[8px] items-center justify-start">
          <img loading="lazy" src={match.homeClub.logo} className="w-[40px] h-[40px] md:w-[80px] md:h-[80px]" />
          <span className="text-[12px] md:text-[16px] font-semibold text-left line-clamp-2">{match.homeClub.name}</span>
        </div>
        <div className="flex items-center h-full justify-center">
          {match.isPlaying ? (
            match.score ? (
              <div className="px-3 py-0.5 bg-white border border-gray-300 rounded text-md font-bold">
                <span className="text-red-500">{match.score.home}</span>
                <span className="mx-1 text-black">-</span>
                <span className="text-gray-700">{match.score.away}</span>
              </div>
            ) : (
              <div className="px-3 py-0.5 bg-white border border-gray-300 rounded text-md font-bold">
                <span className="text-red-500">{0}</span>
                <span className="mx-1 text-black">-</span>
                <span className="text-gray-700">{0}</span>
              </div>
            )
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 text-[16px] md:text-[20px] font-semibold">
              <p>{onlyTime}</p>
              <p>{onlyDate}</p>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-[8px] items-center justify-start">
          <img loading="lazy" src={match.awayClub.logo} className="w-[40px] h-[40px] md:w-[80px] md:h-[80px]" />
          <span className="text-[12px] md:text-[16px] font-semibold text-right line-clamp-2">{match.awayClub.name}</span>
        </div>
      </div>
      <div className="absolute bottom-0 w-full h-[32px]">
        <div
          className={clsx(
            "absolute bottom-0 left-1/2 -translate-x-1/2 h-full flex items-center px-2 text-[14px] rounded-tr-[8px] rounded-tl-[8px] border-l-2 border-r-2 border-t-2 border-white",
            "justify-center min-w-[96px] bg-gradient-to-r from-[#080247] to-[#2A4AE1]"
          )}
        >
          <span className="break-all line-clamp-1">{match.commentator.nickname}</span>
        </div>
      </div>
    </Link>
  );
};
const PinnedMatches = ({ matches }: { matches: Match[] }) => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
      {matches.map((match) => (
        <Match key={match.id} match={match} />
      ))}
    </div>
  );
};

export default PinnedMatches;
