import { useSuspenseQuery } from "@tanstack/react-query";
import { sportQueries } from "../../features/sports/queries";
import { fixtureQueries } from "../../features/fixtures/queries";
import { useMemo } from "react";
import watchRoute from "./route";
import PrimaryCard from "./sections/PrimaryCard";
import PlayContainer from "./sections/PlayContainer";
import FixturesBySports from "../shared/sections/FixturesBySport";
import Bookmakers from "../home/sections/Bookmakers";
import { useNavigate } from "@tanstack/react-router";
import homeRoute from "../home/route";

const Page = () => {
  const navigate = useNavigate();
  const { data: sports } = useSuspenseQuery(sportQueries.list());
  const { data: fixtures } = useSuspenseQuery(fixtureQueries.listByState("unfinished"));
  const referenceIds = useMemo(() => fixtures.filter((f) => f.referenceId).map((f) => f.referenceId!), [fixtures]);
  const { data: fixturesStats } = useSuspenseQuery(fixtureQueries.listStats(referenceIds));

  const { id } = watchRoute.useParams();
  const fixture = fixtures.find((f) => f.id === id)!;
  if (!fixture)
    navigate({
      to: homeRoute.path,
    });
  const sport = sports.find((s) => s.id === fixture.sport.id);
  const fixtureStats = fixturesStats.find((fs) => fs.fixture.id === Number(fixture.referenceId));
  const fixturesBySport = useMemo(() => fixtures.filter((fixture) => fixture.sport.slug === sport?.slug), [fixtures, sport?.slug]);
  return (
    <>
      <PrimaryCard fixture={fixture} fixtureStats={fixtureStats} />
      <PlayContainer fixture={fixture} fixtureStats={fixtureStats} />
      <Bookmakers />
      <FixturesBySports sport={sport!} fixturesBySport={fixturesBySport} fixturesStats={fixturesStats} />
    </>
  );
};

export default Page;
