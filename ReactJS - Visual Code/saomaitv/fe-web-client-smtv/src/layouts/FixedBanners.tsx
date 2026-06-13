import { RiCloseCircleLine } from "@remixicon/react";
import adBanners from "../config/adBanners";
import { useState } from "react";

const FixedBanners = () => {
  const [show, setShow] = useState(true);
  return (
    <div hidden={!show} className="fixed inset-0 z-20 backdrop-blur-md backdrop-brightness-50 flex justify-center items-center" onClick={() => setShow(false)}>
      <div className="relative max-w-100 px-4 -translate-y-12">
        <img
          src={adBanners.FIXED.POPUP.src}
          alt=""
          onClick={() => window.open(adBanners.FIXED.POPUP.href, "_blank")}
          className="w-full h-auto aspect-square cursor-pointer"
        />
        <RiCloseCircleLine size={32} className="cursor-pointer absolute -bottom-1 translate-y-full left-1/2 -translate-x-1/2 text-red-400" />
      </div>
      <div className="absolute w-full max-w-7xl bottom-0 left-1/2 -translate-x-1/2 flex flex-col lg:flex-row">
        {adBanners.FIXED.BOTTOM.map((adBanner, idx) => (
          <a key={idx} href={adBanner.href} target="_blank" className="inline-block w-full">
            <img src={adBanner.src} alt="" className="block w-full" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default FixedBanners;
