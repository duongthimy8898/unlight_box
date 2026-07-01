import { AdsBanner } from "../../types/AdsBanner.type";

const AdsBannerElm = (banner: AdsBanner) => {
  return (
    <a className="w-[100px] h-auto pointer-events-auto" target="_blank" href={banner.href}>
      <img loading="lazy" className="block w-full h-full" src={banner.src} />
    </a>
  );
};

export default function Right({ banners }: { banners: AdsBanner[] }) {
  return (
    <div className="w-fit h-auto flex flex-col gap-1">
      {banners.map((banner) => (
        <AdsBannerElm key={`banner-${banner.id}`} {...banner}></AdsBannerElm>
      ))}
    </div>
  );
}