import PrimaryFixtureCard from "./sections/PrimaryFixtureCard";
import { useNavigate, useParams } from "@tanstack/react-router";
import PlayContainer from "./sections/PlayContainer";
import { BasicFixtures } from "../HomePage/sections";
import { useSuspenseQuery } from "@tanstack/react-query";
import { fixtureQueries } from "../../features/fixtures/queries";
import HeroBanners from "../components/HeroBanners";

const LivePage = () => {
  const navigate = useNavigate();
  const { id: fixtureId } = useParams({ from: "/truc-tiep/$slug/$id" });
  const { data: fixtures } = useSuspenseQuery(fixtureQueries.list);
  const fixture = fixtures.find((f) => f.id === Number(fixtureId));
  if (!fixture) navigate({ from: "/" });
  return (
    <>
      <h1 className="sr-only">Xem trực tiếp</h1>
      <HeroBanners />
      <PrimaryFixtureCard fixture={fixture!} />
      <HeroBanners />
      <div className="mt-4"></div>
      <PlayContainer fixture={fixture!} />
      <HeroBanners />
      <BasicFixtures fixtures={fixtures.filter((f) => f.id !== Number(fixtureId))} />
      <HeroBanners />
    </>
  );
};

export default LivePage;
