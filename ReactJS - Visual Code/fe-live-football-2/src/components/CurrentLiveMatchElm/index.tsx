import clsx from "clsx";
import { Match } from "../../types/Match.type";

export default function CurrentLiveMatchElm({ match }: { match: Match }) {
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
  console.log(match.elapsed);
  const statusText = match.isPlaying
    ? (() => {
        const status = match.status || "Đang diễn ra";

        if (match.shortStatus && match.elapsed != null) {
          if (["1H", "2H"].includes(match.shortStatus)) {
            const safeElapsed =
              match.shortStatus === "1H" ? (match.elapsed > 45 ? "45+'" : `${match.elapsed}'`) : match.elapsed > 90 ? "90+'" : `${match.elapsed}'`;
            return `${status} - ${safeElapsed}`;
          }
        }

        return `${status} - ${startTime}`;
      })()
    : `${startDate} - ${startTime}`;
  return (
    <div className="w-full bg-[#fff]/50 border-[4px] border-[#F8C32F] rounded-[12px] pt-[40px] px-[16px] pb-[16px] relative">
      {match.isHot && (
        <div className="absolute h-[24px] top-[8px] left-[8px] flex items-center gap-1">
          <img loading="lazy" src="/assets/images/hot-icon.png" className="w-[16px] h-[full]" alt="" />
          <span className="text-[12px] font-normal">TRẬN HOT</span>
        </div>
      )}
      <div
        className={clsx(
          "h-[40px] flex items-center px-4 font-semibold text-white text-[16px] rounded-tl-[12px] rounded-br-[12px] absolute -top-[4px] -left-[4px] bg-gradient-to-r",
          match.shortStatus === "NS" || match.shortStatus === null ? "bg-gradient-to-r from-[#F8C32F] to-[#B1381A]/50" : "from-[#ff0000] to-[#ff0000]"
        )}
      >
        {match.isPlaying ? (
          <span className="animate-pulse text-center w-full line-clamp-1 whitespace-nowrap text-sm">{statusText}</span>
        ) : (
          <span className="text-center w-full line-clamp-1 whitespace-nowrap text-sm">{statusText}</span>
        )}
      </div>
      <div className="h-[40px] max-w-[164px] flex items-center px-4 font-semibold text-white text-[16px] rounded-tr-[12px] rounded-bl-[12px] absolute -top-[4px] -right-[4px] bg-gradient-to-r from-[#F8C32F] to-[#B1381A]/50">
        <span className="text-center w-full truncate whitespace-nowrap">{match.league}</span>
      </div>
      <div className="w-full grid grid-cols-[1fr_auto_1fr]">
        <div className="w-full flex flex-col items-center justify-center gap-[8px]">
          <img loading="lazy" className="w-[80px] h-[80px] object-cover rounded-full" src={match.homeClub?.logo} alt="" />
          <span className="text-[16px] font-semibold text-[#2B2C2D] text-center line-clamp-1">{match.homeClub?.name}</span>
        </div>
        <div className="flex items-center h-full justify-center">
          {match.isPlaying ? (
            match.score !== null ? (
              <div className="px-3 py-0.5 bg-white border border-gray-300 rounded text-md font-bold">
                <span className="text-red-500">{match.score.home}</span>
                <span className="mx-1">:</span>
                <span className="text-gray-700">{match.score.away}</span>
              </div>
            ) : (
              <div className="px-3 py-0.5 bg-white border border-gray-300 rounded text-md font-bold text-red-500">
                <span className="text-red-500">0</span>
                <span className="mx-1"></span>
                <span className="text-gray-700">0</span>
              </div>
            )
          ) : (
            <div className="px-3 py-0.5 bg-white border-2 border-[#F8C32F] rounded-[8px] shadow-lg text-md font-bold text-red-500">VS</div>
          )}
        </div>
        <div className="w-full flex flex-col items-center justify-center gap-[8px]">
          <img loading="lazy" className="w-[80px] h-[80px] object-cover rounded-full" src={match.awayClub?.logo} alt="" />
          <span className="text-[16px] font-semibold text-[#2B2C2D] text-center line-clamp-1">{match.awayClub?.name}</span>
        </div>
      </div>
      <div className="w-full flex justify-center items-center mt-[16px]">
        <div className="bg-[#616161] rounded-[8px] h-full border border-[#616161] overflow-hidden flex items-center shadow">
          <img loading="lazy" className="h-[32px] aspect-square bg-[#fff]" src={match.commentator.avatar} alt="" />
          <span className="text-[14px] font-normal text-white px-4">{match.commentator.nickname}</span>
        </div>
      </div>
    </div>
  );
}
