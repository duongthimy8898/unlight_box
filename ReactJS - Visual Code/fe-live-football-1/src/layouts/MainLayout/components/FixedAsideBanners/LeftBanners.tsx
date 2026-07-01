import type { AdsBanner } from "../../../../types/AdsBanner.type";

const LeftBanners = ({ banners }: { banners: AdsBanner[] }) => {
  return (
    <div className="flex flex-col">
      {banners.map((banner) => (
        <a href={banner.href} key={banner.id} className="cursor-pointer pointer-events-auto" target="_blank">
          <img loading="lazy" src={banner.src} alt="" />
        </a>
      ))}
    </div>
  );
};

export default LeftBanners;
