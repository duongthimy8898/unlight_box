import adBanners from "../../../../data/adBanners";

const AsideAdBanner = () => {
  return (
    <>
      {/* Banner trái */}
      <div className="hidden dt:flex dt:flex-col fixed top-16 dt:left-[calc(50%-640px-120px-12px)] bs:left-[calc(50%-720px-120px-20px)]">
        {adBanners.ASIDE.map((banner, idx) => (
          <a key={idx} href={banner.href} target="_blank" className="block pointer-events-auto">
            <img src={banner.src} alt="" className="block" />
          </a>
        ))}
      </div>

      {/* Banner phải */}
      <div className="hidden dt:flex dt:flex-col fixed top-16 dt:right-[calc(50%-640px-120px-12px)] bs:right-[calc(50%-720px-120px-20px)]">
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
