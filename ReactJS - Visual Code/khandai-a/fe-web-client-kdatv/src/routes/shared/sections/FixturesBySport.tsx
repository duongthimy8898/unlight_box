import type { Sport } from "../../../shared/types/Sport";
import type { Fixture } from "../../../shared/types/Fixture";
import type { FixtureStats } from "../../../shared/types/FixtureStats";
import FixtureCard from "../components/FixtureCard";

const FixturesBySports = ({ sport, fixturesBySport, fixturesStats }: { sport: Sport; fixturesBySport: Fixture[]; fixturesStats: FixtureStats[] }) => {
  return (
    <section className="mt-4">
      <h2 className="flex gap-1 items-center mb-2">
        <img src={sport.iconUrl} alt="" className="size-5" />
        <span className="font-semibold text-[16px] uppercase">{`TẤT CẢ TRẬN ${sport.name}`}</span>
      </h2>
      <ul className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        {fixturesBySport.map((fixture, idx) => {
          const fixtureStats = fixturesStats.find((fs) => fs.fixture.id.toString() === fixture.referenceId);
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

export default FixturesBySports;
