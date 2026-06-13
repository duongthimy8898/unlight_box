import adBanners from "../../config/adBanners";

const HeroBanners = () => {
  return (
    <section className="mt-4 px-2 xl:px-0 grid grid-cols-1 lg:grid-cols-2">
      {adBanners.HERO.map((adBanner, idx) => (
        <a key={idx} href={adBanner.href} target="_blank" className="inline-block w-full">
          <img src={adBanner.src} alt="" className="block w-full" />
        </a>
      ))}
    </section>
  );
};

export default HeroBanners;
