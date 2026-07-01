import { useMemo, useState } from "react";
import { AdsBanner } from "../../types/AdsBanner.type";
import { LucideX } from "lucide-react";
import { useLocation } from "react-router-dom";
import liveBanners from "../../data/adBanners/liveBanners";
import homeBanners from "../../data/adBanners/homeBanners";

const AdsBannerElm = (banner: AdsBanner) => {
  return (
    <a className="w-full block pointer-events-auto" href={banner.href} target="_blank">
      <img loading="lazy" className="block w-full" src={banner.src} />
    </a>
  );
};

export default function AdsBannersCatfish() {
  const location = useLocation();
  const [isShow, setShow] = useState(true);

  // Load JSON data

  const { mobileBanners, desktopBanners } = useMemo(() => {
    const isLivePage = location.pathname.startsWith("/truc-tiep/");

    if (isLivePage && liveBanners) {
      return {
        mobileBanners: liveBanners.CATFISH.MOBILE,
        desktopBanners: liveBanners.CATFISH.DESKTOP,
      };
    } else if (homeBanners) {
      return {
        mobileBanners: homeBanners.CATFISH.MOBILE,
        desktopBanners: homeBanners.CATFISH.DESKTOP,
      };
    }

    // Return empty arrays if data is not loaded yet
    return {
      mobileBanners: [],
      desktopBanners: [],
    };
  }, [location.pathname]);

  // Don't render if no banners available
  if (mobileBanners.length === 0 && desktopBanners.length === 0) {
    return null;
  }

  return (
    isShow && (
      <>
        <div className="flex lg:hidden fixed inset-0 bg-transparent pointer-events-none select-none z-50 justify-center items-end">
          <div className="relative w-full max-w-[1280px] mx-auto ">
            <button className="absolute z-[100] top-0 right-0 bg-red-500 text-white pointer-events-auto" onClick={() => setShow(!isShow)}>
              <LucideX size={18} />
            </button>
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {mobileBanners.map((banner: AdsBanner) => (
                <AdsBannerElm key={`banner-${banner?.id}`} {...banner}></AdsBannerElm>
              ))}
            </div>
          </div>
        </div>
        <div className="hidden lg:flex fixed inset-0 bg-transparent pointer-events-none select-none z-50 justify-center items-end px-[8px]">
          <div className="relative w-full max-w-[1280px] mx-auto ">
            <button className="absolute z-[100] top-0 right-0 bg-red-500 text-white pointer-events-auto" onClick={() => setShow(!isShow)}>
              <LucideX size={18} />
            </button>
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {desktopBanners.map((banner: AdsBanner) => (
                <AdsBannerElm key={`banner-${banner?.id}`} {...banner}></AdsBannerElm>
              ))}
            </div>
          </div>
        </div>
      </>
    )
  );
}
