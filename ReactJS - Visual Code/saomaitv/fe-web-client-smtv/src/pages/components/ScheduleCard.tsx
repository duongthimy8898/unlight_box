import { Link } from "@tanstack/react-router";
import clsx from "clsx";
import type { Fixture } from "../../shared/types/Fixture";
import { formatTime } from "../../shared/lib/dateFns";
import { formatDate } from "../../shared/lib/dateFns";
import { useFixtures } from "../../features/fixtures/hooks";
import adButtons from "../../config/adButton";

const ScheduleCard = ({ fixture }: { fixture: Fixture }) => {
  const stats = useFixtures.listStats().data?.find((f) => f.fixture.id.toString() === fixture.referenceId);
  return (
    <Link
      to="/truc-tiep/$slug/$id"
      params={{
        slug: fixture.slug,
        id: String(fixture.id),
      }}
      className={clsx("flex flex-col xl:grid grid-cols-[1fr_auto_1fr] gap-4", "bg-[#263041] p-3 rounded-md overflow-hidden")}
    >
      <div className={clsx("flex gap-1.5", "flex-row justify-between xl:flex-col xl:justify-start")}>
        <p className="flex flex-row items-center gap-1">
          <b className="font-bold text-yellow-500">{formatTime(fixture.startTime, "HH:mm")}</b>
          <span className="bg-[#AC9873] h-4 w-px"></span>
          <span className="text-slate-100 text-xs">{formatDate(fixture.startTime, "EEEEEE, dd MMM")}</span>
        </p>
        <p className="text-sm font-semibold">{fixture.league.name}</p>
      </div>
      <div className="grid grid-cols-[1fr_auto_1fr] gap-4">
        <div className={clsx("flex gap-2 items-center justify-center overflow-hidden", "flex-col xl:flex-row-reverse")}>
          <img src={fixture.homeTeam.logoUrl} alt="" className="w-12 h-12 object-contain" />
          <p className={clsx("w-full text-sm truncate", "text-center xl:text-end")}>{fixture.homeTeam.name}</p>
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <div
            className={clsx(
              "bg-linear-to-r from-[#DD1818]/0 via-[#DD1818] to-[#DD1818]/0",
              "px-6 py-1 flex flex-row gap-1.5 items-center justify-center text-xs",
            )}
          >
            <span>{stats?.fixture.status.short ?? "KXD"}</span>
            {fixture.isLive && (
              <>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-white"></span>
                <span>
                  {stats
                    ? (() => {
                        const { elapsed, extra } = stats.fixture.status;
                        const extraText = extra ? `+${extra}` : "";
                        return `${elapsed ?? "0"}${extraText}'`;
                      })()
                    : "---"}
                </span>
              </>
            )}
          </div>
          <div className="bg-linear-to-b from-[#AC9873]/0 via-[#AC9873] to-[#AC9873]/0 px-0.5 rounded-md overflow-hidden">
            <div className={clsx("px-4 py-0.5 bg-black/75", "text-xl flex flex-row justify-center items-center gap-2 font-semibold")}>
              {fixture.isLive ? (
                <>
                  <span>{stats?.goals.home ?? "--"}</span>
                  <span>:</span>
                  <span>{stats?.goals.away ?? "--"}</span>
                </>
              ) : (
                <span>VS</span>
              )}
            </div>
          </div>
        </div>
        <div className={clsx("flex gap-2 items-center justify-center overflow-hidden", "flex-col xl:flex-row")}>
          <img src={fixture.awayTeam.logoUrl} alt="" className="w-12 h-12 object-contain" />
          <p className={clsx("w-full text-sm truncate", "text-center xl:text-start")}>{fixture.awayTeam.name}</p>
        </div>
      </div>
      <div className="flex flex-row items-center gap-1.5 justify-center xl:justify-end">
        {fixture.isLive ? (
          <span className="bg-[#ff0000]/50 border border-[#ff0000]/50 text-white text-nowrap text-sm px-3 py-1 rounded">Đang diễn ra</span>
        ) : (
          <span className="bg-[#1B1F28] border border-white/20 text-nowrap text-sm px-3 py-1 rounded">Chưa bắt đầu</span>
        )}

        <button
          onClick={() => window.open(adButtons.GLOBAL.href, "_blank")}
          className="bg-linear-to-r from-[#FE9900] to-[#FF6A00] text-sm text-nowrap px-3 py-1 rounded"
        >
          Đặt cược
        </button>
      </div>
    </Link>
  );
};

export default ScheduleCard;
