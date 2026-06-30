import fixturesRoute from "../../app/routes/fixtures.route";
import { useFixtures } from "../../features/fixtures/hooks";
import Schedule from "./Schedule";

const Fixtures = () => {
  const { data: fixtures } = useFixtures.listByState("unfinished");
  const { mon } = fixturesRoute.useSearch();
  const fixtureBySports = fixtures?.filter((f) => f.sport.slug === mon);
  return (
    <>
      <Schedule fixtures={fixtureBySports ?? []} />
    </>
  );
};

export default Fixtures;
