import HeroBanner from "./HeroBanner";
import type { AdsBanner } from "../../../../types/AdsBanner.type";
const HeroBanners = ({ banners }: { banners: AdsBanner[] }) => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2">
      {banners.map((banner) => (
        <HeroBanner key={banner.id} heroBanner={banner} />
      ))}
    </div>
  );
};

export default HeroBanners;
