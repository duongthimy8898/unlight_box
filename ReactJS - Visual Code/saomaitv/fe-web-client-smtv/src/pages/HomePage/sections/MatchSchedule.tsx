import clsx from "clsx";
import { LucideCalendar } from "lucide-react";
import ScheduleCard from "../../components/ScheduleCard";
import type { Fixture } from "../../../shared/types/Fixture";
import { useMemo, useState } from "react";
import { addDays, formatDate } from "date-fns";

const MatchSchedule = ({ fixtures }: { fixtures: Fixture[] }) => {
  const [filter, setFilter] = useState<{ by: string; value: string } | undefined>(undefined);
  const filteredFixture = useMemo(() => {
    if (filter === undefined) return fixtures;
    else if (filter.by === "state" && filter.value === "live") return fixtures.filter((f) => f.isLive);
    else if (filter.by === "date") return fixtures.filter((f) => formatDate(f.startTime, "dd/MM/yyyy") === filter.value);
  }, [fixtures, filter]);
  return (
    <section className="mt-4 bg-[#172030] p-2 rounded-xl">
      <h2 className="text-lg flex gap-1 items-center font-semibold">
        <LucideCalendar className="text-yellow-500" />
        <span>LỊCH THI ĐẤU</span>
      </h2>
      <div className="mt-2 flex flex-row gap-1.5">
        <button
          onClick={() => setFilter(undefined)}
          className={clsx("py-1.5 px-3 rounded text-sm cursor-pointer", filter === undefined ? "bg-amber-600" : "bg-[#364153]")}
        >
          Tất cả
        </button>
        <button
          onClick={() => setFilter({ by: "state", value: "live" })}
          className={clsx("py-1.5 px-3 rounded text-sm cursor-pointer", filter?.by === "state" && filter.value === "live" ? "bg-amber-600" : "bg-[#364153]")}
        >
          Đang đá
        </button>
        <button
          onClick={() => setFilter({ by: "date", value: formatDate(new Date(), "dd/MM/yyyy") })}
          className={clsx(
            "py-1.5 px-3 rounded text-sm cursor-pointer",
            filter?.by === "date" && filter.value === formatDate(new Date(), "dd/MM/yyyy") ? "bg-amber-600" : "bg-[#364153]",
          )}
        >
          Hôm nay
        </button>
        <button
          onClick={() => setFilter({ by: "date", value: formatDate(addDays(new Date(), 1), "dd/MM/yyyy") })}
          className={clsx(
            "py-1.5 px-3 rounded text-sm cursor-pointer",
            filter?.by === "date" && filter.value === formatDate(addDays(new Date(), 1), "dd/MM/yyyy") ? "bg-amber-600" : "bg-[#364153]",
          )}
        >
          Ngày mai
        </button>
      </div>
      <div className="mt-2 flex flex-col gap-1">
        {filteredFixture?.map((fixture, idx) => (
          <ScheduleCard key={idx} fixture={fixture} />
        ))}
      </div>
    </section>
  );
};

export default MatchSchedule;
