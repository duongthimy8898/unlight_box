import { useSuspenseQuery } from "@tanstack/react-query";
import { BasicFixtures, MatchSchedule, PinnedFixtures } from "../HomePage/sections";
import { fixtureQueries } from "../../features/fixtures/queries";
import { useMemo } from "react";
import type { Fixture } from "../../shared/types/Fixture";
import Empty from "../../shared/components/Empty";
import HeroBanners from "../components/HeroBanners";

const HomePage = () => {
  const { data: fixtures } = useSuspenseQuery(fixtureQueries.list);
  const { pinnedFixtures, basicFixtures } = useMemo(() => {
    const pinned: Fixture[] = [];
    const basic: Fixture[] = [];

    for (const fixture of fixtures) {
      if (fixture.isPinned) {
        pinned.push(fixture);
      } else {
        basic.push(fixture);
      }
    }

    return {
      pinnedFixtures: pinned.length > 0 ? pinned : basic.slice(0, 2),
      basicFixtures: pinned.length > 0 ? basic : basic.slice(2),
    };
  }, [fixtures]);

  return fixtures.length === 0 ? (
    <Empty />
  ) : (
    <>
      <h1 className="sr-only">Lịch thi đấu</h1>
      <HeroBanners />
      <PinnedFixtures fixtures={pinnedFixtures} />
      <HeroBanners />
      <BasicFixtures fixtures={basicFixtures} />
      <HeroBanners />
      <MatchSchedule fixtures={fixtures} />
      <HeroBanners />
    </>
  );
};

export default HomePage;
