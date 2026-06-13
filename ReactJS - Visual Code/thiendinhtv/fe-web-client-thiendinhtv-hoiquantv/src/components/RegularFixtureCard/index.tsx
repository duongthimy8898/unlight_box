import { Link } from "react-router-dom";
import type { Fixture } from "../../types/Fixture";
import dayjs from "dayjs";
import { useDataContext } from "../../hooks/useDataContext";
// import { useState } from "react";
// import clsx from "clsx";

const RegularFixtureCard = ({ fixture }: { fixture: Fixture }) => {
  // const [showTooltip, setShowTooltip] = useState(false);
  const { fixturesStats } = useDataContext();
  const fixtureStat = fixturesStats.data?.find((stat) => stat.fixture.id.toString() === fixture.referenceId);
  return (
    <Link
      to={`/xem-truc-tiep/${fixture.sport.slug}/${fixture.league.slug}/${fixture.slug}`}
      className="block w-full border-2 border-[#3B3A41] rounded-[16px] overflow-hidden"
      style={{
        backgroundImage: "url('/bg-fixture-card.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="w-full p-4 flex flex-col gap-8"
        style={{
          background: "radial-gradient(ellipse at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,1) 100%)",
        }}
      >
        <div className="w-full flex flex-row justify-between items-center">
          <div className="flex flex-col justify-center">
            <div className="flex flex-row items-center space-x-1.5">
              {fixture.isLive ? (
                <span className="px-2 py-0.5 text-xs font-semibold text-white bg-red-500 rounded">● Live</span>
              ) : (
                <span className="px-2 py-0.5 text-xs font-semibold text-white bg-gray-500 rounded">Sắp diễn ra</span>
              )}
              <span className="text-[18px] font-bold">{dayjs(fixture.startTime).format("HH:mm")}</span>
              <span className="px-2 text-sm font-semibold text-black bg-[#C4E456] rounded">{dayjs(fixture.startTime).format("DD/MM")}</span>
            </div>
            <p className="text-sm">{fixture.league.name}</p>
          </div>
          <img src={fixture.sport.iconUrl} alt="" className="w-[36px] h-[36px]" />
        </div>
        <div className="w-full flex flex-row justify-between items-center gap-4">
          <div className="flex space-x-4">
            <img src={fixture.homeTeam.logoUrl} alt="" className="w-[48px] h-[32px] rounded object-contain" />
            <img src={fixture.awayTeam.logoUrl} alt="" className="w-[48px] h-[32px] rounded object-contain" />
          </div>
          <div className="flex flex-col gap-1 items-center justify-center">
            {fixture.isLive ? (
              <div className="flex flex-row gap-2 items-center justify-center">
                <p className="font-semibold text-xs">
                  {fixtureStat
                    ? (() => {
                        const { short, elapsed, extra } = fixtureStat.fixture.status;
                        const extraText = extra ? `+${extra}` : "";
                        return `${short} - ${elapsed}${extraText}'`;
                      })()
                    : "---"}
                </p>
                <div className="border-2 border-red-500 rounded-[12px] px-4 py-1 space-x-1">
                  <b className="text-[16px] font-bold">{fixtureStat?.goals?.home ?? "0"}</b>
                  <span className="text-[16px] font-bold">-</span>
                  <b className="text-[16px] font-bold">{fixtureStat?.goals?.away ?? "0"}</b>
                </div>
              </div>
            ) : (
              <div className="border-2 border-[#3B3A41] rounded-[12px] px-4 py-1">
                <span className="text-[16px] font-bold">VS</span>
              </div>
            )}
          </div>
        </div>
        <div className="w-full flex flex-row gap-2 justify-between items-center">
          <div className="flex-shrink-0 max-w-[50%] flex-1 flex flex-col gap-1 justify-center">
            <span className="w-full font-semibold text-start text-sm truncate">{fixture.homeTeam.name}</span>
            <span className="w-full font-semibold text-start text-sm truncate">{fixture.awayTeam.name}</span>
          </div>
          <div className="flex flex-row gap-2 flex-shrink-0 max-w-[50%]">
            <div className="w-full flex flex-row items-center rounded-lg bg-[#C4E456] overflow-hidden">
              <img
                src={fixture.fixtureCommentators.at(0)?.commentator.avatarUrl ?? "/favicon.png"}
                alt=""
                className="w-9 h-9 border-0 border-[#C4E456] block bg-[#141414]"
              />
              <span className="w-full flex-1 py-1.5 px-3 block text-xs font-semibold text-black truncate">
                {fixture.fixtureCommentators.at(0)?.commentator.nickname}
                {fixture.fixtureCommentators.length > 1 && ` +${fixture.fixtureCommentators.length - 1} BLV khác`}
              </span>
            </div>
            {/* <div className="relative" onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
              <img
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                src={fixture.fixtureCommentators.at(0)?.commentator.avatarUrl}
                alt=""
                className="w-9 h-9 rounded-lg block"
              />
              <span
                className={clsx(
                  "absolute z-10 right-0 bottom-full bg-gray-800 text-white text-sm px-3 py-1 rounded-md opacity-0 transition-opacity duration-200 whitespace-nowrap",
                  showTooltip && "!opacity-100"
                )}
              >
                {fixture.fixtureCommentators.at(0)?.commentator.nickname}
                {fixture.fixtureCommentators.length > 1 && ` +${fixture.fixtureCommentators.length - 1} BLV khác`}
              </span>
            </div>

            <button
              onClick={(e) => {
                e.preventDefault();
                window.open("https://www.sv368cpc1.vip/register?affiliateCode=footballsv368", "_blank");
              }}
              className="py-1.5 px-3 rounded text-xs font-semibold bg-[#C4E456] text-black"
            >
              <span>Đặt cược</span>
            </button> */}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RegularFixtureCard;
