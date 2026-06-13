import { X } from "lucide-react";
import { useState } from "react";

const Popup = () => {
  const [isVisible, setVisible] = useState(true);
  const handleClick = () => {
    setVisible(false);
  };
  return (
    isVisible && (
      <div className="absolute inset-0 z-40 bg-black/50 backdrop-blur-[1px] pointer-events-auto">
        <div className="absolute px-2 w-full max-w-[320px] dt:max-w-[512px] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-auto">
          <button className="absolute bg-red-500/75 text-white top-0 right-2" onClick={handleClick}>
            <X size={20} />
          </button>
          <a className="w-full h-full" href="#asideBannerLeft">
            <img className="w-full h-full" src="/banners/fb88_500x500.gif" alt="" />
          </a>
        </div>
      </div>
    )
  );
};

export default Popup;
