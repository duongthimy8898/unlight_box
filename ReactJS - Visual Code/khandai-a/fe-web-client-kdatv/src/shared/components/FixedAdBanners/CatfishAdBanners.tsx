import { LucideXCircle } from "lucide-react";
import { useState } from "react";

const CatfishAdBanners = () => {
  const [show, setShow] = useState(true);
  return (
    <div hidden={!show} className="fixed bottom-0 left-1/2 -translate-x-1/2 z-90 w-full max-w-7xl flex flex-col lg:flex-row" onClick={() => setShow(false)}>
      <a href="https://www.olabet.today/register?affiliateCode=khandaia" target="_blank" className="inline-block w-full">
        <img src="/banners/ola_728x90.gif?v=03062028" alt="" className="block w-full" />
      </a>
      <a href="https://www.olabet.today/register?affiliateCode=khandaia" target="_blank" className="inline-block w-full">
        <img src="/banners/ola_728x90.gif?v=03062028" alt="" className="block w-full" />
      </a>
      <LucideXCircle size={24} className="cursor-pointer absolute top-0 right-0 bg-red-500 text-white rounded-full" />
    </div>
  );
};

export default CatfishAdBanners;
