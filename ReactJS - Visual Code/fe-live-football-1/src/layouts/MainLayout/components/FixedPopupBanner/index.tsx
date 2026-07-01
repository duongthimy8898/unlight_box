import { useEffect, useState } from "react";
import type { AdsBanner } from "../../../../types/AdsBanner.type";
import { IoClose } from "react-icons/io5";
import globalBanners from "../../../../data/adBanners/globalBanners";

const FixedPopupBanner = () => {
  const [banner, setBanner] = useState<AdsBanner | null>(null);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    setBanner(globalBanners.POPUP);
  }, []);
  return (
    visible &&
    banner && (
      <div className="fixed inset-0 bg-black/50 z-[110] w-full h-full user-select-none flex justify-center items-center px-2" onClick={() => setVisible(false)}>
        <div className="container relative w-full max-w-[360px] aspect-square">
          <button className="absolute z-10 top-0 right-0 p-1 bg-red-500" onClick={() => setVisible(false)}>
            <IoClose size={16} />
          </button>
          <a href={banner.href} className="w-full h-full" target="_blank">
            <img loading="lazy" src={banner?.src} alt="" />
          </a>
        </div>
      </div>
    )
  );
};

export default FixedPopupBanner;
