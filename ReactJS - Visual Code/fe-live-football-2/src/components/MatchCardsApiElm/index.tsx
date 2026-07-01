import { Link } from "react-router-dom";
import { Match } from "../../types/Match.type";
import { useEffect, useState } from "react";
import adButtons from "../../data/adButtons";

const MatchCardApi = (match: Match) => {
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
    <>
      <Link to={`/truc-tiep/${match.slug}-I${match.id}`} className="hidden lg:flex w-full rounded-lg border-2 border-gray-500 overflow-hidden">
        {/* <div className="py-2.5 w-36 flex flex-col justify-center items-center flex-shrink-0 bg-[url('/assets/images/blv-cover.jpg')] bg-cover bg-center">
          <img loading="lazy" className="w-10 h-10 rounded border-1 border-white" src={match.commentatorAvt} alt="" />
          <span className="text-sm text-white">{match.commentator}</span>
        </div> */}
        <div className="flex-1 py-4 px-3 bg-white grid grid-cols-[1fr_auto_1fr] gap-4 justify-between">
          <div className="flex flex-col justify-center">
            <span className="text-[20px] font-bold text-black">{startTime}</span>
            <span className="text-[12px] font-normal text-black">{startDate}</span>
            <span className="text-[12px] font-normal text-black">{match.league}</span>
          </div>
          <div className="grid grid-cols-[1fr_auto_1fr] gap-6 items-center">
            <div className="flex gap-2 items-center ">
              <img loading="lazy" className="w-12 h-12" src={match.homeClub?.logo || "/favicon.png"} alt="" />
              <span className="text-[12px] line-clamp-1">{match.homeClub?.name}</span>
            </div>
            {match.isPlaying && match.score !== null ? (
              <div className="px-3 py-0.5 bg-white border border-gray-300 rounded text-md font-bold text-red-500">
                <span className="text-red-500">{match.score?.home}</span>
                <span className="mx-1">:</span>
                <span className="text-gray-700">{match.score?.away}</span>
              </div>
            ) : (
              <div className="px-3 py-0.5 bg-white border border-gray-300 rounded text-md font-bold text-gray-700">VS</div>
            )}
            <div className="flex gap-2 items-center ">
              <span className="text-[12px] line-clamp-1">{match.awayClub?.name}</span>
              <img loading="lazy" className="w-12 h-12" src={match.awayClub?.logo || "/favicon.png"} alt="" />
            </div>
          </div>
          <div className="flex flex-col flex-shrink-0 justify-center items-end gap-2">
            {match.isPlaying ? (
              <button className="border border-[#2B2C2D80] bg-red-500 text-white rounded shadow px-4 py-2 text-xs whitespace-nowrap flex justify-center items-center gap-1">
                <span className="animate-pulse">{statusText}</span>
              </button>
            ) : (
              <button className="border border-[#2B2C2D80] rounded shadow px-4 py-2 text-xs whitespace-nowrap">Chưa bắt đầu</button>
            )}
            <button
              className="whitespace-nowrap border border-[#2B2C2D80] bg-gradient-to-b from-[#F8C32F] to-[#FFDD75] rounded shadow px-4 py-2 text-xs"
              data-href={adButtons.GLOBAL.href}
              onClick={(e) => {
                e.preventDefault();
                window.open(e.currentTarget.dataset.href, "_blank");
              }}
            >
              {adButtons.GLOBAL.text}
            </button>
          </div>
        </div>
      </Link>
      <Link
        to={`/truc-tiep/${match.slug}-I${match.id}`}
        className="lg:hidden w-full border-[1px] py-4 px-4 rounded-[12px] border-[#F8C32F] bg-[#FFFFFF]/90 overflow-hidden"
      >
        <div className="flex justify-between items-center">
          {match.isPlaying ? (
            <div className="flex items-center gap-2">
              <span className="w-1 h-1 bg-red-600 rounded-full animate-pulse"></span>
              <span className="text-[12px] font-normal uppercase text-[#FD2B15] ml-1">{statusText}</span>
              {/* {match.elapsed && <span className="text-[16px] font-semibold">{elapsed}'</span>} */}
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
              <div className="px-3 py-0.5 bg-white border border-gray-300 rounded text-md font-bold">
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
          {/* <button
            data-href="https://6789x.site/ad9namei159"
            onClick={(e) => {
              e.preventDefault();
              window.open(e.currentTarget.dataset.href, "_blank");
            }}
            className="bg-gradient-to-b from-[#F8C32F] to-[#FFDD75] text-black rounded-[6px] border border-[#F8C32F] py-1 px-3"
          >
            <span className="text-[12px] font-semibold text-[#2B2C2D]">Đặt cược</span>
          </button> */}
        </div>
      </Link>
    </>
  );
};

const MatchCardsApiElm = ({ matches }: { matches: Match[] }) => {
  return (
    <>
      {matches.map((match) => (
        <MatchCardApi key={`CardsApi123-${match.id}`} {...match} />
      ))}
    </>
  );
};

export default MatchCardsApiElm;
