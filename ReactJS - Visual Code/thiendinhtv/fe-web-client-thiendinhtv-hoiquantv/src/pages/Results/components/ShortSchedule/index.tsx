import clsx from "clsx";
import type { Sport } from "../../../../types/Sport";
import type { Fixture } from "../../../../types/Fixture";
import { useSearchParams } from "react-router-dom";
import { Link as ScrollTo } from "react-scroll";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import { useEffect, useMemo, useRef, useState } from "react";
import type { League } from "../../../../types/League";
import { useDataContext } from "../../../../hooks/useDataContext";
import FilterSection from "./FilterSection";
import FixtureScheduleItem from "./FixtureScheduleItem";
dayjs.locale("vi");

type ShortScheduleProps = {
  sport: Sport;
  fixtures: Fixture[];
};
const ShortSchedule = ({ props }: { props: ShortScheduleProps }) => {
  const leaguesSelectorRef = useRef<HTMLDivElement>(null);
  const [leaguesSelectorHeight, setLeaguesSelectorHeight] = useState(0);
  const { leagues } = useDataContext();
  const [searchParams, setSearchParams] = useSearchParams();

  const payload = useMemo(
    () => ({
      by: searchParams.get("by") ?? "state",
      value: searchParams.get("value") ?? "live",
    }),
    [searchParams]
  );

  useEffect(() => {
    if (!searchParams.has("by") || !searchParams.has("value")) {
      setSearchParams({ by: "state", value: "live" });
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    const handleResize = () => {
      setLeaguesSelectorHeight(leaguesSelectorRef.current?.clientHeight ?? 0);
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // set initial
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const leaguesByFilter = useMemo(() => {
    const filtered = leagues.data
      ?.filter((l) => l.sport.id === props.sport?.id)
      ?.map((league) => {
        const filteredFixtures = props.fixtures
          ?.filter((f) => f.league.id === league.id && (f.status?.code === "FT" || f.isLive === true))
          ?.filter((fixture) => {
            const fixtureStr = dayjs(fixture.startTime).format("DD/MM/YYYY");
            return payload.by === "state" ? fixture.isLive === Boolean(payload.value) : fixtureStr === payload.value;
          });

        if (!filteredFixtures?.length) return null;

        return { ...league, fixtures: filteredFixtures };
      })
      .filter(Boolean);

    return filtered as League[];
  }, [props.fixtures, leagues.data, props.sport?.id, payload.by, payload.value]);
  console.log("leaguesByFilter", leaguesByFilter);
  return (
    <div className="w-full">
      <div className={clsx("w-full flex gap-4 min-h-screen", "flex-col", "lt:flex-row")}>
        <div className="flex flex-col">
          <FilterSection selectedFilter={payload} />
        </div>
        <div className="flex-1">
          <div ref={leaguesSelectorRef} className="sticky top-0 py-4 w-full flex flex-row flex-wrap justify-start items-center gap-2 bg-[#141414]">
            {leaguesByFilter?.map((league, idx) => (
              <ScrollTo
                key={idx}
                to={`f8cv93${league.slug}-${league.id}`}
                smooth={true}
                duration={500}
                offset={-leaguesSelectorHeight}
                className="px-3 py-0.5 flex items-center space-x-2 t border border-gray-500 rounded-full cursor-pointer hover:bg-gray-500/25 transition-all"
              >
                <b className="text-[#e2fe35] text-sm">{league.fixtures.length}</b>
                <span className="text-xs font-semibold text-gray-300">{league.name}</span>
              </ScrollTo>
            ))}
          </div>
          <div className="w-full flex flex-col gap-6">
            {leaguesByFilter.map((league, idx) => (
              <div key={idx} id={`f8cv93${league.slug}-${league.id}`} className="w-full rounded-[12px] overflow-hidden">
                <div className="w-full bg-black flex gap-2 px-4 py-6">
                  <img src={league.logoUrl} className="w-6 h-6" alt="" />
                  <span className="font-semibold">{league.name}</span>
                </div>
                <div className="flex flex-col">
                  {league.fixtures.map((fixture, fIdx) => (
                    <FixtureScheduleItem key={fIdx} fixture={fixture} idx={fIdx} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShortSchedule;
