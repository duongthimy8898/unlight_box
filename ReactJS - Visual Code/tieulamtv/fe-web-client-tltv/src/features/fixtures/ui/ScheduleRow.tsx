import { Link } from "@tanstack/react-router";
import type { Fixture } from "../../../shared/types/Fixture";
import clsx from "clsx";
import { formatTime } from "../../../shared/lib/dateFns";
import { useFixtures } from "../hooks";

const MatchRow = ({ fixture }: { fixture: Fixture }) => {
  const { data: stats } = useFixtures.listStats();
  const fixtureStats = stats?.find((fs) => fs.fixture.id === Number(fixture.referenceId));
  return (
    <Link
      to="/truc-tiep/$fixtureSlug"
      params={{ fixtureSlug: fixture.slug }}
      className={clsx(
        "grid grid-cols-1 md:grid-cols-[1fr_1fr_2fr] items-center py-4 not-last:border-b border-b-[#343434]",
      )}
    >
      <div className="flex flex-row justify-start items-center">
        <div className="flex flex-col text-base text-white px-4 shrink-0">
          <span>{formatTime(fixture.startTime, "HH:mm")}</span>
          <span>{formatTime(fixture.startTime, "dd/MM")}</span>
        </div>
        <div className="flex-1 flex flex-row items-center gap-1">
          <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#:r3u:)">
              <path
                d="M3.5 9H5.75C6.14782 9 6.52936 9.15804 6.81066 9.43934C7.09196 9.72064 7.25 10.1022 7.25 10.5V14.25C7.25 14.6478 7.09196 15.0294 6.81066 15.3107C6.52936 15.592 6.14782 15.75 5.75 15.75H3.5C3.10218 15.75 2.72064 15.592 2.43934 15.3107C2.15804 15.0294 2 14.6478 2 14.25V9C2 4.85775 5.35775 1.5 9.5 1.5C13.6423 1.5 17 4.85775 17 9V14.25C17 14.6478 16.842 15.0294 16.5607 15.3107C16.2794 15.592 15.8978 15.75 15.5 15.75H13.25C12.8522 15.75 12.4706 15.592 12.1893 15.3107C11.908 15.0294 11.75 14.6478 11.75 14.25V10.5C11.75 10.1022 11.908 9.72064 12.1893 9.43934C12.4706 9.15804 12.8522 9 13.25 9H15.5C15.5 7.4087 14.8679 5.88258 13.7426 4.75736C12.6174 3.63214 11.0913 3 9.5 3C7.9087 3 6.38258 3.63214 5.25736 4.75736C4.13214 5.88258 3.5 7.4087 3.5 9Z"
                fill="url(#:r3v:)"
              ></path>
            </g>
            <defs>
              <radialGradient
                id=":r3v:"
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
              <clipPath id=":r3u:">
                <rect width="18" height="18" fill="white" transform="translate(0.5)"></rect>
              </clipPath>
            </defs>
          </svg>
          <span className="text-xs text-white truncate">
            {fixture.fixtureCommentators?.at(0)?.commentator.nickname}
          </span>
        </div>
      </div>
      <div className="text-white text-base">{fixture.league.name}</div>
      <div className="flex flex-row justify-between items-stretch gap-4 text-white">
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex flex-row items-center gap-4">
            <img src={fixture.homeTeam.logoUrl} alt="" className="w-12 h-12 object-contain" />
            <strong className="font-bold">{fixture.homeTeam.name}</strong>
            <strong className="ml-auto font-bold">{fixtureStats?.goals.home ?? 0}</strong>
          </div>
          <div className="flex flex-row items-center gap-4">
            <img src={fixture.awayTeam.logoUrl} alt="" className="w-12 h-12 object-contain" />
            <strong className="font-bold">{fixture.awayTeam.name}</strong>
            <strong className="ml-auto font-bold">{fixtureStats?.goals.home ?? 0}</strong>
          </div>
        </div>
        <div className="shrink-0 flex flex-col items-start justify-center gap-6">
          <button className="shrink-0 px-4 py-1.5 rounded-full font-medium text-white text-xs bg-[#363636] whitespace-nowrap ml-auto">
            Xem ngay
          </button>
          <button className="shrink-0 px-4 py-1.5 rounded-full font-medium text-black text-xs bg-[#ffd000] whitespace-nowrap ml-auto">
            Đặt cược
          </button>
        </div>
      </div>
    </Link>
  );
};

export default MatchRow;
