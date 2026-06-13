import { liveRoute } from "../../app/router";
import HeaderSection from "./sections/HeaderSection";
import PrimaryCardSection from "./sections/PrimaryCardSection";
import MarqueeSection from "./sections/MarqueeSection";
import PlayContainer from "./sections/PlayContainer";
import FixtureCards from "../components/FixtureCards";
import { useEffect, useRef } from "react";
import HeroBannerAd from "../components/HeroBannerAd";
const LivePage = () => {
  const { fixture, fixturesBySport } = liveRoute.useLoaderData();
  const prevFixtureRef = useRef<typeof fixture>(undefined);

  useEffect(() => {
    console.log("fixture reference changed:", prevFixtureRef.current !== fixture);

    if (prevFixtureRef.current && fixture) {
      console.log("same id:", prevFixtureRef.current.id === fixture.id);
      console.log("same object:", prevFixtureRef.current === fixture);
    }

    prevFixtureRef.current = fixture;
  }, [fixture]);
  return (
    <>
      <div className="mt-2 px-2 lg:px-0">
        <HeaderSection fixture={fixture} />
      </div>
      <div className="mt-2 px-2 lg:px-0">
        <PrimaryCardSection fixture={fixture} />
      </div>
      <HeroBannerAd />
      <div className="mt-2 px-2 lg:px-0">
        <MarqueeSection />
      </div>
      <div className="mt-2 px-2 lg:px-0">
        <PlayContainer fixture={fixture} />
      </div>
      <HeroBannerAd />
      <div className="mt-4 px-2 lg:px-0">
        <h2 className="text-md font-medium text-white mb-2 flex gap-1 items-center">
          <img className="w-5 h-5" src={fixture.sport.iconUrl} alt="" />
          <span className="uppercase">CÁC TRẬN {fixture.sport.name} KHÁC</span>
        </h2>
        <FixtureCards type="basic" fixtures={fixturesBySport} />
      </div>
      <HeroBannerAd />
    </>
  );
};

export default LivePage;
