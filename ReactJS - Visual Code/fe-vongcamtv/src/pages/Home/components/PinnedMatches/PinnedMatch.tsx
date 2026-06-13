import clsx from "clsx";
// import { Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import type { Match } from "../../../../types/Match.type";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
const PinnedMatch = ({ match }: { match: Match }) => {
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
    <div
      className={clsx(
        "w-full relative overflow-hidden",
        "border border-[#96C052]/50",
        "rounded-xl",
        "bg-[url('/bg-pinned-match.jpg')] bg-cover bg-center bg-no-repeat",
        "text-white",
      )}
    >
      <Link to={`/truc-tiep/${match.slug}/${match.id}`} className="absolute inset-0 z-10"></Link>
      <div className="absolute bottom-2 lt:bottom-4 left-0 inset-x-0 z-20 flex gap-2 justify-center items-center pointer-events-none select-none">
        <a
          href="https://www.fb88alo.com/?affiliateId=8623"
          target="_blank"
          className={clsx(
            "flex items-center gap-1 px-4 h-[28px] w-fit",
            "border-2 border-yellow-100 bg-gradient-to-l from-[#243F0D] to-[#5EA522] rounded-full",
            "text-white text-xs font-[500]",
            "pointer-events-auto",
          )}
        >
          {/* <Trophy size={16} /> */}
          <span>Đặt cược</span>
        </a>
        <div className="flex w-fit h-[24px] items-center bg-[#232324] rounded-full">
          <img className="h-full aspect-square ring-1 ring-white rounded-full" src={match.commentator.avatar} alt="" />
          <span className="text-xs px-2">{match.commentator.nickname}</span>
        </div>
        <a
          href="https://6789x.site/ad9namei200"
          target="_blank"
          className={clsx(
            "flex items-center gap-1 px-4 h-[28px] w-fit",
            "border-2 border-yellow-100 bg-gradient-to-l from-[#243F0D] to-[#5EA522] rounded-full",
            "text-white text-xs font-[500]",
            "pointer-events-auto",
          )}
        >
          {/* <Trophy size={16} /> */}
          <span>Đặt cược</span>
        </a>
      </div>
      <div className="w-full px-2 pt-2 lt:px-4 lt:pt-4 pb-[52px] lt:pb-[60px] flex flex-col gap-6">
        <div className="w-full flex justify-between items-center space-x-2">
          {match.isPlaying ? (
            <div className="w-fit top-2 left-2 bg-red-600 text-xs px-2 py-1 rounded-full uppercase">
              <span className="animate-pulse">{statusText}</span>
            </div>
          ) : (
            <div className="w-fit top-2 left-2 bg-[#5EA522] text-xs px-2 py-1 rounded-full uppercase">
              <span>{statusText}</span>
            </div>
          )}
          <div
            className={clsx(
              "flex-1",
              "px-2 py-0.5 top-2 right-2 text-center text-sm truncate",
              "border border-[#96C052]/75",
              "bg-[#96C052]/20",
              "rounded-full",
            )}
          >
            {match.league}
          </div>
        </div>
        <div className={clsx("flex flex-col items-center justify-center", "px-2")}>
          <div className="w-full grid grid-cols-[1fr_auto_1fr] items-center gap-4">
            <div className="w-full flex flex-col space-y-1 justify-center items-center min-w-0">
              <img className="w-[50px] h-[50px] aspect-square" src={match.homeClub.logo} alt="" />
              <span className="w-full text-sm text-center truncate">{match.homeClub.name}</span>
            </div>
            {match.isPlaying ? (
              <div className="inline-flex space-x-1 border-2 py-1 px-2 rounded-lg border-[#96C052]/75 bg-[#96C052]/20 text-2xl">
                <b>{match.score?.home}</b>
                <span>-</span>
                <b>{match.score?.away}</b>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <p className="font-semibold text-[20px]">{onlyTime}</p>
                <p>{onlyDate}</p>
              </div>
            )}

            <div className="flex flex-col space-y-1 justify-center items-center min-w-0">
              <img className="w-[50px] h-[50px] aspect-square" src={match.awayClub.logo} alt="" />
              <span className="w-full text-sm text-center truncate">{match.awayClub.name}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PinnedMatch;
