import { Link } from "@tanstack/react-router";
import type { Fixture } from "../../../shared/types/Fixture";
import clsx from "clsx";
import { formatTime } from "../../../shared/lib/dateFns";
import { formatDate } from "date-fns";
import type { FixtureStats } from "../../../shared/types/FixtureStats";

const FixtureCard = ({ fixture, fixtureStats }: { fixture: Fixture; fixtureStats: FixtureStats | undefined }) => {
  return (
    <Link
      to="/truc-tiep/$slug/$id"
      params={{
        slug: fixture.slug,
        id: fixture.id,
      }}
      className={clsx(
        "w-full flex flex-col",
        "bg-linear-to-r from-[#ff5c8d66]/0 via-[#ff5c8d66]/80 to-[#ff5c8d66]/0",
        "border border-[#ff5c8d66]/40",
        "rounded-lg overflow-hidden",
        "hover:border-[#ff5c8d]/80 active:border-[#ff5c8d]/80",
        "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#ff5c8d]/30",
      )}
    >
      <div className="flex flex-col bg-[#191919]">
        <div className="flex flex-row justify-between items-center p-4">
          <time dateTime={fixture.startTime.toISOString()} className="w-1/3 flex flex-row justify-start items-stretch gap-1">
            <span className="text-sm font-semibold text-white">{formatTime(fixture.startTime, "HH:mm")}</span>
            <span className="inline-block bg-linear-to-b from-[#FFFFFF]/0 via-[#ff5c8d] to-[#FFFFFF]/0 w-0.5"></span>
            <span className="text-sm font-semibold text-white">{formatDate(fixture.startTime, "dd/MM")}</span>
          </time>
          <div className="w-1/3 flex flex-row items-center gap-1 justify-center">
            <img src={fixture.sport.iconUrl} alt="" className="size-4" />
            <span className="text-xs uppercase">{fixture.sport.name}</span>
          </div>
          <div className="w-1/3 text-end text-sm truncate">{fixture.league.name}</div>
        </div>
      </div>
      <div className="grid grid-cols-[1fr_auto_1fr] bg-[#191919] pb-4">
        <div className="flex flex-col items-center justify-center overflow-hidden">
          <img className="w-20 h-20 object-contain rounded-md p-2 bg-[#ffffff]/5" src={fixture.homeTeam.logoUrl} alt="" />
          <span className="text-sm text-white text-center mt-1 truncate">{fixture.homeTeam.name}</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          {fixture.isLive && (
            <p className="bg-linear-to-r from-[#DD1818]/0 via-[#DD1818] to-[#DD1818]/0 px-2 py-1 rounded-lg text-xs text-white flex items-center">
              <span className="bg-[#000000]/20 px-2 py rounded-sm">{fixtureStats?.fixture.status.short ?? "VS"}</span>
              {fixtureStats && (
                <span className="pl-2" hidden={fixtureStats?.fixture.status.elapsed === null}>
                  {fixtureStats
                    ? (() => {
                        const { elapsed, extra } = fixtureStats.fixture.status;
                        const extraText = extra ? `+${extra}` : "";
                        return `${elapsed ?? "0"}${extraText}'`;
                      })()
                    : "--"}
                </span>
              )}
            </p>
          )}
          <p className="bg-[#000000]/50 border-x border-pink-500 rounded-full px-4 flex flex-row items-center gap-2">
            {fixture.isLive ? (
              <>
                <strong>{fixtureStats?.goals.home ?? "---"}</strong>
                <span>:</span>
                <strong>{fixtureStats?.goals.away ?? "---"}</strong>
              </>
            ) : (
              <span className="font-bold">Vs</span>
            )}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center overflow-hidden">
          <img className="w-20 h-20 object-contain rounded-md p-2 bg-[#ffffff]/5" src={fixture.awayTeam.logoUrl} alt="" />
          <span className="text-sm text-white text-center mt-1 truncate">{fixture.awayTeam.name}</span>
        </div>
      </div>
      <div className="flex flex-row justify-between p-2 bg-[#0F0F0F] bg-clip-padding border-t border-t-transparent">
        <div className="flex flex-row items-center bg-pink-500 rounded-full">
          <img src={fixture.fixtureCommentators.at(0)?.commentator.avatarUrl} alt="" className="size-8 border border-white rounded-full" />
          <span className="text-white font-semibold text-sm px-2">{fixture.fixtureCommentators.at(0)?.commentator.nickname}</span>
        </div>
        <div className="flex flex-row items-center gap-2">
          {fixture.isLive ? (
            <span className="text-xs font-medium bg-red-600 rounded px-3 py-1 text-white">Trực tiếp</span>
          ) : (
            <span className="text-xs font-medium bg-slate-600 rounded px-3 py-1 text-white">Sắp diễn ra</span>
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.open(`https://www.olabet.today/register?affiliateCode=hoadaotv`, "_blank");
            }}
            style={{
              backgroundImage: `url('/bet-button.global.png')`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
            }}
            className="text-black px-3 py-1.5 h-6.5 aspect-795/247 font-bold text-shadow-xs text-shadow-white text-xs rounded overflow-hidden"
          >
            {/* ĐẶT CƯỢC */}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default FixtureCard;
