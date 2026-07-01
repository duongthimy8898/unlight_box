/* eslint-disable no-constant-condition */
import { Link } from "react-router-dom";
import { Match } from "../../types/Match.type";
import { useEffect, useState } from "react";
import adButtons from "../../data/adButtons";

const MatchCardElm = (match: Match) => {
  const startDate = new Date(match.startTime).toLocaleDateString("vi-VN", {
    weekday: "short", // Thứ hai, ba, tư,...
    // year: "numeric", // 2025
    month: "long", // Tháng Năm
    day: "numeric", // 4
  });
  const startTime = new Date(match.startTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const [elapsed, setElapsed] = useState(match.elapsed || 0);
  useEffect(() => {
    const interval = setInterval(() => {
      // Hàm lặp lại mỗi 5 giây
      setElapsed((prev) => prev + 1);
    }, 60000); // 5000ms = 5s
    return () => clearInterval(interval); // 🧹 Cleanup khi component unmount
  }, []);
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
    : `${startDate} - ${startTime}`;
  return (
    <Link
      to={`/truc-tiep/${match.slug}-I${match.id}`}
      className="w-full border-[1px] py-4 px-4 rounded-[12px] border-[#F8C32F] bg-[#FFFFFF]/90 overflow-hidden"
    >
      <div className="flex justify-between items-center">
        {match.isPlaying && false ? (
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-normal text-[#FD2B15] mr-1">TRỰC TIẾP</span>
            <span className="w-1 h-1 bg-red-600 rounded-full animate-pulse"></span>
            {/* <span className="text-[16px] font-semibold">22'</span> */}
          </div>
        ) : (
          <div className="flex items-center gap-1.5">
            <span className="text-[16px] font-bold">{startTime}</span>
            <span className="text-[12px] font-normal">{startDate}</span>
          </div>
        )}
        <div className="font-normal text-[12px]">{match.league}</div>
      </div>
      <div className="w-full grid grid-cols-[1fr_auto_1fr] items-center gap-2 my-2">
        <div className="flex gap-[8px] items-center justify-start">
          <img loading="lazy" src={match.homeClub?.logo} className="w-[40px] h-[40px]" />
          <span className="text-xs font-normal text-left line-clamp-2">{match.homeClub?.name}</span>
        </div>
        <div className="flex items-center h-full justify-center">
          {match.isPlaying && match.score !== null ? (
            <div className="px-3 py-0.5 bg-white border border-gray-300 rounded text-md font-bold ">
              <span className="text-red-500">{match.score?.home}</span>
              <span className="mx-1">:</span>
              <span className="text-gray-700">{match.score?.away}</span>
            </div>
          ) : (
            <div className="px-3 py-0.5 bg-white border border-gray-300 rounded text-md font-bold text-gray-700">VS</div>
          )}
        </div>
        <div className="flex flex-row-reverse gap-[8px] items-center justify-start">
          <img loading="lazy" src={match.awayClub?.logo} className="w-[40px] h-[40px]" />
          <span className="text-xs font-normal text-right line-clamp-2">{match.awayClub?.name}</span>
        </div>
      </div>
      <div className="w-full flex flex-wrap items-center gap-[4px] justify-between pt-[8px]">
        {match.isPlaying ? (
          <div className="rounded-[6px] bg-[#E74040] text-white font-semibold border border-[#CF3F3F] px-3 py-1 whitespace-nowrap">
            <span className="animate-pulse text-[12px]">{statusText}</span>
          </div>
        ) : (
          <div className="rounded-[6px] font-semibold border border-[#2B2C2D80] px-3 py-1 whitespace-nowrap">
            <span className="text-[12px]">{match.status ?? "Chưa bắt đầu"}</span>
          </div>
        )}
        <div className="bg-[#616161] rounded-[6px] h-full border overflow-hidden flex items-center">
          <img loading="lazy" className="h-[28px] aspect-square bg-[#fff]" src={match.commentator.avatar || "/favicon.png"} alt="" />
          <span className="text-[11px] font-normal text-white px-2">{match.commentator.nickname}</span>
        </div>
        <button
          data-href={adButtons.GLOBAL.href}
          onClick={(e) => {
            e.preventDefault();
            window.open(e.currentTarget.dataset.href, "_blank");
          }}
          className="bg-gradient-to-b from-[#F8C32F] to-[#FFDD75] text-black rounded-[6px] border border-[#F8C32F] py-1 px-3"
        >
          <span className="text-[12px] font-semibold text-[#2B2C2D]">{adButtons.GLOBAL.text}</span>
        </button>
      </div>
    </Link>
  );
};

export default function MatchCardsElm({ matches }: { matches: Match[] }) {
  return (
    <>
      <div className="flex gap-2 items-center my-6">
        <img loading="lazy" className="w-[32px] h-[32px] shrink-0 animate-spin" src="/assets/images/ball.png" alt="" />
        <span className="shrink-0 font-bold gray-500">TRẬN ĐẤU KHÁC</span>
        <span className="flex-1 border-t-2 border-gray-500"></span>
      </div>
      <div className="w-full mt-2 grid grid-cols-1 gap-1 lg:gap-2 lg:grid-cols-2 xl:gap-4 xl:grid-cols-3">
        {matches.map((match) => (
          <MatchCardElm key={`allMatch-${match.id}`} {...match}></MatchCardElm>
        ))}
      </div>
    </>
  );
}
