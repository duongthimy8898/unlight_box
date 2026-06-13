import { scheduleRoute } from "../../app/router";
import FixtureCards from "../components/FixtureCards";
import HeroBannerAd from "../components/HeroBannerAd";
import HeaderSection from "./sections/HeaderSection";

const SchedulePage = () => {
  const { sport, fixturesBySport } = scheduleRoute.useLoaderData();
  return (
    <>
      <HeroBannerAd />
      <div className="mt-2 px-2 lg:px-0">
        <HeaderSection sport={sport} />
      </div>
      <div className="mt-2 px-2 lg:px-0">
        <FixtureCards type="basic" fixtures={fixturesBySport} />
      </div>
      <HeroBannerAd />
    </>
  );
};

export default SchedulePage;
