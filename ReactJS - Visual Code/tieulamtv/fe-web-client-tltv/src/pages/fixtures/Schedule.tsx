import { useMemo, useState } from "react";
import type { Fixture } from "../../shared/types/Fixture";
import MatchRow from "../../features/fixtures/ui/ScheduleRow";
import { addDays, parse } from "date-fns";
import { formatDate } from "../../shared/lib/dateFns";
import clsx from "clsx";
import { useLeagues } from "../../features/leagues/hooks";
import type { League } from "../../shared/types/League";

const Schedule = ({ fixtures }: { fixtures: Fixture[] }) => {
  let { data: leagues }: { data: League[] | undefined } = useLeagues.list();
  leagues = leagues?.filter((l) => fixtures.some((f) => l.id === f.league.id));
  const [filter, setFilter] = useState<{ date: string; isHot: boolean | null; leagueId: number | null }>({
    date: formatDate(new Date(), "dd/MM/yyyy"),
    isHot: null,
    leagueId: null,
  });
  const dateFilters = [
    { label: "Hôm nay", value: formatDate(new Date(), "dd/MM/yyyy") },
    { label: formatDate(addDays(new Date(), 1), "EEEEE"), value: formatDate(addDays(new Date(), 1), "dd/MM/yyyy") },
    { label: formatDate(addDays(new Date(), 2), "EEEEE"), value: formatDate(addDays(new Date(), 2), "dd/MM/yyyy") },
    { label: formatDate(addDays(new Date(), 3), "EEEEE"), value: formatDate(addDays(new Date(), 3), "dd/MM/yyyy") },
    { label: formatDate(addDays(new Date(), 4), "EEEEE"), value: formatDate(addDays(new Date(), 4), "dd/MM/yyyy") },
    { label: formatDate(addDays(new Date(), 5), "EEEEE"), value: formatDate(addDays(new Date(), 5), "dd/MM/yyyy") },
    { label: formatDate(addDays(new Date(), 6), "EEEEE"), value: formatDate(addDays(new Date(), 6), "dd/MM/yyyy") },
  ];

  const filteredFixtures = useMemo(() => {
    return fixtures.filter((fixture) => {
      if (filter.date !== formatDate(fixture.startTime, "dd/MM/yyyy")) {
        return false;
      }

      if (filter.isHot !== null && fixture.isHot !== filter.isHot) {
        return false;
      }

      if (filter.leagueId !== null && fixture.league.id !== filter.leagueId) {
        return false;
      }

      return true;
    });
  }, [fixtures, filter]);
  return (
    <>
      <div className="mt-4 flex flex-row items-center gap-2">
        <img src="/assets/imgs/icon-tamdiemthethao.png" alt="" className="w-15 h-15" />
        <span className="text-xl text-[#ffd000] font-semibold">LỊCH THI ĐẤU </span>
      </div>
      <div className="mt-4 flex flex-col lg:flex-row gap-2 items-start lg:items-center justify-between">
        <div className="w-full overflow-auto lg:w-auto flex flex-row items-stretch gap-2">
          {dateFilters.map((ft, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setFilter({ ...filter, date: ft.value })}
              className={clsx(
                "flex-1 shrink-0 lg:flex-none py-2 px-4 bg-[#292c33] rounded-lg border flex flex-col items-center justify-center",
                filter.date === ft.value ? "text-[#ffd000] border-[#ffd000]" : "text-white border-transparent",
              )}
            >
              <strong>{ft.label}</strong>
              {idx !== 0 && (
                <span className="text-[11px]">
                  {formatDate(parse("06/07/2026", "dd/MM/yyyy", new Date()), "dd/MM")}
                </span>
              )}
            </button>
          ))}
        </div>
        <div className="w-full lg:w-auto flex flex-row justify-center items-center gap-4">
          <select
            value={filter.leagueId ?? ""}
            onChange={(e) =>
              setFilter({ ...filter, leagueId: e.currentTarget.value ? Number(e.currentTarget.value) : null })
            }
            className="py-2.5 px-4 bg-[#292c33] outline-none rounded-lg appearance-auto text-white"
          >
            <option value="">Tất cả giải đấu</option>
            {leagues?.map((league, idx) => (
              <option key={idx} value={league.id}>
                {league.name}
              </option>
            ))}
          </select>
          <label
            htmlFor="isHot"
            className="relative block bg-[#E9E9EA] rounded-full w-12 h-6.5 has-checked:bg-[#ffd000]"
          >
            <input
              type="checkbox"
              id="isHot"
              hidden
              className="peer"
              onChange={(e) => setFilter({ ...filter, isHot: e.currentTarget.checked ? true : null })}
            />
            <span
              className={clsx(
                "absolute left-0 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-white shadow-lg transition-transform",
                "peer-checked:translate-x-6",
              )}
            />
          </label>
          <span className="text-[#ffd000] font-semibold">HOT</span>
        </div>
      </div>
      <section className="mt-4 flex flex-col">
        {filteredFixtures.map((fixture, idx) => (
          <MatchRow key={idx} fixture={fixture} />
        ))}
      </section>
    </>
  );
};

export default Schedule;
