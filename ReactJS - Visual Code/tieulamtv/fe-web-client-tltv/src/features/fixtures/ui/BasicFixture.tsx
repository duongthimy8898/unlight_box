import { Link } from "@tanstack/react-router";
import { Radio } from "lucide-react";
import { useFixtures } from "../hooks";
import { formatDateTime } from "../../../shared/lib/dateFns";
import type { Fixture } from "../../../shared/types/Fixture";

const BasicFixture = ({ fixture }: { fixture: Fixture }) => {
  const { data: stats } = useFixtures.listStats();
  const fixtureStats = stats?.find((fs) => fs.fixture.id === Number(fixture.referenceId));
  const firstCommentator = fixture.fixtureCommentators.at(0)?.commentator;
  const gradId = `bfix-grad-${fixture.id}`;
  const clipId = `bfix-clip-${fixture.id}`;

  return (
    <Link
      to="/truc-tiep/$fixtureSlug"
      params={{ fixtureSlug: fixture.slug }}
      className="block bg-[#1d1e23] rounded-[10px] text-white no-underline"
    >
      <div className="w-full flex flex-col">
        {/* League (left) + Sport (right) */}
        <div className="w-full py-4 px-4 flex justify-between">
          <div className="flex items-center space-x-1.5">
            <span className="text-xs font-normal">{fixture.league.name}</span>
          </div>
          <div className="flex items-center space-x-1">
            {fixture.sport.iconUrl && <img alt="" className="w-4 h-4" src={fixture.sport.iconUrl} />}
            <span className="text-xs font-light">{fixture.sport.name}</span>
          </div>
        </div>

        {/* Teams + Score */}
        <div className="w-full grid grid-cols-[1fr_auto_1fr] gap-6 px-2">
          <div className="w-full flex flex-col space-y-2 items-center overflow-hidden">
            <img
              src={fixture.homeTeam.logoUrl}
              alt={fixture.homeTeam.name}
              loading="lazy"
              className="w-12 h-12 object-contain"
            />
            <span className="w-full text-center text-xs font-medium truncate">{fixture.homeTeam.name}</span>
          </div>

          <div className="flex flex-col items-center space-y-2">
            {fixture.isLive ? (
              <div className="bg-[#ef4444] px-2 h-5 flex justify-center items-center rounded-full space-x-1">
                <Radio size={12} />
                <span className="text-[11px] font-normal">
                  {!fixtureStats?.fixture?.status || !fixtureStats.fixture.status.elapsed
                    ? "Live"
                    : ["HT", "FT", "PEN"].includes(fixtureStats.fixture.status.short)
                      ? fixtureStats.fixture.status.short
                      : `${fixtureStats.fixture.status.elapsed}${fixtureStats.fixture.status.extra ? "+'" : "'"}`}
                </span>
              </div>
            ) : (
              <div className="bg-[#343643] px-2 h-5 flex justify-center items-center rounded-full">
                <span className="text-[11px] font-normal">Sắp diễn ra</span>
              </div>
            )}
            <div className="flex justify-center items-center space-x-1 leading-none">
              <span className="text-[24px] font-semibold">{fixtureStats?.goals.home ?? 0}</span>
              <span className="text-[24px]">-</span>
              <span className="text-[24px] font-semibold">{fixtureStats?.goals.away ?? 0}</span>
            </div>
            <div className="leading-none text-sm">
              <span className="font-semibold">{formatDateTime(fixture.startTime, "HH:mm dd/MM/yyyy")}</span>
            </div>
          </div>

          <div className="w-full flex flex-col space-y-2 items-center overflow-hidden">
            <img
              src={fixture.awayTeam.logoUrl}
              alt={fixture.awayTeam.name}
              loading="lazy"
              className="w-12 h-12 object-contain"
            />
            <span className="w-full text-center text-xs font-medium truncate">{fixture.awayTeam.name}</span>
          </div>
        </div>

        {/* Commentator + Bet button */}
        <div className="w-full py-4 px-4 gap-2 flex justify-between items-center">
          {firstCommentator && (
            <div className="flex items-center space-x-1 min-w-0 overflow-hidden">
              <svg width="19" height="18" viewBox="0 0 19 18" fill="none" className="shrink-0">
                <g clipPath={`url(#${clipId})`}>
                  <path
                    d="M3.5 9H5.75C6.14782 9 6.52936 9.15804 6.81066 9.43934C7.09196 9.72064 7.25 10.1022 7.25 10.5V14.25C7.25 14.6478 7.09196 15.0294 6.81066 15.3107C6.52936 15.592 6.14782 15.75 5.75 15.75H3.5C3.10218 15.75 2.72064 15.592 2.43934 15.3107C2.15804 15.0294 2 14.6478 2 14.25V9C2 4.85775 5.35775 1.5 9.5 1.5C13.6423 1.5 17 4.85775 17 9V14.25C17 14.6478 16.842 15.0294 16.5607 15.3107C16.2794 15.592 15.8978 15.75 15.5 15.75H13.25C12.8522 15.75 12.4706 15.592 12.1893 15.3107C11.908 15.0294 11.75 14.6478 11.75 14.25V10.5C11.75 10.1022 11.908 9.72064 12.1893 9.43934C12.4706 9.15804 12.8522 9 13.25 9H15.5C15.5 7.4087 14.8679 5.88258 13.7426 4.75736C12.6174 3.63214 11.0913 3 9.5 3C7.9087 3 6.38258 3.63214 5.25736 4.75736C4.13214 5.88258 3.5 7.4087 3.5 9Z"
                    fill={`url(#${gradId})`}
                  />
                </g>
                <defs>
                  <radialGradient
                    id={gradId}
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(20.951 21.5391) rotate(-172.469) scale(18.6862 24.4664)"
                  >
                    <stop offset="0.496798" stopColor="#FFC400" />
                    <stop offset="0.530846" stopColor="#FFD500" />
                    <stop offset="0.794704" stopColor="#FFC400" />
                    <stop offset="0.881389" stopColor="#FFD000" />
                    <stop offset="1" stopColor="#FFBB00" />
                  </radialGradient>
                  <clipPath id={clipId}>
                    <rect width="18" height="18" fill="white" transform="translate(0.5)" />
                  </clipPath>
                </defs>
              </svg>
              <span className="text-xs font-medium truncate">{firstCommentator.nickname}</span>
            </div>
          )}
          <div className="shrink-0 px-4 py-1.5 rounded-full font-medium text-black text-xs bg-[#ffd000] whitespace-nowrap ml-auto">
            Đặt cược
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BasicFixture;
