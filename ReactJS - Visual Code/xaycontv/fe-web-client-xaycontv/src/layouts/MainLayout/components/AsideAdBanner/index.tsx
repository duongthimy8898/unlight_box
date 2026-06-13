import adBanners from "../../../../data/adBanners";

const AsideAdBanner = () => {
  return (
    <>
      {/* Banner trái */}
      <div className="hidden bs:flex bs:flex-col fixed top-[80px] bs:left-[calc(50%-8px-830px-120px)]">
        {adBanners.ASIDE.map((banner, idx) => (
          <a key={idx} href={banner.href} target="_blank" className="block pointer-events-auto">
            <img src={banner.src} alt="" className="block" />
          </a>
        ))}
      </div>

      {/* Banner phải */}
      <div className="hidden bs:flex bs:flex-col fixed top-[80px] z-50 bs:right-[calc(50%-8px-830px-120px)]">
        {adBanners.ASIDE.map((banner, idx) => (
          <a key={idx} href={banner.href} target="_blank" className="block pointer-events-auto">
            <img src={banner.src} alt="" className="block" />
          </a>
        ))}
      </div>
    </>
  );
};

export default AsideAdBanner;
