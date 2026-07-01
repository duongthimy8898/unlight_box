import { AdsBanner } from "../../types/AdsBanner.type";

const Banner = ({ banner }: { banner: AdsBanner }) => {
  return (
    <a className="w-full block" href={banner.href}>
      <img loading="lazy" className="block w-full" src={banner.src} />
    </a>
  );
};

export default Banner;
