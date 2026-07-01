import type { AdsBanner } from "../../../../types/AdsBanner.type";

const HeroBanner = ({ heroBanner }: { heroBanner: AdsBanner }) => {
  return (
    <a href={heroBanner.href}>
      <img loading="lazy" src={heroBanner.src} alt="" />
    </a>
  );
};

export default HeroBanner;
