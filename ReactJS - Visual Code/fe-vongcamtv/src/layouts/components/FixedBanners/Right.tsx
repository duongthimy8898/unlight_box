import { useState } from "react";
import { X } from "lucide-react";

const Right = () => {
  const [isVisible, setVisible] = useState(true);
  const handleClick = () => {
    setVisible(false);
  };
  return (
    isVisible && (
      <div className="hidden lt:block absolute z-40 top-1/2 -translate-y-1/2 right-0 pointer-events-auto">
        <button className="absolute bg-red-500/75 text-white top-0 left-0" onClick={handleClick}>
          <X size={20} />
        </button>
        <a href="#asideBannerLeft">
          <img src="https://sv-bugio.xyz/uploads/resources/images/a798e72d85bf8389775e6b4ee122b19e.gif" alt="" />
        </a>
        <a href="#asideBannerLeft">
          <img src="https://sv-bugio.xyz/uploads/resources/images/a798e72d85bf8389775e6b4ee122b19e.gif" alt="" />
        </a>
      </div>
    )
  );
};

export default Right;
