// import HeroBanners from "./components/HeroBanners";
import HeroBanners from "./components/HeroBanners";
import HotMatches from "./components/HotMatches";
import MatchSchedule from "./components/MatchSchedule";
import PinnedMatches from "./components/PinnedMatches";

const HomePage = () => {
  return (
    <>
      <div className="mt-2 px-2">
        <PinnedMatches />
      </div>
      <div className="mt-2 px-2">
        <HeroBanners />
      </div>
      <div className="mt-2 px-2">
        <HotMatches />
      </div>
      <div className="mt-2 px-2">
        <HeroBanners />
      </div>
      <div className="mt-2 px-2">
        <MatchSchedule />
      </div>
      <div className="my-2 px-2">
        <HeroBanners />
      </div>
    </>
  );
};

export default HomePage;
