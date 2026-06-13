import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import type { AdBanner } from "../../../../types/Ad";
import adBanners from "../../../../data/adBanners";

const CatfishAdBanner = () => {
  const [banners, setBanners] = useState<AdBanner[]>([]);
  const [visible, setVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    setBanners(isMobile ? adBanners.CATFISH.MOBILE : adBanners.CATFISH.DESKTOP);

    return () => window.removeEventListener("resize", check);
  }, [location, isMobile]);
  return (
    visible && (
      <div className="bottom-[52px] px-0 md:px-2 md:bottom-0 md:block fixed w-full max-w-[720px] z-40 left-1/2 -translate-x-1/2">
        <button className="absolute -top-2 right-0 p-0.5 bg-red-500 rounded-full border" onClick={() => setVisible(false)}>
          <IoClose size={16} />
        </button>
        <div className="grid grid-cols-1">
          {banners.map((banner, idx) => (
            <a href={banner.href} key={idx} className="cursor-pointer pointer-events-auto" target="_blank">
              <img loading="lazy" src={banner.src} alt="" />
            </a>
          ))}
        </div>
      </div>
    )
  );
};

export default CatfishAdBanner;
