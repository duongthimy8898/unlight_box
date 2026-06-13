import type { AdBanner as iAdBanner } from "../../types/Ad";

const AdBanner = ({ adBanner }: { adBanner: iAdBanner }) => {
  return (
    <a href={adBanner.href} target="_blank" className="block w-full h-auto aspect-[1152/100]">
      <img loading="lazy" className="w-full h-full" src={adBanner.src} alt="" />
    </a>
  );
};

export default AdBanner;
