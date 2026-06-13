import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import type { AdBanner } from "../../../../types/Ad";
import adBanners from "../../../../data/adBanners";
const PopupAdBanner = () => {
  const [banner, setBanner] = useState<AdBanner | null>(null);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    setBanner(adBanners.POPUP);
  }, []);
  return (
    visible &&
    banner && (
      <div className="fixed inset-0 bg-black/50 z-[110] w-full h-full user-select-none flex justify-center items-center px-2" onClick={() => setVisible(false)}>
        <div className="container relative w-full max-w-[480px] aspect-square">
          <button className="text-white absolute z-10 top-1 right-1 p-1 rounded border bg-white/50" onClick={() => setVisible(false)}>
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

export default PopupAdBanner;
