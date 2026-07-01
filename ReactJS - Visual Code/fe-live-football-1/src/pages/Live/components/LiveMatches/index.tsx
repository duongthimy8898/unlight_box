import clsx from "clsx";
import type { Match } from "../../../../types/Match.type";
import { Link } from "react-router-dom";
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
  return (
    <Link
      to={`/truc-tiep/${match.slug}-I${match.id}`}
      className="w-full bg-[url('/bg-match-card.png')] bg-cover bg-center bg-no-repeat rounded-[12px] border border-white overflow-hidden"
    >
      <div className="w-full flex justify-between py-2 px-4 bg-gradient-to-r from-[#080247] to-[#2A4AE1] border-b-1 text-[14px]">
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
        <div className="text-[16px] font-bold rounded-[8px]">VS</div>
        <div className="flex flex-col gap-1 items-center justify-start">
          <img loading="lazy" src={match.awayClub.logo} className="w-[40px] h-[40px]" alt={match.awayClub.name} />
          <span className="text-[12px] font-semibold text-left line-clamp-1">{match.awayClub.name}</span>
        </div>
      </div>
      <div className="w-full flex justify-between pb-2 px-2 items-center whitespace-nowrap shrink-0">
        <div className={clsx("text-[12px] border-2 border-white rounded-[8px] px-2 py-1", match.status === "live" ? "bg-red-500" : "bg-yellow-500")}>
          <span>{match.status === "live" ? "● Trực tiếp" : "Chưa diễn ra"}</span>
        </div>
        <div className="">
          {/* <img loading="lazy" src={match.commentator.avatar} alt="" /> */}
          <span className="bg-gradient-to-r from-[#080247] to-[#2A4AE1] px-3 py-1.5 text-[12px] border-2 border-white rounded-full font-semibold whitespace-nowrap line-clamp-1">
            {match.commentator.nickname}
          </span>
        </div>
        <button
          className={clsx("text-[12px] border-2 border-white font-semibold text-black rounded-[8px] px-2 py-1 bg-yellow-500 whitespace-nowrap shrink-0")}
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
const LiveMatches = ({ matches }: { matches: Match[] }) => {
  return (
    <>
      <div className={clsx("bg-gradient-to-r from-[#080247] via-[#2A4AE1] to-[#080247]", "w-fit px-3 py-1.5 text-[20px] font-semibold rounded-[8px] mb-2")}>
        TRẬN ĐANG DIỄN RA
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {matches.map((match) => (
          <Match key={match.id} match={match} />
        ))}
      </div>
    </>
  );
};

export default LiveMatches;
