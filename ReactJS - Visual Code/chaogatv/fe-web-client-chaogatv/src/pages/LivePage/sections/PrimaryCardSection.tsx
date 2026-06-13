import { formatDate } from "date-fns";
import { formatTime } from "../../../shared/lib/dateFns";
import type { Fixture } from "../../../shared/types/Fixture";

import homeBanner from "../../../assets/home-banner.png";
import clsx from "clsx";
import { useFixtures } from "../../../features/fixtures/hooks";

const PrimaryCardSection = ({ fixture }: { fixture: Fixture }) => {
  const fixtureStats = useFixtures.listStats().data?.find((f) => f.fixture.id.toString() === fixture.referenceId);

  return (
    <section
      style={{
        backgroundImage: `url(${homeBanner})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="rounded-lg xl:rounded-2xl overflow-hidden shadow-[inset_0_0_16px_rgba(255,255,255,1)]"
    >
      <div className="px-4 py-4 lg:px-8 lg:py-16 xl:py-32 backdrop-blur-xs backdrop-brightness-25">
        <div className="flex flex-col justify-center lg:grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          <div className="w-full overflow-hidden">
            <time dateTime={fixture.startTime.toISOString()} className="flex gap-1 font-normal">
              <span>{formatTime(fixture.startTime, "HH:mm")}</span>
              <span className="inline-block bg-linear-to-b from-[#FFFFFF]/0 via-[#FFA520] to-[#FFFFFF]/0 w-0.5"></span>
              <span>{formatDate(fixture.startTime, "d/M/yy")}</span>
            </time>
            <p className="w-full truncate">{fixture.league.name}</p>
          </div>
          <div className="grid grid-cols-[1fr_auto_1fr] py-0 gap-8 px-3">
            <div className="flex flex-col items-center justify-center">
              <img className="w-20 h-20 object-contain rounded-md p-2 bg-[#ffffff]/10" src={fixture.homeTeam.logoUrl} alt="" />
              <span className="text-sm text-white text-center mt-1">{fixture.homeTeam.name}</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <p className="bg-[#DD1818] px-2 py-1 rounded-lg text-xs text-white flex items-center">
                <span className="bg-[#000000]/20 px-2 py rounded-sm">{fixtureStats?.fixture.status.short ?? "KXD"}</span>
                <span className="pl-2" hidden={fixtureStats?.fixture.status.elapsed === null}>
                  {fixtureStats
                    ? (() => {
                        const { elapsed, extra } = fixtureStats.fixture.status;
                        const extraText = extra ? `+${extra}` : "";
                        return `${elapsed ?? "0"}${extraText}'`;
                      })()
                    : "---"}
                </span>
              </p>
              <p className="bg-[#000000]/50 border-x border-brand rounded-full px-4 flex flex-row items-center gap-2">
                {fixture.isLive ? (
                  <>
                    <strong>{fixtureStats?.goals.home ?? "---"}</strong>
                    <span>:</span>
                    <strong>{fixtureStats?.goals.home ?? "---"}</strong>
                  </>
                ) : (
                  <span>VS</span>
                )}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <img className="w-20 h-20 object-contain rounded-md p-2 bg-[#ffffff]/10" src={fixture.awayTeam.logoUrl} alt="" />
              <span className="text-sm text-white text-center mt-1">{fixture.awayTeam.name}</span>
            </div>
          </div>
          <div className="flex flex-row gap-1.5 justify-end">
            <span
              className={clsx(
                "px-4 py-1 text-sm rounded-sm flex items-center shadow-[inset_0_0_8px_rgba(0,0,0,0.75)]",
                fixture.isLive ? "bg-red-500" : "bg-slate-500",
              )}
            >
              {fixture.isLive ? "Trực tiếp" : "Sắp diễn ra"}
            </span>
            <span className="inline-block bg-linear-to-b from-[#FFFFFF]/0 via-[#FFA520] to-[#FFFFFF]/0 w-0.5"></span>
            <div className="flex flex-row backdrop-blur-sm bg-surface rounded-md items-center overflow-hidden border-2 border-[#3C4459]">
              <img
                src={fixture.fixtureCommentators.at(0)?.commentator.avatarUrl ?? "/favicon.png"}
                alt=""
                className="w-8 h-8 border-r-2 border-inherit rounded-r-md"
              />
              <span className="text-xs text-white px-2">{fixture.fixtureCommentators.at(0)?.commentator.nickname ?? "Unknown"}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrimaryCardSection;
