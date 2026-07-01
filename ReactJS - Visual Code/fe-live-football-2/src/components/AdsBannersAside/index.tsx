import { useLocation } from "react-router-dom";
import Left from "./Left";
import Right from "./Right";
import { useMemo } from "react";
import liveBanners from "../../data/adBanners/liveBanners";
import homeBanners from "../../data/adBanners/homeBanners";

export default function AdsBannersAside() {
  const location = useLocation();

  // Xác định banners nào sẽ hiển thị dựa trên path hiện tại
  const { leftBanners, rightBanners } = useMemo(() => {
    const isLivePage = location.pathname.startsWith("/truc-tiep/");

    if (isLivePage) {
      return {
        leftBanners: liveBanners.SLIDE.LEFT,
        rightBanners: liveBanners.SLIDE.RIGHT,
      };
    } else {
      return {
        leftBanners: homeBanners.SLIDE.LEFT,
        rightBanners: homeBanners.SLIDE.RIGHT,
      };
    }
  }, [location.pathname]);
  return (
    <div className="hidden 2xl:flex inset-0 fixed bg-transparent select-none pointer-events-none z-50 justify-between items-center">
      <Left banners={leftBanners} />
      <Right banners={rightBanners} />
    </div>
  );
}
