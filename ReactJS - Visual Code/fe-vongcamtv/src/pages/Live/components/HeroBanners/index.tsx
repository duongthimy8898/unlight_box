import HeroBanner from "./HeroBanner";

const heroBanners = [
  {
    src: "/banners/vs_1152x100.gif",
    href: "https://6789x.site/ad9namei200",
  },
  {
    src: "/banners/vs_1152x100.gif",
    href: "https://6789x.site/ad9namei200",
  },
  {
    src: "/banners/fb88_1152x100.gif",
    href: "https://www.fb88alo.com/?affiliateId=8623",
  },
  {
    src: "/banners/fb88_1152x100.gif",
    href: "https://www.fb88alo.com/?affiliateId=8623",
  },
];
const HeroBanners = () => {
  return (
    <div className="w-full grid grid-cols-1 tb:grid-cols-2 divide-x divide-gray-400">
      {heroBanners.map((b, idx) => (
        <HeroBanner key={idx} src={b.src} href={b.href} />
      ))}
    </div>
  );
};

export default HeroBanners;
