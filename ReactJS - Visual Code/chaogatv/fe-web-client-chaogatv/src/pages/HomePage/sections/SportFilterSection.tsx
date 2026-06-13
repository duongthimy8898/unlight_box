import FixtureCards from "../../components/FixtureCards";
import type { Fixture } from "../../../shared/types/Fixture";
import clsx from "clsx";
import { useMemo, useState } from "react";
import { indexRoute } from "../../../app/router";
import Empty from "../../../shared/components/Empty";

const SportFilterSection = ({ fixtures }: { fixtures: Fixture[] }) => {
  const { sports } = indexRoute.useLoaderData();
  const [filter, setFilter] = useState<{ by: string; value: string | number | null }>({
    by: "sportId",
    value: sports.at(0)?.id ?? null,
  });
  const filteredFixtures = useMemo(() => {
    if (filter.value == null) return [];
    return fixtures.filter((f) => f.sport.id === filter.value);
  }, [fixtures, filter]);
  return (
    <section className="mt-4 px-2 lg:px-0 rounded-lg">
      <ul
        className={clsx(
          "w-full py-4 px-4 flex flex-row items-center gap-4 overflow-x-auto bg-[#181820] rounded-lg",
          "[&::-webkit-scrollbar]:h-1 md:[&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar]:bg-white/10 [&::-webkit-scrollbar-thumb]:bg-yellow-500/75 [&::-webkit-scrollbar-thumb]:rounded-full",
        )}
      >
        {sports.map((sport) => (
          <li
            key={sport.id}
            onClick={() => setFilter({ by: "sportId", value: sport.id })}
            className={clsx(
              "px-6 block shrink-0",
              "bg-transparent border border-transparent rounded-md",
              "hover:bg-[#ffffff]/10 hover:border-[#ffffff]/20",
              "transition-colors cursor-pointer",
              filter.by === "sportId" && filter.value === sport.id && "border-[#3C4459]!",
            )}
          >
            <button
              className={clsx(
                "flex flex-row items-center gap-2 text-sm uppercase font-semibold py-2 transition-colors",
                "border-y-2 border-transparent text-white",
                filter.by === "sportId" && filter.value === sport.id && "text-brand! border-t-brand!",
              )}
            >
              <img src={sport.iconUrl} alt="" className="w-5 h-5" />
              <span className="whitespace-nowrap block shrink-0">{sport.name}</span>
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-4"></div>
      {filteredFixtures.length === 0 ? <Empty /> : <FixtureCards type="basic" fixtures={filteredFixtures} />}
    </section>
  );
};

export default SportFilterSection;
