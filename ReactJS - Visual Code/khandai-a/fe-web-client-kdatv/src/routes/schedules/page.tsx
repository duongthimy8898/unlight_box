import { useSuspenseQuery } from "@tanstack/react-query";
import { fixtureQueries } from "../../features/fixtures/queries";
import SportNav from "../shared/sections/SportNav";
import PinnedFixtures from "../shared/sections/PinnedFixtures";
import { useMemo } from "react";
import { sportQueries } from "../../features/sports/queries";
import schedulesRoute from "./route";
import FixturesBySports from "../shared/sections/FixturesBySport";
import FixturesWithFilter from "./sections/FixturesWithFilter";
import Empty from "../../shared/components/Empty";

const Page = () => {
  const { data: sports } = useSuspenseQuery(sportQueries.list());
  const { data: fixtures } = useSuspenseQuery(fixtureQueries.listByState("unfinished"));
  const referenceIds = useMemo(() => fixtures.filter((f) => f.referenceId).map((f) => f.referenceId!), [fixtures]);
  const { data: fixturesStats } = useSuspenseQuery(fixtureQueries.listStats(referenceIds));

  const { slug } = schedulesRoute.useParams();
  const sport = sports.find((s) => s.slug === slug)!;

  const fixturesBySport = useMemo(() => fixtures.filter((fixture) => fixture.sport.slug === sport.slug), [fixtures, sport.slug]);
  const pinnedFixtures = useMemo(() => {
    const pinned = fixturesBySport.filter((fixture) => fixture.isPinned);
    if (pinned.length < 6) {
      pinned.push(...fixturesBySport.filter((fixture) => !fixture.isPinned).slice(0, 6 - pinned.length));
    }
    return pinned;
  }, [fixturesBySport]);

  return (
    <>
      <SportNav />
      {sport.fixtureCount === 0 ? (
        <Empty />
      ) : (
        <>
          <PinnedFixtures title={`TÂM ĐIỂM ${sport.name}`} pinnedFixtures={pinnedFixtures} fixturesStats={fixturesStats} />
          <FixturesBySports sport={sport} fixturesBySport={fixturesBySport} fixturesStats={fixturesStats} />
          <FixturesWithFilter fixtures={fixturesBySport} fixturesStats={fixturesStats} />
        </>
      )}
    </>
  );
};

export default Page;
