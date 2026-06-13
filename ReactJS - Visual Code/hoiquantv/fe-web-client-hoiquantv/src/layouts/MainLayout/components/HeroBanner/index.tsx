import adBanners from "../../../../data/adBanners";

const HeroBanner = () => {
  return (
    <div className="w-full grid grid-cols-1 lt:grid-cols-2">
      {adBanners.HERO.map((banner, index) => (
        <a key={index} href={banner.href} target="_blank" className="w-full aspect-[1152/100]">
          <img src={banner.src} alt="" className="w-full h-full" />
        </a>
      ))}
    </div>
  );
};

export default HeroBanner;
