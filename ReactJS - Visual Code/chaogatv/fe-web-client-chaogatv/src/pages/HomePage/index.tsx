import { indexRoute } from "../../app/router";
import HeroBannerAd from "../components/HeroBannerAd";
import HeroBannerSection from "./sections/HeroBannerSection";
import PinnedFixturesSection from "./sections/PinnedFixturesSection";
import SportFilterSection from "./sections/SportFilterSection";
const HomePage = () => {
  const { fixtures } = indexRoute.useLoaderData();
  return (
    <>
      <header className="mt-2 flex justify-between items-center">
        <h1 className="flex-1 text-md md:text-lg lg:text-xl text-balance font-bold text-brand text-center lg:text-left">
          CHÁO GÀ TV - XEM TRỰC TIẾP BÓNG ĐÁ HÔM NAY MIỄN PHÍ CHẤT LƯỢNG FULL HD
        </h1>
        {/* <address className="hidden xl:block text-center text-brand/75 pr-1">
          <a className="text-sm" href="mailto:ads.chaogatv@hotmail.com">
            LHQC: ads.chaogatv@hotmail.com
          </a>
        </address> */}
      </header>
      <HeroBannerSection />
      <HeroBannerAd />
      <PinnedFixturesSection fixtures={fixtures ?? []} />
      <HeroBannerAd />
      <SportFilterSection fixtures={fixtures ?? []} />
      <HeroBannerAd />
    </>
  );
};

export default HomePage;
