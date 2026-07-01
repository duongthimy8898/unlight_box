import clsx from "clsx";
import type { Match } from "../../../../types/Match.type";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import adButtons from "../../../../data/adButtons";
const Match = ({ match }: { match: Match }) => {
  console.log(match.startTime);
  const onlyDate = new Date(match.startTime).toLocaleDateString("vi-VN", {
    weekday: "short", // 2025
    month: "long", // Tháng Năm
    day: "numeric", // 4
  });
  // console.log(onlyDate)
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
        return `${status}`;
      })()
    : "Chưa bắt đầu";
  return (
    <Link
      to={`/truc-tiep/${match.slug}-I${match.id}`}
      className="w-full bg-[url('/bg-match-card.png')] bg-cover bg-center bg-no-repeat rounded-[12px] border border-white overflow-hidden"
    >
      <div className="w-full flex justify-between py-2 px-4 gap-2 bg-gradient-to-r from-[#080247] to-[#2A4AE1] border-b-1 text-[12px] md:text-[14px]">
        <span className="font-semibold break-all line-clamp-1">{match.league}</span>
        <div className="flex gap-1 whitespace-nowrap shrink-0">
          <span className="font-semibold">{onlyTime}</span>
          <span>{onlyDate}</span>
        </div>
      </div>
      <div className="w-full py-4 px-2 grid grid-cols-[1fr_auto_1fr] gap-6 items-center">
        <div className="flex flex-col gap-1 items-center justify-start">
          <img loading="lazy" src={match.homeClub.logo} className="w-[40px] h-[40px]" alt={match.homeClub.name} />
          <span className="text-[12px] font-semibold text-left line-clamp-1">{match.homeClub.name}</span>
        </div>
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
          <div className="text-[16px] font-bold rounded-[8px]">VS</div>
        )}
        <div className="flex flex-col gap-1 items-center justify-start">
          <img loading="lazy" src={match.awayClub.logo} className="w-[40px] h-[40px]" alt={match.awayClub.name} />
          <span className="text-[12px] font-semibold text-left line-clamp-1">{match.awayClub.name}</span>
        </div>
      </div>
      <div className="w-full grid grid-cols-[1fr_auto_1fr] gap-4 justify-between pb-2 px-2 items-center">
        <div
          className={clsx(
            "text-[12px] border-2 border-white rounded-[8px] px-2 py-1 whitespace-nowrap",
            match.isPlaying ? "bg-red-500" : "bg-yellow-500"
          )}
        >
          {match.isPlaying ? <span className="animate-pulse">{statusText}</span> : <span>{statusText}</span>}
        </div>
        {/* <img loading="lazy" src={match.commentator.avatar} alt="" /> */}
        <span className="bg-gradient-to-r from-[#080247] to-[#2A4AE1] px-3 py-1.5 text-[12px] border-2 border-white rounded-full font-semibold whitespace-nowrap line-clamp-1">
          {match.commentator.nickname}
        </span>
        <button
          className={clsx("text-[12px] border-2 border-white font-semibold text-black rounded-[8px] px-2 py-1 bg-yellow-500 whitespace-nowrap")}
          data-href={adButtons.GLOBAL.href}
          onClick={(e) => {
            e.preventDefault();
            window.open(e.currentTarget.dataset.href, "_blank");
          }}
        >
          <span>Đặt cược</span>
        </button>
      </div>
    </Link>
  );
};
const HotMatches = ({ matches }: { matches: Match[] }) => {
  return (
    <>
      <div className={clsx("bg-gradient-to-r from-[#080247] via-[#2A4AE1] to-[#080247]", "w-fit px-3 py-1.5 text-[20px] font-semibold rounded-[8px] mb-2")}>
        CÁC TRẬN ĐẤU HOT
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {matches.map((match) => (
          <Match key={match.id} match={match} />
        ))}
      </div>
    </>
  );
};

export default HotMatches;
