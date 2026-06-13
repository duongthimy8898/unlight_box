import clsx from "clsx";
import { LucideStar } from "lucide-react";
import FixtureCard from "../../components/FixtureCard";
import type { Fixture } from "../../../shared/types/Fixture";

const PinnedFixtures = ({ fixtures }: { fixtures: Fixture[] }) => {
  return (
    <section className="mt-4 px-2 xl:px-0">
      <h2 className="text-lg flex gap-1 items-center font-semibold">
        <LucideStar className="text-yellow-500" />
        <span>TÂM ĐIỂM BÓNG ĐÁ</span>
      </h2>
      <div className={clsx("mt-2 grid gap-4", "grid-cols-1 lg:grid-cols-2")}>
        {fixtures.map((fixture, idx) => (
          <FixtureCard key={idx} fixture={fixture} isPinned={true} />
        ))}
      </div>
    </section>
  );
};

export default PinnedFixtures;
