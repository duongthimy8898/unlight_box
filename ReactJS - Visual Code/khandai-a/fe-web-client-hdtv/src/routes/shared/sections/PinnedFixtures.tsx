import { LucideStar } from "lucide-react";
import FixtureCard from "../components/FixtureCard";
import type { Fixture } from "../../../shared/types/Fixture";
import type { FixtureStats } from "../../../shared/types/FixtureStats";

const PinnedFixtures = ({ title, pinnedFixtures, fixturesStats }: { title: string; pinnedFixtures: Fixture[]; fixturesStats: FixtureStats[] }) => {
  return (
    <section className="mt-4">
      <h2 className="flex gap-1 items-center mb-2">
        <LucideStar className="size-6 text-pink-500" />
        <span className="font-bold text-[20px] uppercase">{title}</span>
      </h2>
      <ul className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        {pinnedFixtures.map((fixture, idx) => {
          const fixtureStats = fixturesStats.find((f) => f.fixture.id.toString() === fixture.referenceId);
          return (
            <li key={idx} className="w-full">
              <FixtureCard fixture={fixture} fixtureStats={fixtureStats} />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default PinnedFixtures;
