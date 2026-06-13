import clsx from "clsx";
import { LucideVolleyball } from "lucide-react";
import FixtureCard from "../../components/FixtureCard";
import type { Fixture } from "../../../shared/types/Fixture";

const BasicFixtures = ({ fixtures }: { fixtures: Fixture[] }) => {
  return (
    <section className="mt-4 px-2 xl:px-0">
      <h2 className="text-lg flex gap-1 items-center font-semibold">
        <LucideVolleyball className="text-yellow-500" />
        <span>CÁC TRẬN ĐẤU KHÁC</span>
      </h2>

      <div className={clsx("mt-2 grid gap-4", "grid-cols-1 lg:grid-cols-2 xl:grid-cols-3")}>
        {fixtures.map((fixture, idx) => (
          <FixtureCard key={idx} fixture={fixture} isPinned={false} />
        ))}
      </div>
    </section>
  );
};

export default BasicFixtures;
