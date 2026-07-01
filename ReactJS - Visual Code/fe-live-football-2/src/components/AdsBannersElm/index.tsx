import { AdsBanner } from "../../types/AdsBanner.type";

const AdsBannerElm = (banner: AdsBanner) => {
  return (
    <a className="w-full block" href={banner.href} target="_blank">
      <img loading="lazy" className="block w-full" src={banner.src} />
    </a>
  );
};

export default function AdsBannersElm({ banners }: { banners: AdsBanner[] }) {
  return (
    <div className="w-full my-[8px] grid grid-cols-1 gap-0.5 lg:gap-1 lg:grid-cols-2">
      {banners.map((banner) => (
        <AdsBannerElm key={`banner-${banner.id}`} {...banner}></AdsBannerElm>
      ))}
    </div>
  );
}
