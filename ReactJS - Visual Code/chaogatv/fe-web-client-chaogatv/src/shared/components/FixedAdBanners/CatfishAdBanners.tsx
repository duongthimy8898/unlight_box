import { LucideXCircle } from "lucide-react";
import { useState } from "react";
const CatfishAdBanners = () => {
  const [show, setShow] = useState(true);
  return (
    <div
      hidden={!show}
      className="fixed bottom-0 left-1/2 -translate-x-1/2 z-90 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2"
      onClick={() => setShow(false)}
    >
      <a href="https://www.bwing20.com/vn?affCode=22187" target="_blank" className="inline-block w-full">
        <img src="/banners/bwing_1152x100_1.gif" alt="" className="block w-full" />
      </a>
      <a href="https://www.bwing20.com/vn?affCode=22187" target="_blank" className="inline-block w-full">
        <img src="/banners/bwing_1152x100_2.gif" alt="" className="block w-full" />
      </a>
      <a href="https://6789x.site/ad9namei200" target="_blank" className="inline-block w-full">
        <img src="/banners/vs_1152x100.gif" alt="" className="block w-full" />
      </a>
      <a href="https://www.fb88alo.com/?affiliateId=8843" target="_blank">
        <img src="/banners/fb88_1152x100.gif" alt="" />
      </a>
      <LucideXCircle size={24} className="cursor-pointer absolute top-0 right-0 bg-red-500 text-white rounded-full" />
    </div>
  );
};

export default CatfishAdBanners;
