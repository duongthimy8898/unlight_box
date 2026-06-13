import { LucideXCircle } from "lucide-react";
import { useState } from "react";

const PopupAdBanner = () => {
  const [show, setShow] = useState(true);
  return (
    <div hidden={!show} className="fixed inset-0 z-95 px-4 backdrop-blur-md backdrop-brightness-50 flex justify-center items-center" onClick={() => setShow(false)}>
      <div className="relative max-w-100">
        <img
          src="/banners/ola_500x500.gif"
          alt=""
          onClick={() => window.open("https://www.olabet.today/register?affiliateCode=khandaia", "_blank")}
          className="w-full h-auto aspect-square cursor-pointer"
        />
        <LucideXCircle size={28} className="cursor-pointer absolute top-0 -translate-y-1/4 right-0 translate-x-1/4 bg-red-500/75 text-white rounded-full" />
      </div>
    </div>
  );
};

export default PopupAdBanner;
