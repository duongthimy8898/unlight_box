import { useEffect, useState } from "react";
import type { AdsBanner } from "../../../../types/AdsBanner.type";
import LeftBanners from "./LeftBanners";
import RightBanners from "./RightBanners";
import { useLocation } from "react-router-dom";
import homePageBanners from "../../../../data/adBanners/homePageBanners";
import livePageBanners from "../../../../data/adBanners/livePageBanners";

const FixedAsideBanners = () => {
  const [banners, setBanners] = useState<AdsBanner[]>([]);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith("/lich-thi-dau")) setBanners([...homePageBanners.SLIDE.LEFT, ...homePageBanners.SLIDE.RIGHT]);
    else if (location.pathname.startsWith("/truc-tiep")) setBanners([...livePageBanners.SLIDE.LEFT, ...livePageBanners.SLIDE.RIGHT]);
  }, [location]);
  return (
    <div className="hidden 2xl:flex fixed inset-0 top-[96px] z-[100] w-full h-full pointer-events-none user-select-none justify-between">
      <LeftBanners banners={banners.slice(0, 2)} />
      <RightBanners banners={banners.slice(2, 4)} />
    </div>
  );
};

export default FixedAsideBanners;
