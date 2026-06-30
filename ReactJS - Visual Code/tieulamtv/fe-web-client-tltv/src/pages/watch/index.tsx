import { redirect } from "@tanstack/react-router";
import { useFixtures } from "../../features/fixtures/hooks";
import HeroAdBanners from "../../shared/components/HeroAdBanners";
import LiveFixtures from "./LiveFixtures";
import PrimaryCard from "./PrimaryCard";
import watchRoute from "../../app/routes/watch.route";
import MainBox from "./MainBox";

const Watch = () => {
  const { data: fixtures } = useFixtures.listByState("unfinished");
  const { fixtureSlug } = watchRoute.useParams();
  const fixture = fixtures?.find((fixture) => fixture.slug === fixtureSlug);
  if (!fixture) throw redirect({ to: "/trang-chu" });
  const liveFixtures = fixtures?.filter((f) => f.isLive) ?? [];
  return (
    <>
      {fixture && <PrimaryCard fixture={fixture} />}
      <HeroAdBanners />
      <MainBox fixture={fixture} />
      <LiveFixtures fixtures={liveFixtures} />
    </>
  );
};

export default Watch;
