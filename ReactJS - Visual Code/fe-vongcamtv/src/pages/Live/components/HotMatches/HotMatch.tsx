import clsx from "clsx";
import { Link } from "react-router-dom";
import type { Match } from "../../../../types/Match.type";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const HotMatch = ({ match }: { match: Match }) => {
  const handleClick_betButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.open("https://6789x.site/ad9namei200", "_blank");
  };
  const date = dayjs(match.startTime);
  const onlyTime = date.format("HH:mm");
  const onlyDate = date.format("DD/MM");
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
        return `${status} - ${onlyTime}`;
      })()
    : "Chưa bắt đầu";
  return (
    <Link to={`/truc-tiep/${match.slug}/${match.id}`} className="w-full border border-[#96C0524D] rounded-lg bg-[#232324]">
      <div className="w-full p-2 flex space-x-2 justify-between items-center">
        <span className="flex-1 text-sm truncate">{match.league}</span>
        <div className="bg-[#181A1A] border-t-0 border-x border-b border-[#00AF2B] inline-flex items-center space-x-1 py-1 px-3 text-xs rounded-full">
          {match.isPlaying ? (
            // <>
            //   <span>HIỆP 1</span>
            //   <span>-</span>
            //   <span>45'</span>
            // </>
            <span>{statusText}</span>
          ) : (
            <>
              <span>{onlyTime}</span>
              <span>{onlyDate}</span>
            </>
          )}
        </div>
      </div>
      <div className="w-full px-2 py-2 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        <div className="w-full flex flex-col space-y-1 justify-center items-center min-w-0">
          <img className="w-[50px] h-[50px] aspect-square" src={match.homeClub.logo} alt="" />
          <span className="w-full text-sm text-center truncate">{match.homeClub.name}</span>
        </div>
        {match.isPlaying ? (
          <div className="inline-flex space-x-1 text-lg">
            <b>{match.score?.home}</b>
            <span>-</span>
            <b>{match.score?.away}</b>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <p className="font-semibold text-[20px]">vs</p>
          </div>
        )}
        <div className="flex flex-col space-y-1 justify-center items-center min-w-0">
          <img className="w-[50px] h-[50px] aspect-square" src={match.awayClub.logo} alt="" />
          <span className="w-full text-sm text-center truncate">{match.awayClub.name}</span>
        </div>
      </div>
      <div className="w-full flex gap-2 justify-between items-center px-2 py-2 border-t border-[#3A422D]">
        <div className="min-w-0 flex-1 inline-flex items-center space-x-1">
          <img className="flex-shrink-0 border border-[#3A422D] rounded-lg w-[32px] h-[32px] aspect-square" src={match.commentator.avatar} alt="" />
          <span className="flex-1 text-xs truncate">{match.commentator.nickname}</span>
        </div>
        <div className="flex-shrink-0 inline-flex items-center space-x-1 text-xs">
          {match.isPlaying ? (
            <div className="py-1 px-2 bg-red-600 text-white rounded">
              <span className="animate-pulse">● Trực tiếp</span>
            </div>
          ) : (
            <div className="py-1 px-2 bg-[#646871] text-white rounded">
              <span>Chưa diễn ra</span>
            </div>
          )}
          <button
            onClick={handleClick_betButton}
            className={clsx(
              "flex items-center gap-1 px-2 py-1 w-fit",
              "border border-white/50 bg-gradient-to-bl from-[#243F0D] to-[#5EA522] rounded",
              "text-white text-xs font-[500]",
              "pointer-events-auto"
            )}
          >
            {/* <Trophy size={16} /> */}
            <span>Đặt cược</span>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default HotMatch;
