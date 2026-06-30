import { useFixtures } from "../../features/fixtures/hooks";
import HeroAdBanners from "../../shared/components/HeroAdBanners";
import BetButtons from "./BetButtons";
import FeaturedFixtures from "./FeaturedFixtures";
import LiveFixtures from "./LiveFixtures";
import PinnedFixture from "../../features/fixtures/ui/PinnedFixture";
import Schedule from "./Schedule";
import homeRoute from "../../app/routes/home.route";

const Home = () => {
  const { data: fixtures } = useFixtures.listByState("unfinished");
  const { mon } = homeRoute.useSearch();
  const fixtureBySports = fixtures?.filter((f) => f.sport.slug === mon);
  const pinnedFixtures = fixtureBySports?.sort((a, b) => Number(b.isPinned) - Number(a.isPinned)).slice(0, 10) ?? [];
  const firstPinned = pinnedFixtures?.at(0);
  const liveFixtures = fixtureBySports?.filter((f) => f.isLive) ?? [];
  return (
    <>
      <HeroAdBanners />
      {firstPinned && <PinnedFixture fixture={firstPinned} />}
      <HeroAdBanners />
      <FeaturedFixtures fixtures={pinnedFixtures.slice(1)} />
      <BetButtons />
      <LiveFixtures fixtures={liveFixtures} />
      <Schedule fixtures={fixtureBySports ?? []} />
    </>
  );
};

export default Home;
