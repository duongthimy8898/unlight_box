import { Calendar, Radio } from "lucide-react";
import type { Fixture } from "../../../shared/types/Fixture";
import type { FixtureStats } from "../../../shared/types/FixtureStats";
import { Link } from "@tanstack/react-router";
import clsx from "clsx";
import { formatDate, formatTime } from "../../../shared/lib/dateFns";
import { useMemo, useState } from "react";
import { addDays } from "date-fns";

const FixturesWithFilter = ({ fixtures, fixturesStats }: { fixtures: Fixture[]; fixturesStats: FixtureStats[] }) => {
  const [filter, setFilter] = useState<{ by: "state" | "date"; value: string | Date }>({
    by: "state",
    value: "live",
  });
  const today = new Date();
  const filterOptions: { by: "state" | "date"; text: string | React.ReactElement; value: string | Date }[] = [
    {
      by: "state",
      text: (
        <>
          <Radio />
          <span>Live</span>
        </>
      ),
      value: "live",
    },
    {
      by: "date",
      text: "H.Nay",
      value: addDays(today, 0),
    },
    {
      by: "date",
      text: "N.Mai",
      value: addDays(today, 1),
    },
    ...Array.from({ length: 5 }, (_, i) => ({
      by: "date" as const,
      text: formatDate(addDays(today, i + 2), "EEEEE"),
      value: addDays(today, i + 2),
    })),
  ];
  const fixturesFiltered: Fixture[] = useMemo(() => {
    if (filter.by === "state" && filter.value === "live") return fixtures.filter((f) => f.isLive);
    else if (filter.by === "date") return fixtures.filter((f) => formatDate(f.startTime, "dd/MM/yyyy") === formatDate(filter.value as Date, "dd/MM/yyyy"));
    else return [];
  }, [filter, fixtures]);
  console.log(fixturesFiltered);
  const leaguesFixturesMap = useMemo(
    () =>
      Object.values(
        fixturesFiltered.reduce(
          (acc, fixture) => {
            const leagueId = fixture.league.id;

            if (!acc[leagueId]) {
              acc[leagueId] = {
                ...fixture.league,
                fixtures: [],
              };
            }

            acc[leagueId].fixtures.push(fixture);

            return acc;
          },
          {} as Record<number, (typeof fixtures)[number]["league"] & { fixtures: typeof fixtures }>,
        ),
      ),
    [fixturesFiltered],
  );
  console.log(filter);
  return (
    <section className="mt-4">
      <h2 className="flex gap-1 items-center mb-2">
        <Calendar className="size-6 text-pink-500" />
        <span className="font-bold text-[16px] uppercase">Lịch thi đấu</span>
      </h2>
      <ul className="flex flex-row items-stretch gap-1 mb-1 overflow-x-auto snap-x snap-mandatory">
        {filterOptions.map((fo, idx) => (
          <li
            key={idx}
            onClick={() =>
              setFilter({
                by: fo.by,
                value: fo.value,
              })
            }
            className={clsx(
              "shrink-0 px-6 py-2 flex-1 flex flex-row items-center justify-center gap-1 bg-[#191920] p-2 lg:p-4 rounded cursor-pointer snap-start",
              "text-sm font-semibold",
              "first:hover:bg-red-500 hover:bg-[#ff5c8d85] first:active:bg-red-500 active:bg-[#ff5c8d85]",
              (filter.by === "state" && filter.value === "live" && fo.value === "live") ||
                (filter.by === "date" && fo.by === "date" && formatDate(filter.value as Date, "dd/MM/yyyy") === formatDate(fo.value as Date, "dd/MM/yyyy"))
                ? "first:bg-red-500! bg-[#ff5c8d85]!"
                : "",
            )}
          >
            {fo.text}
          </li>
        ))}
      </ul>
      <ul className="flex flex-col gap-2">
        {leaguesFixturesMap.map((lf, idx) => (
          <li key={idx}>
            <div className="p-2 bg-[#ff5c8d85] rounded-t">{lf.name}</div>
            <ul className="flex flex-col gap-1">
              {lf.fixtures.map((fixture, idx) => {
                const stats = fixturesStats.find((f) => f.fixture.id.toString() === fixture.referenceId);
                return (
                  <li key={idx} className="not-first:rounded-t rounded-b overflow-hidden">
                    <Link
                      to={"/truc-tiep/$slug/$id"}
                      params={{
                        slug: fixture.slug,
                        id: fixture.id,
                      }}
                      className={clsx("flex flex-col xl:grid grid-cols-[1fr_auto_1fr] gap-4", "bg-[#263041] p-3 overflow-hidden")}
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
                          <span className="bg-[#1B1F28] border border-white/20 text-nowrap text-sm px-3 py-1 rounded">Sắp diễn ra</span>
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
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FixturesWithFilter;
