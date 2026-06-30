import { useSuspenseQuery } from "@tanstack/react-query";
import { sportQueries } from "../../features/sports/queries";
import { fixtureQueries } from "../../features/fixtures/queries";
import HeroBanner from "./sections/HeroBanner";
import SportNav from "../shared/sections/SportNav";
// import BetButtons from "./sections/BetButtons";
import "./style.css";
import FixturesBySports from "../shared/sections/FixturesBySport";
import React from "react";
import Bookmakers from "./sections/Bookmakers";
import PinnedFixtures from "../shared/sections/PinnedFixtures";
import HeroBannerAd from "../shared/sections/HeroAdBanners";

const Page = () => {
  const { data: sports } = useSuspenseQuery(sportQueries.list());
  const { data: fixtures } = useSuspenseQuery(fixtureQueries.listByState("unfinished"));
  const { data: fixturesStats } = useSuspenseQuery(
    fixtureQueries.listStats(fixtures.filter((fixture) => fixture.referenceId).map((fixture) => fixture.referenceId!)),
  );
  const pinnedFixtures = fixtures.filter((fixture) => fixture.isPinned);
  if (pinnedFixtures.length < 6) {
    const additionalFixtures = fixtures.filter((fixture) => !fixture.isPinned).slice(0, 6 - pinnedFixtures.length);
    pinnedFixtures.push(...additionalFixtures);
  }
  return (
    <>
      <HeroBanner />
      <SportNav />
      <HeroBannerAd />
      <PinnedFixtures title="TÂM ĐIỂM THỂ THAO" pinnedFixtures={pinnedFixtures} fixturesStats={fixturesStats} />
      <HeroBannerAd />
      {/* <BetButtons /> */}
      {sports.map((sport, idx) => {
        const fixturesBySport = fixtures.filter((fixture) => fixture.sport.id === sport.id);
        return (
          sport.fixtureCount !== 0 && (
            <React.Fragment key={idx}>
              <FixturesBySports sport={sport} fixturesBySport={fixturesBySport} fixturesStats={fixturesStats} />
              <Bookmakers />
            </React.Fragment>
          )
        );
      })}
    </>
  );
};

export default Page;
