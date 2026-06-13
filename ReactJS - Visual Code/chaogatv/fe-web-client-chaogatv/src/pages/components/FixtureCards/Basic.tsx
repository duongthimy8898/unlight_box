import { Link } from "@tanstack/react-router";
import clsx from "clsx";
import fixtureCardBg from "../../../assets/fixture-card-bg.png";
import type { Fixture } from "../../../shared/types/Fixture";
import { formatTime } from "../../../shared/lib/dateFns";
import { formatDate } from "date-fns";
import { useFixtures } from "../../../features/fixtures/hooks";

const Basic = ({ fixture }: { fixture: Fixture }) => {
  const fixtureStats = useFixtures.listStats().data?.find((f) => f.fixture.id.toString() === fixture.referenceId);
  return (
    <Link
      to={"/truc-tiep/$slug/$fixtureId"}
      params={{
        slug: fixture.slug,
        fixtureId: String(fixture.id),
      }}
      className={clsx("w-full flex flex-col bg-cover bg-center rounded-lg", "border-2 border-brand/25", "hover:border-brand transition-colors")}
      style={{
        backgroundImage: `url(${fixtureCardBg})`,
      }}
    >
      <div className="text-sm text-white grid grid-cols-[1fr_auto_1fr] gap-4 items-center py-4 px-4">
        <div className="w-full overflow-hidden">
          <time dateTime={fixture.startTime.toISOString()} className="flex gap-1 font-normal">
            <span>{formatTime(fixture.startTime, "HH:mm")}</span>
            <span className="inline-block bg-linear-to-b from-[#FFFFFF]/0 via-[#FFA520] to-[#FFFFFF]/0 w-0.5"></span>
            <span>{formatDate(fixture.startTime, "d/M/yy")}</span>
          </time>
          <p className="w-full truncate">{fixture.league.name}</p>
        </div>
        <p className={clsx("px-2.5 py-1.5 text-xs rounded-md w-fit", fixture.isLive ? "bg-red-500" : "bg-[#3C4459]")}>
          {fixture.isLive ? "Trực tiếp" : "Sắp diễn ra"}
        </p>
        <div className="w-full overflow-hidden flex gap-1 justify-end">
          <img src={fixture.sport.iconUrl} className="w-5 h-5" alt="" />
          <span className="font-normal truncate">{fixture.sport.name}</span>
        </div>
      </div>
      <div className="grid grid-cols-[1fr_auto_1fr] py-0 px-3">
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
                <strong>{fixtureStats?.goals.away ?? "---"}</strong>
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
      <div className="py-4 px-4 flex flex-row justify-between items-center ">
        <div className="flex flex-row backdrop-blur-sm bg-[#000000]/20 rounded-md items-center overflow-hidden border-2 border-[#3C4459]">
          <img
            src={fixture.fixtureCommentators.at(0)?.commentator.avatarUrl ?? "/favicon.png"}
            alt=""
            className="w-8 h-8 border-r-2 border-inherit rounded-r-md"
          />
          <span className="text-xs text-white px-2">{fixture.fixtureCommentators.at(0)?.commentator.nickname ?? "Unknown"}</span>
        </div>
        <div className="flex flex-row gap-1.5">
          {/* <span className="bg-red-500 px-3 py-1 text-sm rounded-sm">Live</span> */}
          <button
            onClick={() => window.open("https://www.bwing20.com/vn?affCode=22187", "_blank")}
            className="bg-linear-to-b from-yellow-500 via-yellow-600 to-yellow-400 px-3 py-1 text-sm rounded-sm"
          >
            Đặt Cược
          </button>
        </div>
      </div>
    </Link>
  );
};

export default Basic;
