import { useEffect, useState } from "react";
import type { AdsBanner } from "../../../../types/AdsBanner.type";
import { IoClose } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import homePageBanners from "../../../../data/adBanners/homePageBanners";
import livePageBanners from "../../../../data/adBanners/livePageBanners";

const FixedBottomBanners = () => {
  const [banners, setBanners] = useState<AdsBanner[]>([]);
  const [visible, setVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    if (location.pathname.startsWith("/lich-thi-dau")) setBanners(isMobile ? homePageBanners.CATFISH.MOBILE : homePageBanners.CATFISH.DESKTOP);
    else if (location.pathname.startsWith("/truc-tiep")) setBanners(isMobile ? livePageBanners.CATFISH.MOBILE : livePageBanners.CATFISH.DESKTOP);

    return () => window.removeEventListener("resize", check);
  }, [location, isMobile]);
  return (
    visible && (
      <div className="bottom-[52px] px-0 md:px-2 md:bottom-0 md:block fixed w-full max-w-[1280px] z-[100] left-1/2 -translate-x-1/2">
        <button className="absolute -top-2 right-0 p-0.5 bg-red-500" onClick={() => setVisible(false)}>
          <IoClose size={16} />
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2">
          {banners.map((banner) => (
            <a href={banner.href} key={banner.id} className="cursor-pointer pointer-events-auto" target="_blank">
              <img loading="lazy" src={banner.src} alt="" />
            </a>
          ))}
        </div>
      </div>
    )
  );
};

export default FixedBottomBanners;
