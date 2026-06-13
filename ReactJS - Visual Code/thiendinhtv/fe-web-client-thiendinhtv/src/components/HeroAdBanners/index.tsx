import adBanners from "../../data/adBanners";
import AdBanner from "../AdBanner";

const HeroAdBanners = () => {
  return (
    <div className="w-full max-w-[1660px] mx-auto grid grid-cols-1 lt:grid-cols-2">
      {adBanners.HERO.map((adBanner, idx) => (
        <AdBanner key={idx} adBanner={adBanner} />
      ))}
    </div>
  );
};

export default HeroAdBanners;
