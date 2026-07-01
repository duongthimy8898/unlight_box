import clsx from "clsx";
import type { Match } from "../../../../types/Match.type";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import adButtons from "../../../../data/adButtons";
const Match = ({ match }: { match: Match }) => {
  const onlyDate = new Date(match.startTime).toLocaleDateString("vi-VN", {
    weekday: "short", // 2025
    month: "long", // Tháng Năm
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
            const safeElapsed = match.shortStatus === "1H" ? (elapsed > 45 ? "45+'" : `${elapsed}'`) : elapsed > 90 ? "90+'" : `${elapsed}'`;
            return `${status} - ${safeElapsed}`;
          } else {
            return `${status}`;
          }
        }
        return `${status} - ${onlyTime}`;
      })()
    : "Chưa bắt đầu";
  return (
    <Link to={`/truc-tiep/${match.slug}-I${match.id}`} className="w-full bg-gradient-to-r from-[#080247] via-[#2A4AE1] to-[#080247] border-b border-yellow-500">
      <div className="w-full px-6 py-6 grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] justify-between items-center gap-4">
        <div className="w-full flex flex-row justify-between gap-2 lg:flex-col">
          <div className="flex flex-row gap-1 whitespace-nowrap">
            <span className="font-semibold">{onlyTime}</span>
            <span className="font-normal">{onlyDate}</span>
          </div>
          <span className="text-[14px] font-normal whitespace-nowrap line-clamp-1">{match.league}</span>
        </div>
        <div className="grid grid-cols-[1fr_auto_1fr] gap-6 items-center">
          <div className="flex flex-row justify-end gap-2 items-center">
            <img loading="lazy" className="w-[45px] h-[45px]" src={match.homeClub.logo} alt="" />
            <span className="text-[14px] font-semibold text-left line-clamp-1">{match.homeClub.name}</span>
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
            <span className="text-[14px] font-bold rounded-[8px] bg-white text-black py-1 px-4">VS</span>
          )}

          <div className="flex flex-row justify-start gap-2 items-center">
            <span className="text-[14px] font-semibold text-left line-clamp-1">{match.awayClub.name}</span>
            <img loading="lazy" className="w-[45px] h-[45px]" src={match.awayClub.logo} alt="" />
          </div>
        </div>
        <div className="flex-shrink-0 flex flex-row justify-between lg:justify-end gap-2">
          <div className={clsx("text-[12px] border-2 border-white rounded-[8px] px-2 py-1 whitespace-nowrap", match.isPlaying ? "bg-red-500" : "bg-gray-500")}>
            {match.isPlaying ? <span className="break-all line-clamp-1 animate-pulse">{statusText}</span> : <span>{statusText}</span>}
          </div>
          <button
            className={clsx("text-[12px] border-2 border-white font-semibold text-black rounded-[8px] px-2 py-1 bg-yellow-500")}
            data-href={adButtons.GLOBAL.href}
            onClick={(e) => {
              e.preventDefault();
              window.open(e.currentTarget.dataset.href, "_blank");
            }}
          >
            <span>Đặt cược</span>
          </button>
        </div>
      </div>
    </Link>
  );
};

const AllMatches = ({ matches, filter }: { matches: Match[]; filter: string }) => {
  return (
    <>
      <div className={clsx("bg-gradient-to-r from-[#080247] via-[#2A4AE1] to-[#080247]", "w-fit px-3 py-1.5 text-[20px] font-semibold rounded-[8px] mb-2")}>
        LỊCH THI ĐẤU
      </div>
      <div className="w-full flex flex-col">
        <div className="w-full flex flex-row overflow-x-auto bg-gradient-to-tr from-[#080247] to-[#2A4AE1]">
          <Link
            className={clsx(
              "flex px-4 py-2 text-[14px] border-b-2 border-transparent text-white font-semibold whitespace-nowrap",
              filter === "live" && "text-yellow-500 border-yellow-500"
            )}
            to="?filter=live"
          >
            ĐANG DIỄN RA
          </Link>
          <Link
            className={clsx(
              "flex px-4 py-2 text-[14px] border-b-2 border-transparent text-white font-semibold whitespace-nowrap",
              filter === "all" && "text-yellow-500 border-yellow-500"
            )}
            to="?filter=all"
          >
            TẤT CẢ
          </Link>
          <Link
            className={clsx(
              "flex px-4 py-2 text-[14px] border-b-2 border-transparent text-white font-semibold whitespace-nowrap",
              filter === "today" && "text-yellow-500 border-yellow-500"
            )}
            to="?filter=today"
          >
            HÔM NAY
          </Link>
          <Link
            className={clsx(
              "flex px-4 py-2 text-[14px] border-b-2 border-transparent text-white font-semibold whitespace-nowrap",
              filter === "tomorrow" && "text-yellow-500 border-yellow-500"
            )}
            to="?filter=tomorrow"
          >
            NGÀY MAI
          </Link>
        </div>
        {matches.map((match) => (
          <Match key={match.id} match={match} />
        ))}
      </div>
    </>
  );
};

export default AllMatches;
