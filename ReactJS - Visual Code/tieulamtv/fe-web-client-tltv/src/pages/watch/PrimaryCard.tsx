import clsx from "clsx";
import { Radio } from "lucide-react";
import type { Fixture } from "../../shared/types/Fixture";
import { useFixtures } from "../../features/fixtures/hooks";
import { formatDateTime } from "../../shared/lib/dateFns";

const PrimaryCard = ({ fixture }: { fixture: Fixture }) => {
  const { data: stats } = useFixtures.listStats();
  const fixtureStats = stats?.find((fs) => fs.fixture.id === Number(fixture.referenceId));
  return (
    <div
      className={clsx("block px-3 pt-3 lg:px-6 lg:pt-6 pb-1.5 bg-[#1d1e23] rounded-3xl", "flex flex-col", "text-white")}
    >
      <div className="grid grid-cols-3 items-center">
        <div className="flex flex-row items-center gap-1">
          <img src={fixture.sport.iconUrl} alt="" className="w-4 h-4" />
          <span className="text-xs font-light">{fixture.sport.name}</span>
        </div>
        <div className={clsx("text-center text-lg font-semibold")}>{fixture.league.name}</div>
      </div>
      {fixture.isLive ? (
        <div
          className={clsx(
            "mt-1 lg:mt-4 w-fit mx-auto py-0.5 px-2 bg-[#ef4444] rounded-full",
            "flex flex-row justify-center items-center gap-1",
          )}
        >
          <Radio size={16} />
          <span className="text-[11px] leading-4">
            {!fixtureStats?.fixture?.status || !fixtureStats.fixture.status.elapsed
              ? "Live"
              : ["HT", "FT", "PEN"].includes(fixtureStats.fixture.status.short)
                ? fixtureStats.fixture.status.short
                : `${fixtureStats.fixture.status.elapsed}${fixtureStats.fixture.status.extra ? "+'" : "'"}`}
          </span>
        </div>
      ) : (
        <div
          className={clsx(
            "mt-1 lg:mt-4 w-fit mx-auto py-0.5 px-2 bg-[#343643] rounded-full",
            "flex flex-row justify-center items-center gap-1",
          )}
        >
          <span className="text-[11px] leading-4">Sắp diễn ra</span>
        </div>
      )}
      <div className="grid grid-cols-[1fr_auto_1fr] gap-2.5 lg:gap-16 items-center">
        <div className={clsx("flex flex-col-reverse lg:flex-row items-center gap-6 overflow-hidden")}>
          <span
            className={clsx("flex-auto lg:flex-1", "text-center text-xs md:text-lg lg:text-2xl font-bold truncate")}
          >
            {fixture.homeTeam.name}
          </span>
          <img src={fixture.homeTeam.logoUrl} alt="" className="w-14 h-14 lg:w-16 lg:h-16 object-contain" />
        </div>
        <div className={clsx("flex flex-row gap-6", "text-[30px] md:text-[40px] lg:text-[50px] font-semibold")}>
          <strong className="">{fixtureStats?.goals.home ?? 0}</strong>
          <span className="">:</span>
          <strong className="">{fixtureStats?.goals.away ?? 0}</strong>
        </div>
        <div className={clsx("flex flex-col lg:flex-row items-center gap-6 overflow-hidden")}>
          <img src={fixture.awayTeam.logoUrl} alt="" className="w-14 h-14 lg:w-16 lg:h-16 object-contain" />
          <span
            className={clsx("flex-auto lg:flex-1", "text-center text-xs md:text-lg lg:text-2xl font-bold truncate")}
          >
            {fixture.awayTeam.name}
          </span>
        </div>
      </div>
      <div className={clsx("mb-4 lg:mb-0 w-fit mx-auto", "text-base font-semibold")}>
        {formatDateTime(fixture.startTime, "HH:mm dd/MM/yyyy")}
      </div>
      <div className="flex flex-row justify-between items-center">
        <div className={clsx("flex flex-row items-center gap-1")}>
          <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#:r4:)">
              <path
                d="M3.5 9H5.75C6.14782 9 6.52936 9.15804 6.81066 9.43934C7.09196 9.72064 7.25 10.1022 7.25 10.5V14.25C7.25 14.6478 7.09196 15.0294 6.81066 15.3107C6.52936 15.592 6.14782 15.75 5.75 15.75H3.5C3.10218 15.75 2.72064 15.592 2.43934 15.3107C2.15804 15.0294 2 14.6478 2 14.25V9C2 4.85775 5.35775 1.5 9.5 1.5C13.6423 1.5 17 4.85775 17 9V14.25C17 14.6478 16.842 15.0294 16.5607 15.3107C16.2794 15.592 15.8978 15.75 15.5 15.75H13.25C12.8522 15.75 12.4706 15.592 12.1893 15.3107C11.908 15.0294 11.75 14.6478 11.75 14.25V10.5C11.75 10.1022 11.908 9.72064 12.1893 9.43934C12.4706 9.15804 12.8522 9 13.25 9H15.5C15.5 7.4087 14.8679 5.88258 13.7426 4.75736C12.6174 3.63214 11.0913 3 9.5 3C7.9087 3 6.38258 3.63214 5.25736 4.75736C4.13214 5.88258 3.5 7.4087 3.5 9Z"
                fill="url(#:r5:)"
              ></path>
            </g>
            <defs>
              <radialGradient
                id=":r5:"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(20.951 21.5391) rotate(-172.469) scale(18.6862 24.4664)"
              >
                <stop offset="0.496798" stopColor="#FFC400"></stop>
                <stop offset="0.530846" stopColor="#FFD500"></stop>
                <stop offset="0.794704" stopColor="#FFC400"></stop>
                <stop offset="0.881389" stopColor="#FFD000"></stop>
                <stop offset="1" stopColor="#FFBB00"></stop>
              </radialGradient>
              <clipPath id=":r4:">
                <rect width="18" height="18" fill="white" transform="translate(0.5)"></rect>
              </clipPath>
            </defs>
          </svg>
          <span className="text-xs font-medium">{fixture.fixtureCommentators.at(0)?.commentator.nickname}</span>
        </div>
        <div className="flex flex-row items-center gap-2">
          <button className="shrink-0 px-4 py-1.5 rounded-full font-medium text-white text-xs bg-[#363636] whitespace-nowrap">
            Xem ngay
          </button>
          <button className="shrink-0 px-4 py-1.5 rounded-full font-medium text-black text-xs bg-[#ffd000] whitespace-nowrap">
            Đặt cược
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrimaryCard;
