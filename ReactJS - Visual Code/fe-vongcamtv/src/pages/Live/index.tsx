import HeroBanners from "./components/HeroBanners";
import HotMatches from "./components/HotMatches";
import CurrentMatch from "./components/CurrentMatch";
import LiveContainer from "./components/LiveContainer";

const LivePage = () => {
  return (
    <>
      <div className="mt-2 px-2">
        <CurrentMatch />
      </div>
      <div className="mt-2 px-2">
        <HeroBanners />
      </div>
      <div className="mt-2 px-2">
        <LiveContainer />
      </div>
      <div className="mt-2 px-2">
        <HeroBanners />
      </div>
      <div className="mt-2 px-2">
        <HotMatches />
      </div>
      <HeroBanners />
    </>
  );
};

export default LivePage;
